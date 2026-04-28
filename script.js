// ========================
// 🔥 CALCUL PRINCIPAL
// ========================

function calc() {

  let brut = parseFloat(document.getElementById("brut")?.value) || 0;
  let tauxStatut = parseFloat(document.getElementById("statut")?.value) || 0;
  let impot = (parseFloat(document.getElementById("impot")?.value) || 0) / 100;

  let net = brut * (1 - tauxStatut);
  let netImpot = net * (1 - impot);

  let loyer = parseFloat(document.getElementById("loyer")?.value) || 0;
  let courses = parseFloat(document.getElementById("courses")?.value) || 0;
  let transport = parseFloat(document.getElementById("transport")?.value) || 0;
  let factures = parseFloat(document.getElementById("factures")?.value) || 0;
  let loisirs = parseFloat(document.getElementById("loisirs")?.value) || 0;
  let autres = parseFloat(document.getElementById("autres")?.value) || 0;

  let depenses = loyer + courses + transport + factures + loisirs + autres;

  // ⚠️ WARNING SI 0 DEPENSE
  let warning = "";
  if (depenses === 0) {
    warning = "⚠️ Résultat basé sur 0€ de dépenses (irréaliste)";
  }

  let reste = netImpot - depenses;
  reste = Math.max(0, reste);

  let ratio = netImpot > 0 ? (reste / netImpot) * 100 : 0;
  ratio = Math.max(0, ratio);

  let parJour = reste / 30;
  let parAn = reste * 12;
  let sur5ans = parAn * 5;

  let message = "";
  if (ratio < 20) message = "💀 Situation fragile";
  else if (ratio < 40) message = "⚠️ Situation correcte";
  else message = "🔥 Bonne situation financière";

  let median = 1800;
  let niveau = netImpot > median ? "🟢 Au-dessus de la moyenne" : "🟡 Dans la moyenne";

  // ========================
  // 💰 ÉPARGNE (LOGIQUE)
  // ========================

  let epargneMin = Math.round(netImpot * 0.05);
  let epargneMax = Math.round(netImpot * 0.15);

  let tauxEpargne = netImpot > 0
    ? Math.round((epargneMin / netImpot) * 100)
    : 0;

  // ========================
  // 📊 AFFICHAGE RESTE
  // ========================

  document.getElementById("resteAffiche").textContent = reste.toFixed(0) + "€";

  let resteBox = document.getElementById("reste");
  if (resteBox) {
    resteBox.innerHTML = "💰 Reste : " + reste.toFixed(0) + "€";
  }

  // ========================
  // 📊 ANALYSE
  // ========================

  let analyseBox = document.getElementById("analyse");

  if (analyseBox) {

    let extra = "";
    if (ratio < 20) extra = "😬 Situation fragile";
    else if (ratio < 40) extra = "🙂 Situation correcte";
    else extra = "🔥 Bonne gestion";

    if (reste === 0) {
      extra = "🚨 Dépenses trop élevées — aucun reste";
    }

    analyseBox.innerHTML = `
      ${warning ? `<p style="color:orange">${warning}</p>` : ""}
      <p><b>${message}</b></p>
      <p>${extra}</p>
      <p>💥 ${reste.toFixed(0)}€ = ${parJour.toFixed(0)}€/jour</p>
      <p>📅 Par an : ${parAn.toFixed(0)}€</p>
      <p>🚀 En 5 ans : ${sur5ans.toFixed(0)}€</p>
      <br>
      <p>📊 Médiane : ${median}€</p>
      <p>${niveau}</p>
    `;
  }

  // ========================
  // 📊 BARRES
  // ========================

let depPercent = netImpot > 0 ? (depenses / netImpot) * 100 : 0;
let restePercent = netImpot > 0 ? (reste / netImpot) * 100 : 0;

// sécurité
depPercent = Math.max(0, Math.min(100, depPercent));
restePercent = Math.max(0, Math.min(100, restePercent));

// applique
barDep.style.width = depPercent + "%";
barRes.style.width = restePercent + "%";
  .bar-container {
  box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
}

  // ========================
  // 💡 ÉPARGNE (CACHÉ)
  // ========================

  let tauxEl = document.getElementById("tauxEpargne");
  if (tauxEl) tauxEl.textContent = "💸 " + tauxEpargne + "%";

  let recoBox = document.getElementById("recoEpargne");
  if (recoBox) {
    recoBox.innerHTML = `
      👉 ${epargneMin}€ à ${epargneMax}€ / mois<br>
      👉 Sans te priver
    `;
  }

  let jauge = document.getElementById("jaugeFill");

  if (jauge) {
    jauge.style.width = tauxEpargne + "%";
  }
}

// ========================
// 🔥 TOGGLE ÉPARGNE
// ========================

function toggleEpargne() {
  const bloc = document.getElementById("blocEpargne");
  if (!bloc) return;

  bloc.classList.toggle("hidden");
}

// ========================
// 🔥 PARTAGE
// ========================

function partager() {

  let reste = document.getElementById("resteAffiche")?.textContent || "";

  if (navigator.share) {
    navigator.share({
      title: "Mon reste à vivre",
      text: `Je pensais être bien… mais il me reste ${reste} 😬`,
      url: "https://combienreste.fr"
    });
  } else {
    alert("Partage non supporté");
  }
}

// ========================
// 🔥 RESET INPUTS
// ========================

window.addEventListener("DOMContentLoaded", () => {

  const ids = [
    "brut", "impot",
    "loyer", "courses", "transport",
    "factures", "loisirs", "autres"
  ];

  ids.forEach(id => {
    let el = document.getElementById(id);
    if (el) el.value = "";
  });

});

// ========================
// 🔥 TOGGLE DEPENSES
// ========================

function toggleDepenses() {
  const bloc = document.getElementById("depensesBloc");
  if (!bloc) return;

  bloc.classList.toggle("visible");
  bloc.classList.toggle("hidden");
}
