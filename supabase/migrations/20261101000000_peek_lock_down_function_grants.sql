-- Supabase grants EXECUTE on new functions to anon and authenticated by default, which
-- "revoke ... from public" does not undo. Admin functions are for signed-in admins only.
revoke execute on function public.is_peek_admin() from anon;
revoke execute on function public.peek_admin_list(text) from anon;
revoke execute on function public.peek_admin_review(uuid, text, text, jsonb) from anon;
revoke execute on function public.peek_admin_delete(uuid) from anon;
revoke execute on function public.peek_views_before_insert() from anon, authenticated;
