# SAE5.01 - Magasin Connecte

## Introduction
Ce projet est un travail universitaire consituant une SAE du cinquième semestre de l'année scolaire 2024-2025.

Ce projet a pour but la création d'un site web pour le compte du Magasin Connecte 4.0.

Ce site est un PWA qui devrait être utilisable pour créer un APK mobile. **(UPDATING)**

Le Magasin Connecte 4.0 est un magasin situer sur le campus universitaire de l'IUT de Saint-Jerôme à Marseille. Il propose des objets connectes mais aussi un service de magasin alimentaire pour les étudiants dans le besoin.

Ce projet est une amélioration du projet d'un autre groupe de l'année dernière.

GitHub du groupe de l'année dernière : https://github.com/MattiasGervilliers/MagasinConnecte4.0

## Documentation **(UPDATING)**
Ce projet est documenté au mieux pour permetter à d'autre groupe de travail de le reprendre dans le but de l'améliorer dans le futur.

Pour vous documenté sur ce projet vous pouvez aller voir notre [wiki](https://github.com/BELABBAS-Rayane-2225010aa/SAE5.01/wiki) présentant tout ce dont vous avez besoins.

Vous pouvez aussi aller voir nos différents [projets](https://github.com/BELABBAS-Rayane-2225010aa/SAE5.01/projects?query=is%3Aopen) pour vous rendre compte de notre travail tout au long de cette SAE.

## Architecture
Pour faire court, dans ce repository vous trouverez seulement le front-end du site. Nous anvons mis en place ce projet par le biais de [PWABuilder](https://www.pwabuilder.com), qui est lui même mis en place grâce à [lit](https://lit.dev) qui ne marche que en front-end.

Nous avons donc mis en place dans un autre repository une API en PHP 8.2 sur un autre serveur pour faire office de back-end.

lien du GitHub : https://github.com/CRESPIN-Alexandre-2225022aa/API-MagasinConnecte

L'ancien groupe avait utiliser [nuxt](https://nuxt.com) un framework de [Vue](https://vuejs.org). Nous avons découvert que ce framework, même s'il possède beaucoup d'avantage, ne permettait pas de mettre en place de serveur, ni de PWA, ni de version mobile.
