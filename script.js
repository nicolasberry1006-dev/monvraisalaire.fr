function calc() {

  let brut = +document.getElementById("brut").value || 0;
  let taux = +document.getElementById("statut").value;
  let impot = (+document.getElementById("impot").value || 0) / 100;

  let net = brut * (1 - taux);
  let netImpot = net * (1 - impot);

  let loyer = +document.getElementById("loyer")?.value || 0;
  let courses = +document.getElementById("courses")?.value || 0;
  let transport = +document.getElementById("transport")?.value || 0;
  let factures = +document.getElementById("factures")?.value || 0;
  let loisirs = +document.getElementById("loisirs")?.value || 0;
  let autres = +document.getElementById("autres")?.value || 0;

  let depenses = loyer + courses + transport + factures + loisirs + autres;
  let reste = netImpot - depenses;

  let ratio = netImpot > 0 ? (reste / netImpot) * 100 : 0;

  // 💥 CALCULS BONUS
  let parJour = reste / 30;
  let parAn = reste * 12;
  let sur5ans = parAn * 5;

  // 💣 MESSAGE ÉMOTIONNEL
  let message = "";
  if (ratio < 20) message = "💀 Situation fragile";
  else if (ratio < 40) message = "⚠️ Attention, marge faible";
  else message = "🔥 Bonne situation financière";

  // 📊 MÉDIANE
  let median = 1800;
  let niveau = netImpot > median ? "🟢 Au-dessus de la moyenne" : "🟡 Dans la moyenne";

  // AFFICHAGE
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

// toggle dépenses
function toggleDepenses() {
  let bloc = document.getElementById("depensesBloc");
  bloc.style.display = bloc.style.display === "none" ? "block" : "none";
}

// partage
function partager() {
  let texte = document.getElementById("reste").innerText;
  navigator.clipboard.writeText("💰 " + texte);
  alert("Résultat copié !");
}
