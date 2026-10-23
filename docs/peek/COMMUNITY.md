# Peek community views

People can submit a live stream with all the info for its card. An admin reviews it, edits the
text if needed, and approves it. Approved views then show up on Peek exactly like the built-in ones,
and the scheduled stream check watches them like any other view.

```
visitor ── public/peek/submit.html ──► Supabase table peek_views (status: pending)
                                                  │
admin ── public/peek/admin/ ── review, edit, approve ──► status: approved
                                                  │
Peek page ◄── reads approved rows (community.js) ─┘      stream check reads them too
```

Nothing a visitor types reaches the page as markup. `public/peek/community.js` rebuilds every
approved row field by field (links must be http(s), IDs and time zones are validated, text is
escaped by the page), and the database rejects bad data before it's stored.

## One-time setup

1. **Create a Supabase project** for Red Fox Labs (free tier is plenty). Don't reuse an unrelated project.
2. **Apply the migration**: `supabase/migrations/20261023000000_peek_community_views.sql`
   (Supabase dashboard → SQL editor → paste → run, or `supabase db push`).
3. **Add yourself as an admin**, in the SQL editor:
   ```sql
   insert into public.peek_admins (email) values ('you@example.com');
   ```
4. **Turn it on**: put the project URL and the **anon** (public) key in `public/peek/config.js`
   (Supabase dashboard → Project Settings → API). The anon key is safe to publish; the database's
   row-level security is what protects the data. Never put the `service_role` key anywhere in the repo.
5. **Create your admin login**: open `https://redfoxlabs.co/peek/admin/`, enter your admin email and a
   password, click *Create account*, click the confirmation link Supabase emails you, then sign in.
   (The link may land on a placeholder page; that's fine, the account is confirmed.)

Until step 4, `config.js` is empty: Peek hides the "Submit it" link, the form says submissions
open soon, and nothing talks to a database.

## Reviewing

Open `/peek/admin/`. Tabs: Pending, Needs changes, Approved, Paused, Rejected.

For each submission you get the stream playing, who sent it and how they're connected to it, every
field editable, and a live preview of the card. Check three things before approving:

1. **It plays and it's live.** The line under the video shows the live title; it says NOT LIVE if
   YouTube reports it isn't.
2. **It's beautiful and accurate.** Does the place match the name and coordinates? Is it HD?
3. **The facts hold up.** Skim the story and facts against the sources they gave.

Set **Title must contain one of** to distinctive words from the live title (the *Suggest* button
proposes some). Peek refuses to show a stream whose title lacks them, so a channel that switches
cameras can't put the wrong place on screen. Then *Approve & publish*; it's live on Peek within a minute.

*Request changes* and *Reject* save your note; there's no email sending, so write to the submitter
(their address is on the page) if they should know.

## What protects it

| Risk | Defence |
|---|---|
| Someone approves their own submission | Visitors can only insert; the status column isn't writable by them, and a trigger forces `pending`. |
| Reading other people's emails | Visitors can read only approved rows and only the public columns; email and notes are never granted to them. |
| Script injection through the card | `toStream()` validation, http(s)-only links, and the page escapes all text. Tested with hostile rows. |
| Spam floods | At most 3 submissions per email per hour, and at most 300 pending in total. Bad URLs, lengths and coordinates are rejected by check constraints. |
| Non-admins reviewing | Review goes through functions that check `peek_admins`; a signed-in stranger gets "not allowed". |

Not included yet: a CAPTCHA, email notifications, and moderation of reports about an approved view
(pause or delete it from the admin page). Add Cloudflare Turnstile if spam ever shows up.

## The stream check

`scripts/peek/validate-streams.mjs` loads approved community views along with the built-in ones, so
each run verifies they're live, embeddable and on target, records their uptime, and the page skips
any that go dead. If the database is unreachable the check logs it and carries on with the built-in views.
