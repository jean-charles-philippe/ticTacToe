# Tic-Tac-Toe, avec Carré magique et AI (POO JS)
Tic tac toe à jouer contre une personne ou l'ordinateur. Séléction du mode de jeu sur une page d'accueil.

La vérification du vainqueur à chaque tour est basée sur les résultats d'un carré magique de 3 sur 3.
 - [Carré magique](https://fr.wikipedia.org/wiki/Carr%C3%A9_magique_(math%C3%A9matiques))

![Carré magique 3X3](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Magicsquareexample.svg/309px-Magicsquareexample.svg.png)


L'AI est développée avec un algorythme de type minimax
 - [Algorythme Minimax](https://fr.wikipedia.org/wiki/Algorithme_minimax)

## 🛠 Langages utilisés
Javascript, HTML, CSS

## Classes
* ```Game``` mise en place du plateau de jeu, des écoueturs d'évènements 
* ```Player``` représente un joueur.
* ```Computer``` étends la classe ```Player```.

## Fonctionnalité de l'application
* Possibilité de jouer contre un autre joueur ou contre l'ordinateur
* Contre l'ordinateur, choix du premier joueur à chaque tour
* Premier coup du joueur ordinateur aléatoire
* Impossibilité de clicker sur une zone déjà ouccupée
* Le jeu est gagné à l'alignement de 3 symboles identiques, ou égalité si le plateau est rempli
* Affichage du score et du joueur actif

## Auteur
Jean Charles Philippe