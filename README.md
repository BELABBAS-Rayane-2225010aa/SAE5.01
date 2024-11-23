# SAE5.01 - Magasin Connecté

## Introduction
Ce projet est un travail universitaire constituant une SAE (Situation d’Apprentissage et d’Évaluation) du cinquième semestre de l’année scolaire 2024-2025.

Il a pour objectif la création d’un site web pour le **Magasin Connecté 4.0**.  

Ce site est une **Progressive Web App (PWA)**, prévue pour pouvoir être transformée en application mobile (APK). **(UPDATING)**  

Le **Magasin Connecté 4.0** est une boutique située sur le campus universitaire de l’IUT de Saint-Jérôme à Marseille.  
Il propose des objets connectés ainsi qu’un service alimentaire destiné aux étudiants dans le besoin.  

Ce projet est une amélioration du travail réalisé par un autre groupe lors de l’année précédente.  

GitHub du groupe précédent : https://github.com/MattiasGervilliers/MagasinConnecte4.0

## Documentation **(UPDATING)**
Ce projet est documenté pour permettre à d’autres groupes de le reprendre et de l’améliorer dans le futur.  

Pour plus d’informations, vous pouvez consulter :  
- Notre [wiki](https://github.com/BELABBAS-Rayane-2225010aa/SAE5.01/wiki), qui présente tout le nécessaire.  
- Nos différents [projets](https://github.com/BELABBAS-Rayane-2225010aa/SAE5.01/projects?query=is%3Aopen), pour un aperçu du travail effectué tout au long de cette SAE.  

## Architecture
En résumé, ce dépôt contient uniquement le **front-end** du site.  
Nous avons développé ce projet à l’aide de [PWABuilder](https://www.pwabuilder.com), qui s’appuie sur [Lit](https://lit.dev), un framework exclusivement orienté front-end.  

Le **back-end** est hébergé sur un autre serveur et développé via une API en PHP 8.2, disponible dans un dépôt distinct :  
GitHub de l’API : https://github.com/CRESPIN-Alexandre-2225022aa/API-MagasinConnecte

L’ancien groupe avait utilisé [Nuxt](https://nuxt.com), un framework basé sur [Vue.js](https://vuejs.org).  
Bien que Nuxt présente de nombreux avantages, nous avons constaté qu’il ne permettait pas de mettre en place de serveur, de PWA, ni de version mobile.  
