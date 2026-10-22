-- Peek: community-submitted live views.
-- Anyone can submit a view (a pending row). Only an admin can review it. Once approved, the
-- public can read its non-sensitive columns and Peek shows it like any other view.
-- Self-contained: needs nothing from earlier migrations, only Supabase's `auth` schema.

-- ---------------------------------------------------------------- admins
-- Who may review submissions. Only the service role / SQL editor can read or write this table.
create table public.peek_admins (
  email text primary key check (email = lower(email))
);
alter table public.peek_admins enable row level security;
revoke all on public.peek_admins from anon, authenticated;

create or replace function public.is_peek_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.peek_admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_peek_admin() from public;
grant execute on function public.is_peek_admin() to anon, authenticated;

-- ---------------------------------------------------------------- validation helpers
create or replace function public.peek_texts_ok(items text[], min_items int, max_items int, max_len int)
returns boolean
language sql immutable set search_path = ''
as $$
  select coalesce(cardinality(items), 0) between min_items and max_items
     and not exists (select 1 from unnest(items) t where t is null or char_length(btrim(t)) < 3 or char_length(t) > max_len);
$$;

create or replace function public.peek_sources_ok(sources jsonb)
returns boolean
language sql immutable set search_path = ''
as $$
  select jsonb_typeof(sources) = 'array'
     and jsonb_array_length(sources) between 1 and 5
     and not exists (
       select 1 from jsonb_array_elements(sources) e
       where jsonb_typeof(e) <> 'object'
          or char_length(coalesce(e ->> 'label', '')) not between 2 and 100
          or coalesce(e ->> 'url', '') !~* '^https?://[^\s"<>]+$'
          or char_length(e ->> 'url') > 300
     );
$$;

-- ---------------------------------------------------------------- views
create table public.peek_views (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected', 'changes_requested', 'paused')),

  -- the stream
  video_id text not null unique check (video_id ~ '^[A-Za-z0-9_-]{11}$'),
  channel_id text check (channel_id is null or channel_id ~ '^UC[A-Za-z0-9_-]{22}$'),

  -- the place
  name text not null check (char_length(btrim(name)) between 3 and 80),
  place text not null check (char_length(btrim(place)) between 3 and 120),
  country text not null check (char_length(btrim(country)) between 2 and 60),
  lat double precision not null check (lat between -90 and 90),
  lng double precision not null check (lng between -180 and 180),
  tz text not null check (tz ~ '^[A-Za-z]+(/[A-Za-z0-9_+-]+){0,2}$' and char_length(tz) <= 64),
  night boolean not null default false,

  -- the info card (same fields as the built-in views)
  headline text not null check (char_length(btrim(headline)) between 10 and 160),
  looking text not null check (char_length(btrim(looking)) between 40 and 600),
  watch_for text[] not null check (public.peek_texts_ok(watch_for, 1, 5, 160)),
  history text not null check (char_length(btrim(history)) between 40 and 1200),
  facts text[] not null default '{}' check (public.peek_texts_ok(facts, 0, 4, 240)),
  sources jsonb not null check (public.peek_sources_ok(sources)),
  credit_name text not null check (char_length(btrim(credit_name)) between 2 and 120),
  credit_url text not null check (credit_url ~* '^https?://[^\s"<>]+$' and char_length(credit_url) between 11 and 300),

  -- set by the admin: words the live video's title must contain, so a channel that switches
  -- cameras can't put the wrong place on screen
  expect_title text[] check (expect_title is null or public.peek_texts_ok(expect_title, 1, 6, 60)),

  -- the submitter (never shown publicly)
  submitter_name text check (submitter_name is null or char_length(submitter_name) <= 100),
  submitter_email text not null check (submitter_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' and char_length(submitter_email) <= 200),
  relationship text not null check (relationship in ('owner', 'authorized', 'found')),
  consent boolean not null check (consent),

  -- review notes (never shown publicly)
  admin_notes text check (admin_notes is null or char_length(admin_notes) <= 2000),
  reviewed_at timestamptz,
  reviewed_by text
);

create index peek_views_status_idx on public.peek_views (status, created_at desc);

-- ---------------------------------------------------------------- guards
-- Whatever a visitor sends, a new row starts pending and unreviewed; and a flood is refused.
create or replace function public.peek_views_before_insert()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  new.status := 'pending';
  new.admin_notes := null;
  new.reviewed_at := null;
  new.reviewed_by := null;
  new.expect_title := null;
  new.id := gen_random_uuid();
  new.created_at := now();
  new.updated_at := now();
  new.submitter_email := lower(btrim(new.submitter_email));
  if (select count(*) from public.peek_views where status = 'pending') >= 300 then
    raise exception 'The review queue is full right now. Please try again in a few days.' using errcode = 'P0001';
  end if;
  if (select count(*) from public.peek_views where submitter_email = new.submitter_email and created_at > now() - interval '1 hour') >= 3 then
    raise exception 'That is a lot of submissions at once. Please try again in an hour.' using errcode = 'P0001';
  end if;
  return new;
end;
$$;
create trigger peek_views_before_insert before insert on public.peek_views
  for each row execute function public.peek_views_before_insert();

-- ---------------------------------------------------------------- access
alter table public.peek_views enable row level security;
revoke all on public.peek_views from anon, authenticated;

-- Visitors: submit a row, and read the public columns of approved rows. Nothing else.
create policy peek_views_submit on public.peek_views
  for insert to anon, authenticated with check (true);
create policy peek_views_read_approved on public.peek_views
  for select to anon, authenticated using (status = 'approved');

grant insert (video_id, channel_id, name, place, country, lat, lng, tz, night,
              headline, looking, watch_for, history, facts, sources, credit_name, credit_url,
              submitter_name, submitter_email, relationship, consent)
  on public.peek_views to anon, authenticated;
grant select (id, video_id, channel_id, name, place, country, lat, lng, tz, night,
              headline, looking, watch_for, history, facts, sources, credit_name, credit_url,
              expect_title, status, created_at)
  on public.peek_views to anon, authenticated;

-- Admins work through these functions, so the private columns (email, notes) are never
-- granted to a role the public can become.
create or replace function public.peek_admin_list(p_status text default null)
returns setof public.peek_views
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_peek_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return query select * from public.peek_views v
    where p_status is null or v.status = p_status
    order by case v.status when 'pending' then 0 else 1 end, v.created_at desc;
end;
$$;

-- Review one submission: set its status and notes, and optionally fix up fields before approving.
-- p_patch may carry: name, place, country, lat, lng, tz, night, headline, looking, watch_for,
-- history, facts, sources, credit_name, credit_url, expect_title, channel_id.
create or replace function public.peek_admin_review(p_id uuid, p_status text, p_notes text default null, p_patch jsonb default '{}'::jsonb)
returns public.peek_views
language plpgsql security definer set search_path = ''
as $$
declare
  row public.peek_views;
begin
  if not public.is_peek_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  if p_status not in ('pending', 'approved', 'rejected', 'changes_requested', 'paused') then
    raise exception 'bad status' using errcode = '22023';
  end if;
  update public.peek_views v set
    status = p_status,
    admin_notes = p_notes,
    reviewed_at = now(),
    reviewed_by = lower(auth.jwt() ->> 'email'),
    updated_at = now(),
    name = coalesce(p_patch ->> 'name', v.name),
    place = coalesce(p_patch ->> 'place', v.place),
    country = coalesce(p_patch ->> 'country', v.country),
    lat = coalesce((p_patch ->> 'lat')::double precision, v.lat),
    lng = coalesce((p_patch ->> 'lng')::double precision, v.lng),
    tz = coalesce(p_patch ->> 'tz', v.tz),
    night = coalesce((p_patch ->> 'night')::boolean, v.night),
    headline = coalesce(p_patch ->> 'headline', v.headline),
    looking = coalesce(p_patch ->> 'looking', v.looking),
    watch_for = case when p_patch ? 'watch_for' then array(select jsonb_array_elements_text(p_patch -> 'watch_for')) else v.watch_for end,
    history = coalesce(p_patch ->> 'history', v.history),
    facts = case when p_patch ? 'facts' then array(select jsonb_array_elements_text(p_patch -> 'facts')) else v.facts end,
    sources = coalesce(p_patch -> 'sources', v.sources),
    credit_name = coalesce(p_patch ->> 'credit_name', v.credit_name),
    credit_url = coalesce(p_patch ->> 'credit_url', v.credit_url),
    channel_id = case when p_patch ? 'channel_id' then nullif(p_patch ->> 'channel_id', '') else v.channel_id end,
    expect_title = case when p_patch ? 'expect_title' then array(select jsonb_array_elements_text(p_patch -> 'expect_title')) else v.expect_title end
  where v.id = p_id
  returning * into row;
  if not found then raise exception 'no such submission' using errcode = 'P0002'; end if;
  return row;
end;
$$;

create or replace function public.peek_admin_delete(p_id uuid)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_peek_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  delete from public.peek_views where id = p_id;
end;
$$;

revoke all on function public.peek_admin_list(text) from public;
revoke all on function public.peek_admin_review(uuid, text, text, jsonb) from public;
revoke all on function public.peek_admin_delete(uuid) from public;
grant execute on function public.peek_admin_list(text) to authenticated;
grant execute on function public.peek_admin_review(uuid, text, text, jsonb) to authenticated;
grant execute on function public.peek_admin_delete(uuid) to authenticated;
