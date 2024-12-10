document.addEventListener('DOMContentLoaded', function () {
  // Sélection des éléments principaux
  const listeArticles = document.getElementById('listeArticles');
  const totalArticles = document.querySelector('.total span');
  const recapitulatifArticles = document.getElementById('recapitulatif');
  const participantsInput = document.getElementById('participants');

  // Ajout d'un élément pour afficher le prix par participant
  const prixParParticipantElement = document.createElement('div');
  prixParParticipantElement.id = 'prixParParticipant';
  totalArticles.parentNode.appendChild(prixParParticipantElement);

  // Liste d'articles avec leur nom et leur prix
  const article = [
    { nom: "Pain", prix: 1.20, image: "img/bguette.webp", quantite: 0 },
    { nom: "Saucisson", prix: 3.80, image: "img/saucisson.webp", quantite: 0 },
    { nom: "Chips", prix: 2.50, image: "img/Chips.jpeg", quantite: 0 },
    { nom: "Jus d'orange", prix: 2.40, image: "img/jus orange.jpeg", quantite: 0 },
    { nom: "Céréales", prix: 3.30, image: "img/céréales.jpeg", quantite: 0 },
    { nom: "Fromage", prix: 2.90, image: "img/fromage.jpeg", quantite: 0 },
    { nom: "Ravioli", prix: 1.54, image: "img/ravioli.jpeg", quantite: 0 },
    { nom: "Tomates", prix: 3.99, image: "img/tomates.jpeg", quantite: 0 },
    { nom: "Carottes", prix: 1.30, image: "img/carottes.jpeg", quantite: 0 },
    { nom: "PS5", prix: 599.99, image: "img/PS5.jpeg", quantite: 0 }
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

      // Ajouter des styles responsives via une feuille de style
      const style = document.createElement('style');
      style.innerHTML = `
            #imagePreview {
                left: 250px;
                top: 50%;
                transform: translate(-25%, -25%);
                display: none;
            }

            @media (max-width: 768px) {
                #imagePreview {
                    left: 250px;
                    width: 200px;
                }
            }

            @media (max-width: 480px) {
                #imagePreview {
                    left: 5px;
                    width: 70%;
                }
            }
        `;
      document.head.appendChild(style);
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

  function mettreAJourTotal() {
    const participants = parseInt(participantsInput.value) || 1;

    // Calculer le total global basé sur la quantité d'articles et leur prix
    total = article.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

    // Mettre à jour le total global (total ne dépend pas du nombre de participants)
    totalArticles.textContent = total.toFixed(2) + "€";

    // Calculer le prix par participant en fonction du nombre de participants
    const prixParParticipant = total / participants;

    // Mettre à jour le prix par participant
    prixParParticipantElement.textContent = `Prix par personne : ${prixParParticipant.toFixed(2)}€`;
  }

  // Ajouter un écouteur d'événements pour le changement du nombre de participants
  participantsInput.addEventListener('change', mettreAJourTotal);

  // Fonction pour ajouter les articles à la liste HTML
  function ajouterArticle() {
    viderListe();

    article.forEach(item => {
      const liste = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = item.prix;
      checkbox.id = item.nom;

      const recapElement = document.createElement('li');
      recapElement.textContent = `${item.nom} - ${item.prix.toFixed(2)}€`;
      recapElement.id = `recap-${item.nom}`;

      const quantiteContainer = document.createElement('div');
      quantiteContainer.style.display = 'inline-flex';
      quantiteContainer.style.gap = '10px';

      const moinsBtn = document.createElement('button');
      moinsBtn.textContent = '-';
      moinsBtn.disabled = true;

      const quantiteSpan = document.createElement('span');
      quantiteSpan.textContent = '0';
      quantiteSpan.id = `quantite-${item.nom}`;

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';

      quantiteContainer.appendChild(moinsBtn);
      quantiteContainer.appendChild(quantiteSpan);
      quantiteContainer.appendChild(plusBtn);

      plusBtn.addEventListener('click', function () {
        item.quantite++;
        quantiteSpan.textContent = item.quantite;
        moinsBtn.disabled = false;
        if (checkbox.checked) {
          mettreAJourTotal();
        }
      });

      moinsBtn.addEventListener('click', function () {
        if (item.quantite > 0) {
          item.quantite--;
          quantiteSpan.textContent = item.quantite;
          if (item.quantite === 0) {
            moinsBtn.disabled = true;
          }
          if (checkbox.checked) {
            mettreAJourTotal();
          }
        }
      });

      checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
          recapElement.appendChild(quantiteContainer);
          recapitulatifArticles.appendChild(recapElement);
          mettreAJourTotal();
          moinsBtn.disabled = item.quantite === 0;
        } else {
          const elementASupprimer = document.getElementById(`recap-${item.nom}`);
          if (elementASupprimer) {
            recapitulatifArticles.removeChild(elementASupprimer);
          }
          mettreAJourTotal();
        }
      });

      const label = document.createElement('label');
      label.setAttribute('for', item.nom);
      label.textContent = `${item.nom}`;

      liste.appendChild(checkbox);
      liste.appendChild(label);

      liste.addEventListener('mouseover', () => afficherImage(item.image));
      liste.addEventListener('mouseout', cacherImage);

      listeArticles.appendChild(liste);
    });
  }

  // Initialiser la liste d'articles
  ajouterArticle();

  // Ajouter le bouton "Stocker" dans le conteneur gris
  const containerGris = totalArticles.parentElement; // Conteneur parent du total
  const stockerButton = document.createElement('button');
  stockerButton.textContent = 'Stocker';
  stockerButton.style.display = 'block';
  stockerButton.style.margin = '10px auto'; // Centrage
  containerGris.appendChild(stockerButton);

  stockerButton.onclick = function () {
    const selections = {
      participants: participantsInput.value,
      articles: article
        .filter(a => a.quantite > 0)
        .map(a => ({ nom: a.nom, quantite: a.quantite, prix: a.prix })),
    };

    localStorage.setItem('courses', JSON.stringify(selections));
    alert('Vos courses ont été sauvegardées.');
  };
});
