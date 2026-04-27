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
  // 💰 ÉPARGNE INTELLIGENTE
  // ========================

  let revenu = netImpot;
  let tauxEpargne = 0;

  if (!isNaN(revenu) && revenu > 0 && !isNaN(reste)) {
    tauxEpargne = Math.round((reste / revenu) * 100);
  }

  // affichage
  document.getElementById("resteAffiche").textContent = reste.toFixed(0) + "€";
  document.getElementById("tauxEpargne").textContent = tauxEpargne + "%";

  // logique
  let reco = "";

  if (tauxEpargne < 5) {
    reco = "❌ Situation fragile — épargne difficile";
  } else if (tauxEpargne < 15) {
    reco = "⚠️ Épargne faible — vise 10 à 15%";
  } else if (tauxEpargne < 30) {
    reco = "👍 Bonne gestion — continue comme ça";
  } else {
    reco = "💸 Excellent — forte capacité d’épargne";
  }

  let epargneMin = Math.round(revenu * 0.1);
  let epargneMax = Math.round(revenu * 0.2);

  reco += `<br>📈 Recommandé : ${epargneMin}€ à ${epargneMax}€ / mois`;

  document.getElementById("recoEpargne").innerHTML = reco;
  // jauge dynamique
let jauge = document.getElementById("jaugeFill");
let label = document.getElementById("jaugeLabel");

if (jauge && label) {

  let couleur = "";

  if (tauxEpargne < 10) couleur = "#ff4d4d";      // rouge
  else if (tauxEpargne < 20) couleur = "#ffa500"; // orange
  else couleur = "#00ffae";                       // vert

  jauge.style.width = tauxEpargne + "%";
  jauge.style.background = couleur;

  label.textContent = `Capacité d’épargne : ${tauxEpargne}%`;
}

  // ========================
  // 📊 AUTRES AFFICHAGES
  // ========================

  document.getElementById("net").innerText = net.toFixed(0) + "€";
  document.getElementById("netImpot").innerText = netImpot.toFixed(0) + "€";

  document.getElementById("reste").innerHTML =
    "🟢 Reste : " + reste.toFixed(0) + "€ (" + ratio.toFixed(0) + "%)";

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
}
function partager() {
  let reste = document.getElementById("resteAffiche").textContent;

  if (navigator.share) {
    navigator.share({
      title: "Mon reste à vivre",
      text: `Je pensais être bien… mais il me reste ${reste} 😬 Fais le test`,
      url: "https://combienreste.fr"
    });
  } else {
    alert("Partage non supporté");
  }
}
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

function toggleDepenses() {
  const bloc = document.getElementById("depensesBloc");
  if (!bloc) return;

  bloc.classList.toggle("visible");
  bloc.classList.toggle("hidden");
}
