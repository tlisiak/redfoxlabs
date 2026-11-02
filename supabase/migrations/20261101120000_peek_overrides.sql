-- Peek: admin controls over the built-in views (the ones in streams.js).
-- An override switches a view off, or swaps the YouTube video IDs it plays, without a code change.
-- The public can read the override (the page applies it); only admins can write it or read notes.
create or replace function public.peek_video_ids_ok(ids text[])
returns boolean
language sql immutable set search_path = ''
as $$
  select cardinality(ids) between 1 and 5
     and not exists (select 1 from unnest(ids) v where v is null or v !~ '^[A-Za-z0-9_-]{11}$');
$$;

create table public.peek_overrides (
  stream_id text primary key check (stream_id ~ '^[A-Za-z0-9_-]{2,60}$'),
  disabled boolean not null default false,
  video_ids text[] check (video_ids is null or public.peek_video_ids_ok(video_ids)),
  note text check (note is null or char_length(note) <= 500),
  updated_at timestamptz not null default now(),
  updated_by text
);
alter table public.peek_overrides enable row level security;
revoke all on public.peek_overrides from anon, authenticated;
create policy peek_overrides_read on public.peek_overrides for select to anon, authenticated using (true);
grant select (stream_id, disabled, video_ids) on public.peek_overrides to anon, authenticated;

create or replace function public.peek_admin_overrides()
returns setof public.peek_overrides
language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_peek_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  return query select * from public.peek_overrides order by stream_id;
end;
$$;

-- Sets (or replaces) a view's override. An override with nothing switched on is removed.
create or replace function public.peek_admin_set_override(p_stream text, p_disabled boolean, p_video_ids text[] default null, p_note text default null)
returns void
language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_peek_admin() then raise exception 'not allowed' using errcode = '42501'; end if;
  if not p_disabled and p_video_ids is null then
    delete from public.peek_overrides where stream_id = p_stream;
    return;
  end if;
  insert into public.peek_overrides (stream_id, disabled, video_ids, note, updated_at, updated_by)
  values (p_stream, p_disabled, p_video_ids, nullif(btrim(p_note), ''), now(), lower(auth.jwt() ->> 'email'))
  on conflict (stream_id) do update set
    disabled = excluded.disabled, video_ids = excluded.video_ids, note = excluded.note,
    updated_at = excluded.updated_at, updated_by = excluded.updated_by;
end;
$$;

-- New functions get EXECUTE for anon by default; these are for signed-in admins only.
revoke all on function public.peek_admin_overrides() from public, anon;
revoke all on function public.peek_admin_set_override(text, boolean, text[], text) from public, anon;
grant execute on function public.peek_admin_overrides() to authenticated;
grant execute on function public.peek_admin_set_override(text, boolean, text[], text) to authenticated;
