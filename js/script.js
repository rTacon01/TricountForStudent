document.addEventListener('DOMContentLoaded', function () {
  // Permet de récupérer la Div permettant d'avoir la liste d'articles
  const listeArticles = document.getElementById('listeArticles');
  // Permet de récupérer le total et de le modifier
  const totalArticles = document.querySelector('.total span');
  // Permet de récupérer le récapitulatif des articles sélectionnés
  const recapitulatifArticles = document.getElementById('recapitulatif');

  // Liste d'articles avec leur nom et leur prix
  const article = [
    { nom: "Pain", prix: 1.20 },
    { nom: "Lait", prix: 0.80 },
    { nom: "Tomates", prix: 2.50 },
    { nom: "Pommes", prix: 3.00 },
    { nom: "Céréales", prix: 4.50 },
    { nom: "Fromage", prix: 2.90 }
  ];

  // Création de la variable total
  let total = 0;

  function viderListe() {
    listeArticles.innerHTML = '';
  }

  // Fonction pour ajouter les articles à la liste HTML
  function ajouterArticle() {
    viderListe();

    article.forEach(item => {
      // Créer un élément de liste pour chaque article
      const liste = document.createElement('li');

      // Créer une case à cocher pour chaque article
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = item.prix;
      checkbox.id = item.nom;

      // Créer un élément de récapitulatif pour cet article
      const recapElement = document.createElement('li');
      recapElement.textContent = `${item.nom} - ${item.prix.toFixed(2)}€`;
      recapElement.id = `recap-${item.nom}`;

      // Si on coche la case alors on update le total
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          // Ajouter l'article au récapitulatif
          recapitulatifArticles.appendChild(recapElement);
          total += item.prix;
        } else { // Si on le décheck, il faut retirer le prix et l'élément du récapitulatif
          const elementASupprimer = document.getElementById(`recap-${item.nom}`);
          if (elementASupprimer) {
            recapitulatifArticles.removeChild(elementASupprimer);
          }
          total -= item.prix;
        }
        // Mettre à jour le total
        totalArticles.textContent = total.toFixed(2) + "€";
      });

      // Créer un label pour l'élément de la liste
      const label = document.createElement('label');
      label.setAttribute('for', item.nom);
      label.textContent = `${item.nom} - ${item.prix.toFixed(2)}€ l'unité`;

      // Ajouter la case à cocher et le label à l'élément de liste
      liste.appendChild(checkbox);
      liste.appendChild(label);

      // Ajouter l'élément de liste au DOM
      listeArticles.appendChild(liste);
    });
  }

  // Initialiser la liste d'articles
  ajouterArticle();
});


let quantiter=0;

function ajouter_quantiter(){
  quantiter++;
  document.getElementById('quantiter').textContent = quantiter;
}

function soustraire_quantiter(){
  //evite les quantiter négative
  if(quantiter>0) {
    quantiter--;
  }
  document.getElementById("quantiter").textContent=quantiter;
}
