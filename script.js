function calc() {

  let brut = +document.getElementById("brut").value || 0;
  let taux = +document.getElementById("statut").value;
  let impot = (+document.getElementById("impot").value || 0) / 100;

  let net = brut * (1 - taux);
  let netImpot = net * (1 - impot);

  let loyer = +document.getElementById("loyer").value || 0;
  let courses = +document.getElementById("courses").value || 0;
  let transport = +document.getElementById("transport").value || 0;
  let factures = +document.getElementById("factures").value || 0;
  let loisirs = +document.getElementById("loisirs").value || 0;
  let autres = +document.getElementById("autres").value || 0;

  let depenses = loyer + courses + transport + factures + loisirs + autres;
  let reste = netImpot - depenses;

  let ratio = netImpot > 0 ? (reste / netImpot) * 100 : 0;

  let classe = "good";
  if (ratio < 20) classe = "bad";
  else if (ratio < 40) classe = "mid";

  let median = 1800;
  let niveau = "";
  let diff = netImpot - median;

  if (netImpot <= 0) niveau = "⚠️ Données invalides";
  else if (netImpot < median * 0.8) niveau = "🔴 En dessous de la moyenne";
  else if (netImpot < median * 1.2) niveau = "🟡 Dans la moyenne";
  else niveau = "🟢 Au-dessus de la moyenne";

  document.getElementById("net").innerText = net.toFixed(0) + "€";
  document.getElementById("netImpot").innerText = netImpot.toFixed(0) + "€";
  document.getElementById("depenses").innerText = depenses + "€";

  let resteEl = document.getElementById("reste");
  resteEl.innerHTML = "🟢 Reste : " + reste.toFixed(0) + "€ (" + ratio.toFixed(0) + "%)";
  resteEl.className = "reste " + classe;

  document.getElementById("detailDepenses").innerHTML = `
    🏠 ${loyer}€ | 🛒 ${courses}€ | 🚗 ${transport}€ <br>
    💡 ${factures}€ | 🎮 ${loisirs}€ | 📦 ${autres}€
  `;

  document.getElementById("analyse").innerHTML = `
    📊 Médiane : ${median}€ <br>
    📈 Niveau : <b>${niveau}</b> <br>
    💶 Écart : ${diff.toFixed(0)}€
  `;

  if (netImpot > 0) {
    document.getElementById("barDepenses").style.width = (depenses / netImpot) * 100 + "%";
    document.getElementById("barReste").style.width = (reste / netImpot) * 100 + "%";
  }
}

function partager() {
  let texte = document.getElementById("reste").innerText;
  navigator.clipboard.writeText("💰 " + texte + " → monvraisalaire.fr");
  alert("Résultat copié !");
}
