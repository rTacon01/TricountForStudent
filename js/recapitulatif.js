// Récupération des données depuis le localStorage
const data = JSON.parse(localStorage.getItem('courses'));
const tableBody = document.getElementById('tableBody');

if (data && data.articles && data.articles.length > 0) {
  const participants = data.participants || 1;

  // Remplir le tableau avec les données
  data.articles.forEach(article => {
    const row = document.createElement('tr');

    const nomCell = document.createElement('td');
    nomCell.textContent = article.nom;

    const quantiteCell = document.createElement('td');
    quantiteCell.textContent = article.quantite;

    const prixCell = document.createElement('td');
    prixCell.textContent = article.prix.toFixed(2) + " €";

    const totalCell = document.createElement('td');
    const totalArticle = article.quantite * article.prix;
    totalCell.textContent = totalArticle.toFixed(2) + " €";

    const participantsCell = document.createElement('td');
    participantsCell.textContent = participants;

    const totalParParticipantCell = document.createElement('td');
    const totalParParticipant = totalArticle / participants;
    totalParParticipantCell.textContent = totalParParticipant.toFixed(2) + " €";

    row.appendChild(nomCell);
    row.appendChild(quantiteCell);
    row.appendChild(prixCell);
    row.appendChild(totalCell);
    row.appendChild(participantsCell);
    row.appendChild(totalParParticipantCell);

    tableBody.appendChild(row);
  });

  // Afficher les informations globales
  document.getElementById('totalGeneral').textContent = `${data.totalGlobal} €`;
  document.getElementById('participants').textContent = data.participants;
  document.getElementById('prixParParticipant').textContent = `${data.prixParParticipant} €`;
} else {
  // Si aucune donnée n'est trouvée
  tableBody.innerHTML = '<tr><td colspan="6">Aucun article sélectionné.</td></tr>';
}
