// ========================
// 🏆 COMPARAISON PREMIUM (GLOBAL)
// ========================

function getIncomePercentile(netImpot) {
  if (netImpot < 1200) return { pct: "bas 20%", label: "🔴 Revenu faible" };
  if (netImpot < 1600) return { pct: "30% les plus bas", label: "🟠 Sous la moyenne" };
  if (netImpot < 2000) return { pct: "médiane (50%)", label: "🟡 Dans la moyenne" };
  if (netImpot < 2800) return { pct: "top 30%", label: "🟢 Au-dessus de la moyenne" };
  if (netImpot < 3500) return { pct: "top 20%", label: "🟢 Bon revenu" };
  if (netImpot < 4500) return { pct: "top 10%", label: "🔵 Revenu élevé" };
  if (netImpot < 7000) return { pct: "top 5%", label: "🔵 Très élevé" };
  return { pct: "top 1%", label: "💎 Très haut revenu" };
}

function getManagementLevel(ratio) {
  if (ratio < 10) return "🔴 Gestion difficile";
  if (ratio < 20) return "🟠 Gestion tendue";
  if (ratio < 30) return "🟡 Gestion correcte";
  if (ratio < 40) return "🟢 Bonne gestion";
  return "🔵 Excellente gestion";
}

function renderComparaisonPremium(netImpot, ratio) {
  const income = getIncomePercentile(netImpot);
  const gestion = getManagementLevel(ratio);

  let message = `
    📊 <strong>Comparaison en France</strong><br>
    ${income.label} (${income.pct})<br>
    ${gestion}
  `;

  if (ratio > 30 && netImpot < 2000) {
    message += `<br>💡 Tu optimises très bien un revenu moyen`;
  }

  if (ratio < 15 && netImpot > 3000) {
    message += `<br>⚠️ Revenus élevés mais peu d’épargne`;
  }

  if (ratio > 40 && netImpot > 3000) {
    message += `<br>🔥 Situation très solide`;
  }

  const el = document.getElementById("comparaison");
  if (el) el.innerHTML = message;
}

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

  let reste = Math.max(0, netImpot - depenses);
  let ratio = netImpot > 0 ? Math.max(0, (reste / netImpot) * 100) : 0;

  let parJour = reste / 30;
  let parAn = reste * 12;
  let sur5ans = parAn * 5;

  let message =
    ratio < 20 ? "💀 Situation fragile" :
    ratio < 40 ? "⚠️ Situation correcte" :
    "🔥 Bonne situation financière";

  let median = 1800;
  let niveau = netImpot > median
    ? "🟢 Au-dessus de la moyenne"
    : "🟡 Dans la moyenne";

// ========================
// 💰 ÉPARGNE INTELLIGENTE
// ========================

let tauxEpargne = 0;

// logique dynamique
if (ratio < 10) {
  tauxEpargne = 0;
} else if (ratio < 20) {
  tauxEpargne = 5;
} else if (ratio < 30) {
  tauxEpargne = 10;
} else if (ratio < 40) {
  tauxEpargne = 15;
} else {
  tauxEpargne = 20;
}

// calcul €
let epargneMin = Math.round(reste * (tauxEpargne / 100));
let epargneMax = Math.round(reste * ((tauxEpargne + 10) / 100));

// sécurité
epargneMin = Math.max(0, epargneMin);
epargneMax = Math.max(0, epargneMax);

// message dynamique
let reco = "";

if (reste <= 0) {
  reco = "❌ Aucune capacité d’épargne — dépenses trop élevées";
} else if (tauxEpargne === 0) {
  reco = "⚠️ Situation fragile — difficile d’épargner";
} else {
  reco = `
    👉 ${epargneMin}€ à ${epargneMax}€ / mois<br>
    👉 Sans te priver
  `;
}

// affichage
document.getElementById("tauxEpargne").textContent =
  `💸 ${tauxEpargne}% de ton reste`;

document.getElementById("recoEpargne").innerHTML = reco;
  // ========================
  // 📈 PROJECTION
  // ========================

let projection = document.getElementById("projectionEpargne");

if (projection && reste > 0) {
  projection.innerHTML = `
    📅 En 1 an : ${epargneMin * 12}€ à ${epargneMax * 12}€<br>
    🚀 En 10 ans : ${(epargneMin * 12) * 10}€ à ${(epargneMax * 12) * 10}€
  `;
}
  // ========================
  // 📊 AFFICHAGE
  // ========================

  document.getElementById("resteAffiche").textContent = reste.toFixed(0) + "€";

  let analyseBox = document.getElementById("analyse");

  if (analyseBox) {
    let extra =
      ratio < 20 ? "😬 Situation fragile" :
      ratio < 40 ? "🙂 Situation correcte" :
      "🔥 Bonne gestion";

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

  // ✅ COMPARAISON (BON ENDROIT)
  renderComparaisonPremium(netImpot, ratio);

  // ========================
  // 🔴🟢 DOUBLE JAUGE
  // ========================

  let barDep = document.getElementById("barDepenses");
  let barRes = document.getElementById("barReste");

  if (barDep && barRes && netImpot > 0) {
    let depPercent = Math.min(100, Math.max(0, (depenses / netImpot) * 100));
    let restePercent = Math.min(100, Math.max(0, (reste / netImpot) * 100));

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
  if (bloc) bloc.classList.toggle("hidden");
}

function toggleEpargne() {
  const bloc = document.getElementById("blocEpargne");
  if (bloc) bloc.classList.toggle("hidden");
}
