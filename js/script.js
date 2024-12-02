document.addEventListener('DOMContentLoaded', function () {
  // Permet de récupérer la Div permettant d'avoir la liste d'articles
  const listeArticles = document.getElementById('listeArticles');
  // Permet de récupérer le total et de le modifier
  const totalArticles = document.querySelector('.total span');
  // Permet de récupérer le récapitulatif des articles sélectionnés
  const recapitulatifArticles = document.getElementById('recapitulatif');

  // Liste d'articles avec leur nom et leur prix
  const article = [
    { nom: "Pain", prix: 1.20, image : "img/bguette.webp", quantite: 0 },
    { nom: "Saucisson", prix: 3.80, image : "img/saucisson.webp", quantite: 0 },
    { nom: "Chips", prix: 2.50, image : "img/Chips.jpeg", quantite: 0 },
    { nom: "Jus d'orange", prix: 2.40, image : "img/jus orange.jpeg", quantite: 0 },
    { nom: "Céréales", prix: 3.30, image : "img/céréales.jpeg", quantite: 0 },
    { nom: "Fromage", prix: 2.90, image : "img/fromage.jpeg", quantite: 0 },
    { nom: "Ravioli", prix: 1.54, image : "img/ravioli.jpeg", quantite: 0 },
    { nom: "Tomates", prix: 3.99, image : "img/tomates.jpeg", quantite: 0 },
    { nom: "Carottes", prix: 1.30, image : "img/carottes.jpeg", quantite: 0 },
    { nom: "PS5", prix: 599.99, image : "img/PS5.jpeg", quantite: 0 }
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

  // Fonction pour mettre à jour le total
  function mettreAJourTotal() {
    total = article.reduce((acc, item) => acc + (item.prix * item.quantite), 0);
    totalArticles.textContent = total.toFixed(2) + "€";
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

      const quantiteContainer = document.createElement('div');
      quantiteContainer.style.display = 'inline-flex';
      quantiteContainer.style.gap = '10px';

      const moinsBtn = document.createElement('button');
      moinsBtn.textContent = '-';
      moinsBtn.disabled = true; // Désactiver initialement

      const quantiteSpan = document.createElement('span');
      quantiteSpan.textContent = '0';
      quantiteSpan.id = `quantite-${item.nom}`;

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';

      quantiteContainer.appendChild(moinsBtn);
      quantiteContainer.appendChild(quantiteSpan);
      quantiteContainer.appendChild(plusBtn);

      // Gestion des événements de boutons "+" et "-"
      plusBtn.addEventListener('click', function () {
        // Incrémenter la quantité de l'article
        item.quantite++;
        quantiteSpan.textContent = item.quantite;

        // Activer le bouton moins
        moinsBtn.disabled = false;

        // Mettre à jour le total si l'article est coché
        if (checkbox.checked) {
          total += item.prix;
          totalArticles.textContent = total.toFixed(2) + "€";
        }
      });

      moinsBtn.addEventListener('click', function () {
        // Décrémenter la quantité de l'article
        if (item.quantite > 0) {
          item.quantite--;
          quantiteSpan.textContent = item.quantite;

          // Désactiver le bouton moins si la quantité atteint 0
          if (item.quantite === 0) {
            moinsBtn.disabled = true;
          }

          // Mettre à jour le total si l'article est coché
          if (checkbox.checked) {
            total -= item.prix;
            totalArticles.textContent = total.toFixed(2) + "€";
          }
        }
      });

      // Si on coche la case alors on update le total
      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          // Ajouter l'article au récapitulatif
          recapElement.appendChild(quantiteContainer);
          recapitulatifArticles.appendChild(recapElement);

          // Mettre à jour le total en fonction de la quantité actuelle
          total += item.prix * item.quantite;
          totalArticles.textContent = total.toFixed(2) + "€";

          // Activer/désactiver le bouton moins selon la quantité
          moinsBtn.disabled = item.quantite === 0;
        } else { // Si on le décheck, il faut retirer le prix et l'élément du récapitulatif
          const elementASupprimer = document.getElementById(`recap-${item.nom}`);
          if (elementASupprimer) {
            recapitulatifArticles.removeChild(elementASupprimer);
          }

          // Soustraire le total de la quantité actuelle
          total -= item.prix * item.quantite;
          totalArticles.textContent = total.toFixed(2) + "€";
        }
      });

      // Créer un label pour l'élément de la liste
      const label = document.createElement('label');
      label.setAttribute('for', item.nom);
      label.textContent = `${item.nom}`;

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
