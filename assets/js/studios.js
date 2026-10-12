(function(){
  document.querySelectorAll('.st[data-studio]').forEach(function(b){
    b.addEventListener('click', function(){
      var d = document.getElementById('stm-' + b.dataset.studio);
      if (!d || !d.showModal) return;
      var src = b.querySelector('.st-ph img'), ph = d.querySelector('.stm-ph');
      ph.src = src.src; ph.alt = src.alt; ph.style.objectPosition = src.style.objectPosition || '';
      d.querySelector('.st-k').textContent = b.dataset.label;
      d.showModal();
    });
  });
  document.querySelectorAll('.stm').forEach(function(d){
    d.querySelector('.stm-x').addEventListener('click', function(){ d.close(); });
    d.addEventListener('click', function(e){ if (e.target === d) d.close(); });
  });
})();
