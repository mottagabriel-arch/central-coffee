/* ====== DADOS EDITÁVEIS ======
   CARDÁPIO: cada grupo tem um título e uma lista de itens.
   - price: deixe "" enquanto não souber o valor (o preço simplesmente não aparece). Quando souber, escreva ex.: "R$ 6,50".
   - description: opcional, aparece em letra menor embaixo do nome.
   - Para criar um grupo novo, copie um bloco { title:"...", items:[...] } e cole na lista. Para remover, apague o bloco ou o item. */
const MENU = [
  { title:"Salgados", items:[
    { name:"Pão na chapa", price:"" },
    { name:"Misto quente", price:"" },
    { name:"Queijo quente", price:"" },
    { name:"Sanduíche natural", price:"" },
    { name:"Pão com mortadela", price:"" },
    { name:"Pão de queijo", price:"" }
  ]},
  { title:"Bebidas", items:[
    { name:"Café coado", price:"" },
    { name:"Café com leite", price:"" },
    { name:"Expresso", price:"" },
    { name:"Cappuccino", price:"" },
    { name:"Suco", price:"" },
    { name:"Guaravita", price:"" },
    { name:"Refrigerante", price:"" }
  ]},
  { title:"Doces", items:[
    { name:"Bolo cenoura e fubá", price:"" },
    { name:"Brownie", price:"" },
    { name:"Palha italiana", price:"" }
  ]}
];

/* Deixe vazio ("") o que ainda não tiver: o item some da página. */
const CONTACT = {
  address:"", hours:"", phone:"", whatsapp:"", instagram:"", mapEmbedUrl:""
  /* whatsapp: só números com DDI, ex. 5521999999999 · instagram: usuário sem @ · mapEmbedUrl: link "incorporar mapa" do Google Maps */
};

/* ====== CÓDIGO ====== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function renderMenu(){
  const groups = MENU.filter(g => g.items && g.items.length);
  if(!groups.length){
    $("menu").innerHTML = `<div class="empty">Nosso cardápio está sendo preparado.<br>Em breve, novidades deliciosas por aqui!</div>`;
    return;
  }
  $("menu").innerHTML = `<div class="menu-grid">` + groups.map(g =>
    `<section class="menu-group rv" aria-label="${esc(g.title)}"><h3>${esc(g.title)}</h3><ul>` +
    g.items.map(i => `<li><span>${esc(i.name)}</span>${i.price ? `<span class="dots" aria-hidden="true"></span><span class="price">${esc(i.price)}</span>` : ""}${i.description ? `<span class="desc">${esc(i.description)}</span>` : ""}</li>`).join("") +
    `</ul></section>`).join("") + `</div>`;
}
renderMenu();

const rows = [["Endereço",CONTACT.address],["Horário de funcionamento",CONTACT.hours],["Telefone",CONTACT.phone]].filter(r => r[1]);
$("info").innerHTML = rows.length ? rows.map(r => `<div><h3>${r[0]}</h3><p>${esc(r[1])}</p></div>`).join("") :
  `<div><h3>Sala 3004, segundo andar.</h3></div>`;
const acts = [];
if(CONTACT.whatsapp) acts.push(`<a class="btn primary" href="https://wa.me/${encodeURIComponent(CONTACT.whatsapp)}" target="_blank" rel="noopener">Falar no WhatsApp</a>`);
if(CONTACT.instagram) acts.push(`<a class="btn ghost" href="https://instagram.com/${encodeURIComponent(CONTACT.instagram)}" target="_blank" rel="noopener">Instagram</a>`);
$("actions").innerHTML = acts.join(""); if(!acts.length) $("actions").hidden = true;
if(CONTACT.mapEmbedUrl){ $("map").innerHTML = `<iframe src="${esc(CONTACT.mapEmbedUrl)}" title="Mapa com a localização da Central Coffee" loading="lazy"></iframe>`; $("map").hidden = false; }
const soc = [];
if(CONTACT.instagram) soc.push(`<li><a href="https://instagram.com/${encodeURIComponent(CONTACT.instagram)}" target="_blank" rel="noopener">Instagram</a></li>`);
if(CONTACT.whatsapp) soc.push(`<li><a href="https://wa.me/${encodeURIComponent(CONTACT.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a></li>`);
$("social").innerHTML = soc.join(""); if(!soc.length) $("social").hidden = true;

$("year").textContent = new Date().getFullYear();

const nav = $("nav"), burger = $("burger");
burger.addEventListener("click", () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); });
nav.addEventListener("click", e => { if(e.target.tagName==="A"){ nav.classList.remove("open"); burger.setAttribute("aria-expanded","false"); } });

const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold:.12}) : null;
document.querySelectorAll(".rv").forEach(el => io ? io.observe(el) : el.classList.add("in"));