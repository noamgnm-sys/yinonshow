/* ---------- NEWSLETTER POPUP ---------- */
(function(){
  var KEY_DAYS = 'ys_nl_until';   /* refus via la croix : 7 jours */
  var KEY_SESS = 'ys_nl_snoozed'; /* refus via le fond/Echap : cette visite */

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
  if (form)  form.addEventListener('submit', function(){ hide(365); });

  overlay.addEventListener('click', function(e){
    if (e.target !== overlay) return;
    if (Date.now() - shownAt < 800) return;   /* garde anti clic accidentel */
    hide(0);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && overlay.classList.contains('nl-show')) hide(0);
  });
})();
