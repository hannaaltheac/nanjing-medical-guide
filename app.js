// Shared helpers for index.html, escort.html and admin.html
(function () {
  var c = window.APP_CONFIG || {};
  window.db = (/^https?:\/\//.test(c.SUPABASE_URL || '') && c.SUPABASE_ANON_KEY && window.supabase)
    ? window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY) : null;
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
