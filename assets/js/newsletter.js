(function(){
  var KEY_DAYS = 'ys_nl_until';
  var KEY_SESS = 'ys_nl_snoozed';
  var skip = false;
  try {
    var until = parseInt(localStorage.getItem(KEY_DAYS) || '0', 10);
    if (until && Date.now() < until) skip = true;
    if (sessionStorage.getItem(KEY_SESS)) skip = true;
  } catch(e){}
  if (skip) return;

  var overlay = document.getElementById('nlOverlay');
  if (!overlay) return;
  var close = overlay.querySelector('.nl-close');
  var form  = overlay.querySelector('form');
  var shownAt = 0;

  function show(){
    overlay.classList.add('nl-show');
    shownAt = Date.now();
  }
  function hide(days){
    overlay.classList.remove('nl-show');
    try {
      if (days) localStorage.setItem(KEY_DAYS, String(Date.now() + days*864e5));
      else sessionStorage.setItem(KEY_SESS, '1');
    } catch(e){}
  }

  setTimeout(show, 2500);

  if (close) close.addEventListener('click', function(){ hide(7); });
  if (form)  form.addEventListener('nl:ok', function(){ setTimeout(function(){ hide(365); }, 3000); });

  overlay.addEventListener('click', function(e){
    if (e.target !== overlay) return;
    if (Date.now() - shownAt < 800) return;       hide(0);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay.classList.contains('nl-show')) hide(0);
  });
})();

/* ---------- INSCRIPTION NEWSLETTER (Brevo) ---------- */
(function(){
  document.querySelectorAll('.nl-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button[type=submit]');
      var legal = form.querySelector('.nl-legal');
      if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }
      fetch(form.action + '?isAjax=1', { method: 'POST', body: new FormData(form), mode: 'no-cors' })
        .then(function(){
          var row = form.querySelector('.nl-row');
          if (row) row.outerHTML = '<p class="nl-msg">Merci ! Vérifie ta boîte mail pour confirmer ton inscription.</p>';
          form.dispatchEvent(new Event('nl:ok'));
        })
        .catch(function(){
          if (btn) { btn.disabled = false; btn.innerHTML = 'S&rsquo;inscrire'; }
          if (legal) legal.textContent = 'Oups, l’inscription n’a pas pu être envoyée. Réessaie dans un instant.';
        });
    });
  });
})();
