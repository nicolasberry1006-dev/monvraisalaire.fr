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

  // ========================
  // 🛑 PAS BLOQUER SI VIDE
  // ========================
  if (depenses === 0) {
    depenses = 0; // laisse passer
  }

  let reste = netImpot - depenses;

  // sécurité
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
  // 💰 ÉPARGNE LOGIQUE
  // ========================

  let epargneMin = Math.max(0, Math.round(netImpot * 0.05));
  let epargneMax = Math.max(0, Math.round(netImpot * 0.15));

  let tauxEpargne = netImpot > 0
    ? Math.max(0, Math.round((epargneMin / netImpot) * 100))
    : 0;

  // ========================
  // 📊 AFFICHAGE
  // ========================

  let resteEl = document.getElementById("resteAffiche");
  if (resteEl) resteEl.textContent = reste.toFixed(0) + "€";

  let tauxEl = document.getElementById("tauxEpargne");
  if (tauxEl) tauxEl.textContent = "💸 " + tauxEpargne + "%";

  let recoBox = document.getElementById("recoEpargne");
  if (recoBox) {
    recoBox.innerHTML = `
      👉 Tu peux épargner <strong>${epargneMin}€ à ${epargneMax}€ / mois</strong><br>
      👉 Sans te priver
    `;
  }

  // ========================
  // 📊 JAUGE ÉPARGNE
  // ========================

  let jauge = document.getElementById("jaugeFill");
  let label = document.getElementById("jaugeLabel");

  if (jauge && label) {

    let couleur = "";

    if (tauxEpargne < 5) couleur = "#ff4d4d";
    else if (tauxEpargne < 10) couleur = "#ffa500";
    else couleur = "#00ffae";

    jauge.style.width = tauxEpargne + "%";
    jauge.style.background = couleur;

    label.textContent = `Épargne recommandée : ${tauxEpargne}%`;
  }

  // ========================
  // 📊 ANALYSE COMPLÈTE
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
  // 🔴🟢 DOUBLE JAUGE (FIX)
  // ========================

  let barDep = document.getElementById("barDepenses");
  let barRes = document.getElementById("barReste");

  if (barDep && barRes && netImpot > 0) {

    let depPercent = (depenses / netImpot) * 100;
    let restePercent = (reste / netImpot) * 100;

    depPercent = Math.max(0, Math.min(100, depPercent));
    restePercent = Math.max(0, Math.min(100, restePercent));

    barDep.style.width = depPercent + "%";
    barRes.style.width = restePercent + "%";
  }
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
// 🔥 TOGGLES
// ========================

function toggleDepenses() {
  const bloc = document.getElementById("depensesBloc");
  if (!bloc) return;

  bloc.classList.toggle("hidden");
}

function toggleEpargne() {
  const bloc = document.getElementById("blocEpargne");
  if (!bloc) return;

  bloc.classList.toggle("hidden");
}
