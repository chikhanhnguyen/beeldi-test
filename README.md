# Démo

https://myworld-e0h7d2bubmfzghc0.francecentral-01.azurewebsites.net/

# Introduction

Projet frontend React - redux/saga avec un backend simulé.

### Schéma de flux de données Redux

![ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26](https://github.com/user-attachments/assets/2c4c3304-5862-4237-bfd3-9dc58d8716e6)

# Exécution

1. ```npm install```

2. ```npm start```

# Déploiement

1. ```npm run build```

2. Ensuite déployer sur le service Azure Application Web

# Les fonctionnalités de base

**1. Page d'accueil** 

Ici, tous les équipements disponibles seront listés (par ordre
alphabétique), chaque équipement étant affiché sous forme de carte comprenant des
informations de base : _image, nom, domaine, nombre de défauts_. En outre, sur cette
carte, on peut voir des informations supplémentaires telles que _la marque, le bâtiment_
(par défaut, ces informations seront masquées pour éviter les distractions).

**2. Page de détails** 

Lorsqu'on clique sur une carte d’équipement, on sera dirigé vers
cette page. Elle comprend les sections suivantes :
- Affichage des informations complètes d’un équipement, les points de contrôle sont
également listés.
- Les informations sur les points de contrôle sont triées (dans la partie backend) par
ordre de priorité, les éléments avec le plus d'informations étant en tête (nom, défaut,
recommandation, photo). Les points de contrôle sont affichés en défilement
horizontal pour améliorer l'expérience utilisateur.
- En haut à gauche, la section de navigation par catégories sera affichée.
Actuellement, les équipements ne sont pas encore classés par catégorie, mais j'ai
ajouté cette fonctionnalité pour une utilisation future si nous classons les
équipements.
- L'image principale de l'équipement sera zoomé lorsqu'on clique dessus.

**3. Fonctionnalité de recherche**

- La barre de recherche est toujours affichée dans la barre de navigation, clique sur
l'icône de recherche pour afficher plus d’informations.
- Elle permet de rechercher par “nom, marque, domaine, bâtiment” (par défaut, la
recherche se fait sur le “nom”), et il est très facile d'ajouter de nouveaux filtres dans
les codes de Frontend.
- Pour améliorer l'expérience utilisateur, les filtres sont affichés clairement et les
résultats de recherche sont affichés instantanément sous la barre de recherche. On
peut cliquer sur un résultat pour accéder à la page des informations détaillées, ou
appuyer sur "Entrée" ou cliquer sur "voir tous" pour accéder à la page affichant
tous les résultats. J'ai également ajouté le nombre de résultats trouvés ici.
- Les résultats affichés sous la barre de recherche sont envoyés par le frontend au
backend 0,5 seconde après que l'utilisateur a saisi quelque chose, ce qui évite
l'envoi massif de requêtes du frontend vers le backend, réduisant ainsi les causes de
congestion et de retard pour cette fonctionnalité. On constate que ce délai de 0,5
seconde devient utile lorsque nous avons une grande quantité de données à traiter.
