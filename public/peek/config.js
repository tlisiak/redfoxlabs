// Where Peek keeps community-submitted views. Both values are public by design (the anon key can
// only do what the database's row-level security allows: submit a view, read approved ones).
// Leave them empty to switch community submissions off; Peek then runs on streams.js alone.
window.PEEK_CONFIG = {
  supabaseUrl: "",
  supabaseAnonKey: "",
};
