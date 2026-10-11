const __IMG__ = {"img-02": "assets/img/episodes/img-02.webp", "img-03": "assets/img/episodes/img-03.webp", "img-05": "assets/img/episodes/img-05.webp", "img-06": "assets/img/episodes/img-06.webp", "img-07": "assets/img/episodes/img-07.webp", "img-08": "assets/img/episodes/img-08.webp", "img-10": "assets/img/episodes/img-10.webp", "img-11": "assets/img/episodes/img-11.webp", "img-23": "assets/img/episodes/img-23.webp", "img-24": "assets/img/episodes/img-24.webp", "img-25": "assets/img/episodes/img-25.webp", "img-26": "assets/img/episodes/img-26.webp", "img-27": "assets/img/episodes/img-27.webp"};

const EP = [
    {id:'lYV5SjlMvCI', t:"À la découverte de la cuisine juive ashkénaze", g:"Kitchen by Karine", d:"47:19", c:"Culture", n:1},
  {id:'9cLccy1LQ0s', t:"Français, juif, patriote : le combat politique d'une nouvelle génération", g:"Simon Moos", d:"59:33", c:"Politique", n:1},
  {id:'syOx2fPSpYQ', t:"Il ouvre des portes et rassemble des milliers de jeunes aux Seli'hot", g:"", d:"48:42", c:"Histoires de vie"},
  {id:'ZqFBlt7_MGM', t:"STAM : il a attendu 10 ans pour accomplir sa destinée", g:"", d:"49:51", c:"Histoires de vie"},
  {id:'8jihrKrIjaU', t:"Mes ancêtres sont israélites", g:"", d:"44:28", c:"Histoires de vie"},
  {id:'dyWf8knD8t0', t:"C'est pas Versailles ici : l'histoire de l'acteur derrière la pub culte", g:"Ary Gabison", d:"1:18:12", c:"Média"},
  {id:'HyM7kDg5xHc', t:"Combattre les antisémites sur les réseaux", g:"Raphaël Le Rav", d:"45:18", c:"Société"},
  {id:'H8AK7dBmmxU', t:"Défendre Israël est ma mission", g:"Bruno Monroe", d:"52:36", c:"Politique"},
  {id:'u_hM---aNIM', t:"Du 6-9 NRJ à Israël : la renaissance de Geronimo", g:"Geronimo", img:"img-27", d:"49:09", c:"Média"},
  {id:'BLSEm8_tyqs', t:"De TikTok aux élections 2027", g:"Moshé Nadjar", img:"img-26", d:"1:01:12", c:"Politique"},
  {id:'o7LkT3CfnJc', t:"Quand le rire devient une survie", g:"Vincent Seroussi", img:"img-25", d:"48:16", c:"Humour"},
  {id:'jvzY5uIinGg', t:"L'Ashkénaze qui fait rire les Séfarades", g:"Fonzie", img:"img-24", d:"48:56", c:"Humour"},
  {id:'8PYuccNiRTE', t:"Trouver son âme sœur, le rôle du matchmaker", g:"Chayale", img:"img-23", d:"1:04:58", c:"Société"},
  {id:'jngdl_Bdf14', t:"La flamme d'un converti au judaïsme d'origine camerounaise", g:"Eliezer", img:"img-02", d:"58:49", c:"Histoires de vie"},
  {id:'PwAIjht7_6I', t:"Juive, libre et assumée : elle raconte tout", g:"Ethel Hadjaj", img:"img-03", d:"1:01:02", c:"Histoires de vie"},
  {id:'Sc_5v1NPWXI', t:"PSG et judaïsme, un parcours inattendu", g:"Fabrice Pancrate", img:"img-05", d:"1:11:18", c:"Sport"},
  {id:'7MQpDIc_YC0', t:"Le rire pour rester debout", g:"Baba Rudy", img:"img-06", d:"1:02:22", c:"Humour"},
  {id:'rcw0Z-baDhQ', t:"Du rêve américain à la réalité", g:"Junes Davis", img:"img-07", d:"55:46", c:"Histoires de vie"},
  {id:'ptH_t6eB5QE', t:"Quand la performance laisse place à l'émotion", g:"Avee", img:"img-08", d:"1:07:13", c:"Musique"},
  {id:'3Sb73DCeUtc', t:"J'ai été adopté au Sri Lanka", g:"Raju", img:"img-10", d:"42:41", c:"Histoires de vie"},
  {id:'pQoFrKBdtWg', t:"De pasteur à rabbin en Afrique", g:"Rav Eliyahou Pinhas", img:"img-11", d:"47:46", c:"Histoires de vie"}
];

const card = e => `<a class="vcard" href="https://youtu.be/${e.id}" target="_blank" rel="noopener">
  <div class="vthumb">
    ${e.n ? '<span class="vnew">Nouveau</span>' : ''}
    ${e.img
      ? `<img src="${__IMG__[e.img]||''}" alt="${e.g || e.t}" loading="lazy">`
      : `<img src="https://i.ytimg.com/vi/${e.id}/maxresdefault.jpg" alt="${e.g || e.t}" loading="lazy" style="object-position:center"
           onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/${e.id}/hqdefault.jpg'">`}
    <span class="vdur">${e.d}</span>
    <div class="vplay"></div>
  </div>
  <div class="vinfo">
    <div class="vcat">${e.c}</div>
    <h3 class="vttl">${e.t}</h3>
    ${e.g ? `<p class="vguest">${e.g}</p>` : ''}
  </div>
</a>`;

const cats = ['Tout', ...new Set(EP.map(e => e.c))];
const tabs = document.getElementById('tabs');
const grid = document.getElementById('vgrid');
tabs.innerHTML = cats.map((c,i) => `<button class="tab${i?'':' act'}" data-c="${c}">${c}</button>`).join('');
const render = c => {
  const list = c === 'Tout' ? EP : EP.filter(e => e.c === c);
  grid.innerHTML = list.length ? list.map(card).join('') : '<p class="empty">Bientôt de nouveaux épisodes dans cette catégorie.</p>';
};
render('Tout');
tabs.addEventListener('click', ev => {
  const b = ev.target.closest('.tab'); if (!b) return;
  tabs.querySelectorAll('.tab').forEach(t => t.classList.remove('act'));
  b.classList.add('act');
  render(b.dataset.c);
});

const M = ['Le média','YMG Talents','YinonShow Business','Business Reportage','Partenariats','Studios Paris & Nice'];
document.getElementById('mq').innerHTML = [...M, ...M, ...M].map(s => `<span>${s} ✦</span>`).join('');

const hd = document.getElementById('hd'), nav = document.getElementById('nav');
document.getElementById('burger').addEventListener('click', () => nav.classList.toggle('open'));
nav.addEventListener('click', e => { if (e.target.tagName === 'A') nav.classList.remove('open'); });
const onScroll = () => {
  hd.classList.toggle('on', scrollY > 40);
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => { if (scrollY >= s.offsetTop - 170) cur = s.id; });
  nav.querySelectorAll('a').forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + cur));
};
addEventListener('scroll', onScroll, { passive: true }); onScroll();

const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
}), { threshold: .06 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));
