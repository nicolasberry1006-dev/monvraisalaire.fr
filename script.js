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

  let median = 1800;
  let niveau = netImpot > median ? "🟢 Au-dessus de la moyenne" : "🟡 Dans la moyenne";

  document.getElementById("net").innerText = net.toFixed(0) + "€";
  document.getElementById("netImpot").innerText = netImpot.toFixed(0) + "€";

  document.getElementById("reste").innerHTML =
    "🟢 Reste : " + reste.toFixed(0) + "€ (" + ratio.toFixed(0) + "%)";

  document.getElementById("analyse").innerHTML =
    `📊 Médiane : ${median}€<br>📈 ${niveau}`;

  if (netImpot > 0) {
    document.getElementById("barDepenses").style.width = (depenses / netImpot) * 100 + "%";
    document.getElementById("barReste").style.width = (reste / netImpot) * 100 + "%";
  }
}

function toggleDepenses() {
  let bloc = document.getElementById("depensesBloc");
  bloc.style.display = bloc.style.display === "none" ? "block" : "none";
}

function partager() {
  let texte = document.getElementById("reste").innerText;
  navigator.clipboard.writeText("💰 " + texte);
  alert("Copié !");
}
