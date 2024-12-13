document.addEventListener('DOMContentLoaded', function () {

  /**
   * Variables principales pour séléctionner les élement de la page
   *
   */
  const listeArticles = document.getElementById('listeArticles');
  const totalArticles = document.querySelector('.total span');
  const recapitulatifArticles = document.getElementById('recapitulatif');

  const participantsInput = document.getElementById('participants');
  const searchInput = document.getElementById('searchInput'); // Champ de recherche

  // Ajout d'un élément pour afficher le prix par participant
  const prixParParticipantElement = document.createElement('div');
  prixParParticipantElement.id = 'prixParParticipant';
  totalArticles.parentNode.appendChild(prixParParticipantElement);


/**
  * Liste d'articles avec leur nom et leur prix,image et quantité
 * */
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
    { nom: "Tomates cerise", prix: 1.30, image: "img/tomates.jpeg", quantite: 0 },
  ];

  // Création de la variable total
  let total = 0;


  /**
   * Vider la liste des articles
   */
  function viderListe() {
    listeArticles.innerHTML = '';
  }

  /**
   * Affiche l'image de visualisation des différent article
   * @param src - chemin de l'image à l'affichage
   */
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
                left: 400px;
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

    imageDiv.innerHTML = `<img src="${src}" alt="Image de l'article" style="width: 200px; height: auto;">`;
    imageDiv.style.display = 'block';
  }

  /**
   * Permet de chacher l'image des article
   */
  function cacherImage() {
    const imageDiv = document.getElementById('imagePreview');
    if (imageDiv) {
      imageDiv.style.display = 'none';
    }
  }

  /**
   * Mise a jour du total global et le prix par participant
   */
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


  /**
   * Filtre de recherche des articles en fonction du terme souhaité
   * @param termeDeRecherche - Terme saisie par l'utilisateur
   */

  // Fonction de filtrage des articles    a changer si sa marche pas
  function filtrerArticles(termeDeRecherche) {
    const terme = termeDeRecherche.toLowerCase();
    const articlesFiltres = [];

    // D'abord, trier les articles en fonction de la recherche
    article.forEach(item => {
      const element = document.getElementById(item.nom);
      if (item.nom.toLowerCase().includes(terme)) {
        // Afficher l'élément si le terme est trouvé
        element.style.display = '';
        // Ajouter à la liste des articles filtrés
        articlesFiltres.push(item);
      } else {
        // Cacher l'élément si le terme ne correspond pas
        element.style.display = 'none';
      }
    });
    // Réorganiser la liste en mettant les articles filtrés en haut
    articlesFiltres.forEach(item => {
      const element = document.getElementById(item.nom);
      listeArticles.prepend(element.closest('li'));
    });
  }

  // Initialiser la liste d'articles
  ajouterArticle();

  // Écouter les changements dans le champ de recherche
  searchInput.addEventListener('input', function () {
    filtrerArticles(searchInput.value);
  });


  /**
   * Réinitialise le filtre de recherche
   */
  function reinitialiserFiltreDeRecherche() {
    searchInput.value = ''; // Vide le champ de recherche
    filtrerArticles(''); // Désactive le filtre en passant une chaîne vide
  }

  /**
   * Ajouter les articles à la liste affiché et configure leur quantité
   * Stocker la liste de course séléctionné ainsi que le prix total, par personne ,nombre de personne,quantité
   */
  // Fonction pour ajouter les articles à la liste HTML
  function ajouterArticle() {
    viderListe();

    article.forEach(item => {
      const liste = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = item.prix;
      checkbox.id = item.nom;

      // Création de recapElement
      const recapElement = document.createElement('div');
      recapElement.style.display = 'flex';
      recapElement.style.justifyContent = 'space-between';
      recapElement.style.alignItems = 'center';
      recapElement.style.gap = '10px';
      recapElement.id = `recap-${item.nom}`;

      // Création du texte descriptif de l'article
      const recapText = document.createElement('span');
      recapText.textContent = `${item.nom} - ${item.prix.toFixed(2)}€`;
      recapText.style.flexGrow = '1';

      // Création du conteneur de quantité
      const quantiteContainer = document.createElement('div');
      quantiteContainer.className = 'quantite-container';

      const moinsBtn = document.createElement('button');
      moinsBtn.className = 'quantite-button';
      moinsBtn.textContent = '-';

      const plusBtn = document.createElement('button');
      plusBtn.className = 'quantite-button';
      plusBtn.textContent = '+';

      const quantiteSpan = document.createElement('span');
      quantiteSpan.className = 'quantite-value';
      quantiteSpan.textContent = '0';

      // Ajouter les boutons et la quantité au conteneur
      quantiteContainer.appendChild(moinsBtn);
      quantiteContainer.appendChild(quantiteSpan);
      quantiteContainer.appendChild(plusBtn);

      // Ajout du texte et du conteneur de quantité dans recapElement
      recapElement.appendChild(recapText);
      recapElement.appendChild(quantiteContainer);

      // Gestion des événements pour la quantité
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
          recapitulatifArticles.appendChild(recapElement); // Ajout au récapitulatif
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

      // Création de la case à cocher avec le label
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
    const participants = parseInt(participantsInput.value) || 1; // Valeur par défaut : 1 participant
    const totalParParticipant = (total / participants).toFixed(2);

    const selections = {
      participants: participants,
      prixParParticipant: totalParParticipant,
      totalGlobal: total.toFixed(2),
      articles: article
        .filter(a => a.quantite > 0)
        .map(a => ({ nom: a.nom, quantite: a.quantite, prix: a.prix })),
    };

    localStorage.setItem('courses', JSON.stringify(selections));
    alert('Vos courses ont été sauvegardées.');
  };

});
