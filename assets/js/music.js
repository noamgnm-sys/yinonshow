/* ---------- MUSIQUE DE FOND ----------
   Les navigateurs interdisent le son automatique à l'ouverture d'une page.
   La musique démarre donc au premier clic / toucher du visiteur, à volume doux,
   en boucle. Le bouton en bas à gauche permet de couper ou relancer.
   Fichier attendu : assets/audio/generique.mp3                              */
(function(){
  var SRC = 'assets/audio/generique.mp3';
  var VOL = 0.25;
  var KEY = 'ys_music_off';
  var btn = document.getElementById('musicBtn');
  if (!btn) return;
  var label = btn.querySelector('.music-lbl');

  var audio = new Audio();
  audio.src = SRC;
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = VOL;

  var userOff = false;
  try { userOff = localStorage.getItem(KEY) === '1'; } catch(e){}

  function setUI(on){
    btn.classList.toggle('on', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (label) label.textContent = on ? 'Couper le son' : 'Écouter le générique';
  }
  function play(){
    var p = audio.play();
    if (p && p.then) p.then(function(){ setUI(true); }).catch(function(){ setUI(false); });
    else setUI(true);
  }
  function stop(){ audio.pause(); setUI(false); }

  // Le bouton n'apparaît que si le fichier audio existe bien
  audio.addEventListener('canplay', function once(){
    audio.removeEventListener('canplay', once);
    btn.hidden = false;
  });
  audio.addEventListener('error', function(){ btn.hidden = true; });

  btn.addEventListener('click', function(e){
    e.stopPropagation();
    if (audio.paused) { try { localStorage.removeItem(KEY); } catch(x){} userOff = false; play(); }
    else { try { localStorage.setItem(KEY, '1'); } catch(x){} userOff = true; stop(); }
  });

  // Démarrage au premier geste du visiteur (sauf s'il a coupé la musique avant)
  function firstGesture(){
    ['pointerdown','keydown','touchend'].forEach(function(t){ document.removeEventListener(t, firstGesture, true); });
    if (!userOff && audio.paused) play();
  }
  ['pointerdown','keydown','touchend'].forEach(function(t){ document.addEventListener(t, firstGesture, true); });

  // Pause quand l'onglet est en arrière-plan
  document.addEventListener('visibilitychange', function(){
    if (document.hidden && !audio.paused) { audio.pause(); audio._resume = true; }
    else if (!document.hidden && audio._resume) { audio._resume = false; play(); }
  });
  setUI(false);
})();
