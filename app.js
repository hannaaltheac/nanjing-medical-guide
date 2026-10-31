// Shared helpers for index.html, escort.html and admin.html
(function () {
  var c = window.APP_CONFIG || {};
  var ok = /^https?:\/\//.test(c.SUPABASE_URL || '') && c.SUPABASE_ANON_KEY && window.supabase;
  // Each login page keeps its OWN saved login (admin and companion never overwrite each other).
  // The public booking page (index.html) never saves or touches any login.
  var auth = window.APP_STORAGE_KEY
    ? { storageKey: window.APP_STORAGE_KEY, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false }
    : { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false };
  window.db = ok ? window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY, { auth: auth }) : null;
  window.$ = function (id) { return document.getElementById(id); };
  // Always escape text that came from a form before putting it on a page
  window.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  };
  // Companions log in with their student ID; behind the scenes it becomes an internal login name
  window.pseudoEmail = function (sid) { return sid.trim().toLowerCase() + '@escort.connectcarenj.com'; };
})();
