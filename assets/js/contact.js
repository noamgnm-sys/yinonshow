/* ---------- FORMULAIRE DE CONTACT ----------
   Envoi en arrière-plan : le visiteur reste sur le site et voit une confirmation.
   - Si data-web3forms-key est rempli : envoi via Web3Forms (aucune étape de validation).
   - Sinon : envoi via FormSubmit vers contact@yinonshow.com.                        */
(function(){
  var form = document.getElementById('contactForm');
  if (!form) return;
  var status = document.getElementById('contactStatus');
  var btn = form.querySelector('button[type=submit]');
  var btnLabel = btn ? btn.innerHTML : '';

  function show(type, msg){
    if (!status) return;
    status.className = 'frm-status ' + type;
    status.textContent = msg;
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if (form.querySelector('[name=_honey]').value) return; // robot
    var data = {};
    new FormData(form).forEach(function(v, k){ data[k] = v; });
    delete data._honey;

    var key = (form.getAttribute('data-web3forms-key') || '').trim();
    var url, body;
    if (key) {
      url = 'https://api.web3forms.com/submit';
      body = {
        access_key: key,
        subject: data._subject + ' · ' + (data.subject || ''),
        from_name: 'Site YinonShow',
        replyto: data.email,
        name: data.name, email: data.email,
        'Société': data.company || '-', Objet: data.subject, message: data.message
      };
    } else {
      url = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      data._replyto = data.email;
      body = data;
    }

    if (btn) { btn.disabled = true; btn.textContent = 'Envoi…'; }
    show('', '');

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ return { ok: r.ok, j: j }; }); })
    .then(function(res){
      var ok = res.ok && (res.j.success === true || res.j.success === 'true');
      if (!ok) throw new Error((res.j && res.j.message) || 'send_failed');
      form.reset();
      show('ok', 'Merci, votre message est bien envoyé. On revient vers vous très vite.');
    })
    .catch(function(){
      show('err', 'Le message n’a pas pu partir. Écrivez-nous directement à contact@yinonshow.com.');
    })
    .then(function(){ if (btn) { btn.disabled = false; btn.innerHTML = btnLabel; } });
  });
})();
