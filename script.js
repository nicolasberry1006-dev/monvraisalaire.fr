function calc() {
  let brut = +document.getElementById("brut").value || 0;
  let taux = +document.getElementById("statut").value;
  let impot = (+document.getElementById("impot").value || 0) / 100;

  let net = brut * (1 - taux);
  let netImpot = net * (1 - impot);

  // 💸 Dépenses détaillées
  let loyer = +document.getElementById("loyer").value || 0;
  let courses = +document.getElementById("courses").value || 0;
  let transport = +document.getElementById("transport").value || 0;
  let factures = +document.getElementById("factures").value || 0;
  let loisirs = +document.getElementById("loisirs").value || 0;
  let autres = +document.getElementById("autres").value || 0;

  let depenses = loyer + courses + transport + factures + loisirs + autres;
  let reste = netImpot - depenses;

  let ratio = netImpot > 0 ? (reste / netImpot) * 100 : 0;

  // 🎯 Niveau
  let median = 1800;
  let niveau = "";
  let diff = netImpot - median;

  if (netImpot <= 0) {
    niveau = "⚠️ Données invalides";
  } else if (netImpot < median * 0.8) {
    niveau = "🔴 En dessous de la moyenne";
  } else if (netImpot < median * 1.2) {
    niveau = "🟡 Dans la moyenne";
  } else {
    niveau = "🟢 Au-dessus de la moyenne";
  }

  // 🎨 Couleur dynamique
  let classe = "good";
  if (ratio < 20) classe = "bad";
  else if (ratio < 40) classe = "mid";

  // 📊 Affichage principal
  document.getElementById("net").innerText = net.toFixed(0) + "€";
  document.getElementById("netImpot").innerText = netImpot.toFixed(0) + "€";
  document.getElementById("depenses").innerText = depenses + "€";

  // 💰 Reste
  let resteEl = document.getElementById("reste");
  resteEl.innerHTML = "🟢 Reste : " + reste.toFixed(0) + "€ (" + ratio.toFixed(0) + "%)";
  resteEl.className = "reste " + classe;

  // 📊 Détail des dépenses (NOUVEAU 🔥)
  document.getElementById("detailDepenses").innerHTML = `
    🏠 Loyer : ${loyer}€<br>
    🛒 Courses : ${courses}€<br>
    🚗 Transport : ${transport}€<br>
    💡 Factures : ${factures}€<br>
    🎮 Loisirs : ${loisirs}€<br>
    📦 Autres : ${autres}€
  `;

  // 📈 Analyse
  document.getElementById("analyse").innerHTML = `
    <p>📊 Salaire médian France : ~${median}€</p>
    <p>📈 Ton niveau : <b>${niveau}</b></p>
    <p>💶 Écart avec la moyenne : <b>${diff.toFixed(0)}€</b></p>
  `;

  // 📊 Barres
  if (netImpot > 0) {
    document.getElementById("barDepenses").style.width =
      (depenses / netImpot) * 100 + "%";

    document.getElementById("barReste").style.width =
      (reste / netImpot) * 100 + "%";
  }
}

`;
  document.getElementById("barDepenses").style.width =
    (depenses / netImpot) * 100 + "%";

  document.getElementById("barReste").style.width =
    (reste / netImpot) * 100 + "%";
}

// 📲 PARTAGE SIMPLE
function partager() {
  let texte = document.getElementById("reste").innerText;

  navigator.clipboard.writeText(
    "💰 Mon vrai salaire : " + texte + " → monvraisalaire.fr"
  );

  alert("Résultat copié ! Tu peux le partager 🚀");
}
