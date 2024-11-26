document.addEventListener('DOMContentLoaded', function () {
  // Permet de récupérer la Div permettant d'avoir la liste d'articles
  const listeArticles = document.getElementById('listeArticles');
  // Permet de récupérer le total et de le modifier
  const totalArticles = document.querySelector('.total span');
  // Permet de récupérer le récapitulatif des articles sélectionnés
  const recapitulatifArticles = document.getElementById('recapitulatif');

// Liste d'articles avec leur nom et leur prix
  const article = [
    { nom: "Pain", prix: 1.20, image : "img/bguette.webp" },
    { nom: "Saucisson", prix: 3.80, image : "img/saucisson.webp" },
    { nom: "Chips", prix: 2.50, image : "img/Chips.jpeg" },
    { nom: "Jus d'orange", prix: 2.40, image : "img/jus orange.jpeg" },
    { nom: "Céréales", prix: 3.30, image : "img/céréales.jpeg" },
    { nom: "Fromage", prix: 2.90, image : "" },
    { nom: "PS5", prix: 599.99, image : "img/PS5.jpeg" }
  ];

  // Création de la variable total
  let total = 0;

  function viderListe() {
    listeArticles.innerHTML = '';
  }

  function afficherImage(src) {
    let imageDiv = document.getElementById('imagePreview');
    if (!imageDiv) {
      imageDiv = document.createElement('div');
      imageDiv.id = 'imagePreview';
      imageDiv.style.position = 'absolute';
      imageDiv.style.border = '1px solid #ddd';
      imageDiv.style.padding = '10px';
      imageDiv.style.backgroundColor = '#fff';
      document.body.appendChild(imageDiv);
    }
    imageDiv.innerHTML = `<img src="${src}" alt="Image de l'article" style="width: 300px; height: auto;">`;
    imageDiv.style.display = 'block';
  }

  function cacherImage() {
    const imageDiv = document.getElementById('imagePreview');
    if (imageDiv) {
      imageDiv.style.display = 'none';
    }
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

      // Ajouter des événements pour afficher l'image au survol et la cacher quand la souris quitte
      liste.addEventListener('mouseover', () => afficherImage(item.image));
      liste.addEventListener('mouseout', cacherImage);

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
