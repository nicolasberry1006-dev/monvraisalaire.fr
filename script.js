function updateInfo() {
  let statut = document.getElementById("statut").selectedIndex;
  let text = "";

  if (statut === 0) text = "Charges moyennes ~22%";
  if (statut === 1) text = "Charges moyennes ~25%";
  if (statut === 2) text = "Micro-entrepreneur : charges ~22% du CA";
  if (statut === 3) text = "Société : estimation globale";

  document.getElementById("info").innerText = text;
}

function calc() {
  let brut = +document.getElementById("brut").value || 0;
  let taux = +document.getElementById("statut").value;
  let impot = (+document.getElementById("impot").value || 0) / 100;

  let net = brut * (1 - taux);
  let netImpot = net * (1 - impot);

  let loyer = +document.getElementById("loyer").value || 0;
  let courses = +document.getElementById("courses").value || 0;
  let transport = +document.getElementById("transport").value || 0;
  let loisirs = +document.getElementById("loisirs").value || 0;

  let depenses = loyer + courses + transport + loisirs;
  let reste = netImpot - depenses;

  let ratio = (reste / netImpot) * 100;

  let classe = "good";
  let message = "🔥 Très bon niveau de vie";

  if (ratio < 20) {
    classe = "bad";
    message = "⚠️ Reste à vivre faible";
  } else if (ratio < 40) {
    classe = "mid";
    message = "👍 Situation correcte";
  }

  document.getElementById("net").innerText = net.toFixed(0) + "€";
  document.getElementById("netImpot").innerText = netImpot.toFixed(0) + "€";
  document.getElementById("depenses").innerText = depenses + "€";

  let resteEl = document.getElementById("reste");
  resteEl.innerHTML = "🟢 Reste : " + reste.toFixed(0) + "€ (" + ratio.toFixed(0) + "%)";
  resteEl.className = "reste " + classe;

  document.getElementById("analyse").innerText = message;

  document.getElementById("barDepenses").style.width =
    (depenses / netImpot) * 100 + "%";

  document.getElementById("barReste").style.width =
    (reste / netImpot) * 100 + "%";
}

updateInfo();