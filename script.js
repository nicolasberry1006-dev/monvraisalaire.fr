// ========================
// 🔥 CALCUL PRINCIPAL
// ========================

function calc() {

  let brut = parseFloat(document.getElementById("brut").value) || 0;
  let tauxStatut = parseFloat(document.getElementById("statut").value) || 0;
  let impot = (parseFloat(document.getElementById("impot").value) || 0) / 100;

  let net = brut * (1 - tauxStatut);
  let netImpot = net * (1 - impot);

  let loyer = parseFloat(document.getElementById("loyer")?.value) || 0;
  let courses = parseFloat(document.getElementById("courses")?.value) || 0;
  let transport = parseFloat(document.getElementById("transport")?.value) || 0;
  let factures = parseFloat(document.getElementById("factures")?.value) || 0;
  let loisirs = parseFloat(document.getElementById("loisirs")?.value) || 0;
  let autres = parseFloat(document.getElementById("autres")?.value) || 0;

  let depenses = loyer + courses + transport + factures + loisirs + autres;
  let reste = netImpot - depenses;

  let ratio = netImpot > 0 ? (reste / netImpot) * 100 : 0;
  let percent = Math.round(ratio);

  let parJour = reste / 30;
  let parAn = reste * 12;
  let sur5ans = parAn * 5;

  let message = "";
  if (ratio < 20) message = "💀 Situation fragile";
  else if (ratio < 40) message = "⚠️ Attention, marge faible";
  else message = "🔥 Bonne situation financière";

  let median = 1800;
  let niveau = netImpot > median ? "🟢 Au-dessus de la moyenne" : "🟡 Dans la moyenne";

  // ========================
  // 💰 AFFICHAGE EXISTANT
  // ========================

  document.getElementById("net").innerText = net.toFixed(0) + "€";
  document.getElementById("netImpot").innerText = netImpot.toFixed(0) + "€";

  document.getElementById("reste").innerHTML =
    "💰 Reste : " + reste.toFixed(0) + "€ (" + percent + "%)";

  document.getElementById("analyse").innerHTML = `
    <p><b>${message}</b></p>
    <p>💥 ${reste.toFixed(0)}€ = ${parJour.toFixed(0)}€/jour</p>
    <p>📅 Par an : ${parAn.toFixed(0)}€</p>
    <p>🚀 En 5 ans : ${sur5ans.toFixed(0)}€</p>
    <br>
    <p>📊 Médiane : ${median}€</p>
    <p>${niveau}</p>
  `;

  if (netImpot > 0) {
    document.getElementById("barDepenses").style.width = (depenses / netImpot) * 100 + "%";
    document.getElementById("barReste").style.width = (reste / netImpot) * 100 + "%";
  }

  // ========================
  // 🔥 RESULTAT PREMIUM
  // ========================

  // animation compteur
  animateValue("resteEuro", 0, reste, 800);

  let restePercent = document.getElementById("restePercent");
  if (restePercent) restePercent.textContent = percent + "%";

  // status
  function getStatus(p) {
    if (p < 20) return { class: "bad", text: "🔴 Situation fragile : marge trop faible" };
    if (p < 30) return { class: "warning", text: "🟠 Correct mais améliorable" };
    if (p < 40) return { class: "good", text: "🟢 Bon équilibre financier" };
    return { class: "good", text: "🔵 Très confortable financièrement" };
  }

  let status = getStatus(percent);
  let statusBox = document.getElementById("statusBox");

  if (statusBox) {
    statusBox.className = "result-status " + status.class;
    statusBox.innerHTML = status.text;
  }

  // position
  let positionUser = document.getElementById("positionUser");
  if (positionUser) {
    positionUser.innerHTML = `👉 Tu es ici : <strong>${percent}%</strong>`;
  }

  // recommandation
  let recoBox = document.getElementById("recommandation");
  if (recoBox) {
    let min = Math.round(netImpot * 0.15);
    let max = Math.round(netImpot * 0.25);

    recoBox.innerHTML = `
      👉 Idéalement : <strong>${min}€ à ${max}€ / mois</strong><br>
      👉 Ton reste à vivre est calculé <strong>avant épargne</strong>
    `;
  }

  // message émotionnel léger
  if (statusBox) {
    let extra = "";

    if (percent < 20) extra = "<br>😬 Tu es proche d’une zone à risque";
    else if (percent < 30) extra = "<br>🙂 Tu peux encore optimiser";
    else extra = "<br>🔥 Tu es au-dessus de la moyenne";

    statusBox.innerHTML += extra;
  }

  // share text
  let share = document.getElementById("shareText");
  if (share) {
    share.textContent = `💬 Je pensais être bien… mais il me reste ${percent}% 😬`;
  }

  // reveal animation
  let resultBox = document.getElementById("resultPremium");
  if (resultBox) {
    resultBox.style.opacity = 0;
    setTimeout(() => {
      resultBox.style.transition = "0.4s";
      resultBox.style.opacity = 1;
    }, 200);
  }
}

// ========================
// 🔥 ANIMATION
// ========================

function animateValue(id, start, end, duration) {
  let obj = document.getElementById(id);
  if (!obj) return;

  let range = end - start;
  let current = start;
  let increment = range / (duration / 16);

  let timer = setInterval(() => {
    current += increment;

    if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
      current = end;
      clearInterval(timer);
    }

    obj.textContent = Math.round(current) + "€";
  }, 16);
}

// ========================
// 🔥 TOGGLE DEPENSES
// ========================

function toggleDepenses() {
  const bloc = document.getElementById("depensesBloc");
  if (!bloc) return;
  bloc.classList.toggle("visible");
}

// ========================
// 🔥 PARTAGE
// ========================

function partager() {
  let reste = document.getElementById("resteEuro")?.textContent || "";

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
