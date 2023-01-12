"use strict";

class Game {
  friendButton = document.getElementById("vs-friend");
  computerButton = document.getElementById("vs-computer");
  modalBackGround = document.getElementById("modal-background");
  modal = document.getElementById("modal");
  home = document.getElementById("home");
  back = document.getElementById("back");
  container = document.querySelector("#container");
  resetBtn = document.getElementById("reset");
  gameBoard = document.getElementById("game-board");
  idPlayer1Header = "cross-gamer";
  idPlayer2Header = "circle-gamer";
  divPlayer1Header = document.getElementById(this.idPlayer1Header);
  divPlayer2Header = document.getElementById(this.idPlayer2Header);
  scorePlayer1 = [];
  scorePlayer2 = [];
  player1;
  player2;
  board = [];
  magicBoard = [2, 7, 6, 9, 5, 1, 4, 3, 8];
  crossWin = document.getElementById("cross-win");
  circleWin = document.getElementById("circle-win");
  score1 = document.querySelector("#cross-score >.score");
  score2 = document.querySelector("#circle-score >.score");
  firstRound = true;

  // Fonction qui permet de lancer l'application sur la page d'accueil avec choix du type de jeu
  getApp() {
    this.friendButton.addEventListener("click", () => {
      this.player1 = new Player("X", true);
      this.player2 = new Player("O");
      this.getHeader(this.player1, this.player2);
    });

    this.computerButton.addEventListener("click", () => {
      this.toggleModal();
    });

    // this.modalBackGround.addEventListener("click", () => {
    //   // this.toggleModal();
    //   this.modal.classList.remove("open");
    //   this.modalBackGround.classList.remove("open");
    //   this.modal.classList.add("closed");
    //   this.modalBackGround.classList.add("closed");
    // });
  }

  // Fonction qui permet d'initialiser l'en tête de la grille de jeu
  getHeader = () => {
    this.home.style.display = "none";
    this.back.style.visibility = "visible";

    if (this.player1.active) {
      document.getElementById(this.idPlayer1Header).classList.add("activ");
    } else if (this.player2.active) {
      document.getElementById(this.idPlayer2Header).classList.add("activ");
    }
    if (this.firstRound === true) {
      this.setGame();
    }
  };

  // Fonction qui permet de générer la grille de jeu en fonction du mode choisi
  setGame() {
    this.gameBoard.style.display = "flex";
    let score1 = 0;
    let score2 = 0;

    for (let index = 0; index < this.magicBoard.length; index++) {
      const value = this.magicBoard[index];

      const div = document.createElement("div");
      div.setAttribute("id", value);
      div.setAttribute("class", "block");
      div.setAttribute("data-index", index);
      div.innerHTML = `
                    <i class="fa-solid fa-xmark cross dn"></i>
                    <i class="fa-regular fa-circle circle dn"></i>`;
      this.container.appendChild(div);

      const crossClass = div.getElementsByClassName(
        this.idPlayer1Header.split("-").shift()
      )[0].classList;

      const circleClass = div.getElementsByClassName(
        this.idPlayer2Header.split("-").shift()
      )[0].classList;

      div.addEventListener("click", (e) => {
        if (this.player1.active) {
          crossClass.remove("dn");
          circleClass.add("dn");

          this.scorePlayer1.push(this.magicBoard[index]);
          this.board[div.getAttribute("data-index")] = this.player1.name;

          if (this.canPlay(this.board) !== true) {
            this.container.style.pointerEvents = "none";
            this.divPlayer2Header.classList.remove("activ");
            this.divPlayer1Header.classList.remove("activ");
          } else if (this.didPlayerWin(this.scorePlayer1)) {
            this.container.style.pointerEvents = "none";
            this.crossWin.style.display = "flex";
            score1++;
            this.score1.textContent = score1;
          } else {
            this.divPlayer1Header.classList.remove("activ");
            this.divPlayer2Header.classList.add("activ");
            this.divPlayer2Header.style.transform = "scale(1.1)";
            this.divPlayer1Header.style.transform = "scale(1)";
            this.player1.active = false;
            this.player2.active = true;
            div.style.pointerEvents = "none";

            if (this.player2.active && this.player2.computer) {
              let move = this.findBestMove(
                this.board,
                this.player1,
                this.player2
              );
              this.board[move] = this.player2.name;
              this.scorePlayer2.push(this.magicBoard[move]);

              document
                .querySelector(`div[data-index="${move}"]`)
                .children[1].classList.remove("dn");
              document
                .querySelector(`div[data-index="${move}"]`)
                .children[0].classList.add("dn");

              document.querySelector(
                `div[data-index="${move}"]`
              ).style.pointerEvents = "none";

              if (this.canPlay(this.board) !== true) {
                this.container.style.pointerEvents = "none";
                this.divPlayer2Header.classList.remove("activ");
                this.divPlayer1Header.classList.remove("activ");
              } else if (this.didPlayerWin(this.scorePlayer2)) {
                this.container.style.pointerEvents = "none";
                this.circleWin.style.display = "flex";
                score2++;
                this.score2.textContent = score2;
              } else {
                this.divPlayer2Header.classList.remove("activ");
                this.divPlayer1Header.classList.add("activ");
                this.divPlayer1Header.style.transform = "scale(1.1)";
                this.divPlayer2Header.style.transform = "scale(1)";
                this.player2.active = false;
                this.player1.active = true;
              }
            }
          }
        } else if (this.player2.active && !this.player2.computer) {
          circleClass.remove("dn");
          crossClass.add("dn");

          this.scorePlayer2.push(this.magicBoard[index]);
          this.board[div.getAttribute("data-index")] = this.player2.name;
          div.style.pointerEvents = "none";

          if (this.canPlay(this.board) !== true) {
            this.container.style.pointerEvents = "none";
            this.divPlayer2Header.classList.remove("activ");
            this.divPlayer1Header.classList.remove("activ");
          } else if (this.didPlayerWin(this.scorePlayer2)) {
            this.container.style.pointerEvents = "none";
            this.circleWin.style.display = "flex";
            score2++;
            this.score2.textContent = score2;
          } else {
            this.divPlayer2Header.classList.remove("activ");
            this.divPlayer1Header.classList.add("activ");
            this.divPlayer1Header.style.transform = "scale(1.1)";
            this.divPlayer2Header.style.transform = "scale(1)";
            this.player2.active = false;
            this.player1.active = true;
          }
        }
      });
    }

    this.resetBtn.addEventListener("click", () => {
      this.resetBoardGame(this.player1, this.player2);
    });

    this.back.addEventListener("click", () => {
      window.location.reload();
    });
  }

  // Fonction qui permet de remettre la grille de jeu à 0
  resetBoardGame() {
    let cross = document.querySelectorAll("i.cross");
    let circle = document.querySelectorAll("i.circle");

    this.crossWin.style.display = "none";
    this.circleWin.style.display = "none";

    for (const iterator of cross) {
      iterator.classList.remove("dn");
      iterator.classList.add("dn");
    }

    for (const iterator of circle) {
      iterator.classList.remove("dn");
      iterator.classList.add("dn");
    }

    this.board = [];
    this.scorePlayer1 = [];
    this.scorePlayer2 = [];

    this.divPlayer1Header.classList.remove("activ");
    this.divPlayer2Header.classList.remove("activ");
    this.divPlayer1Header.style.transform = "scale(1)";
    this.divPlayer2Header.style.transform = "scale(1)";

    this.firstRound = false;

    if (this.player2.computer) {
      if (this.modal.classList.contains("open")) {
        this.modal.classList.remove("open");
        this.modalBackGround.classList.remove("open");
        this.modal.classList.add("closed");
        this.modalBackGround.classList.add("closed");
      } else {
        this.modal.classList.remove("closed");
        this.modalBackGround.classList.remove("closed");
        this.modal.classList.add("open");
        this.modalBackGround.classList.add("open");
      }
    }

    if (this.player2.computer === undefined) {
      this.divPlayer1Header.classList.add("activ");
      this.divPlayer1Header.style.transform = "scale(1.1)";
    }

    for (const i of this.container.children) {
      i.removeAttribute("style");
    }

    this.container.removeAttribute("style");
  }

  // Fonction qui permet de contrôler le score total d'un joueur basé sur un carré magique de 3 sur 3
  didPlayerWin(score) {
    for (let i = 0; i < score.length; i++) {
      for (let j = i + 1; j < score.length; j++) {
        for (let k = j + 1; k < score.length; k++) {
          if (score[i] + score[j] + score[k] === 15) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // Fonction qui permet de véridier si la grille est jouable
  canPlay(board) {
    for (let index = 0; index < 9; index++) {
      if (board[index] === undefined) {
        return true;
      }
    }
    return false;
  }

  // Fonction qui permet à l'AI de définir le meilleur coup à jouer pour gagner la partie
  findBestMove(board, player1, player2) {
    let bestScore = -Infinity;
    let move = null;

    if (board.length == 0) {
      let random;
      random = (Math.random() * 10).toFixed(0);
      board[random] = player2.name;
      this.scorePlayer2.push(this.magicBoard[random]);
      let score = this.minimax(board, false, player1, player2);

      board[random] = undefined;
      this.scorePlayer2.pop();

      if (score > bestScore) {
        bestScore = score;
        move = random;
      }
    } else {
      for (let index = 0; index < 9; index++) {
        if (board[index] === undefined) {
          board[index] = player2.name;
          this.scorePlayer2.push(this.magicBoard[index]);
          let score = this.minimax(board, false, player1, player2);

          board[index] = undefined;
          this.scorePlayer2.pop();

          if (score > bestScore) {
            bestScore = score;
            move = index;
          }
        }
      }
    }
    return move;
  }

  // Fonction qui permet à l'algorythme d'associer un score en fonction du coup joué par le joueur ou par l'ordinateur
  getWinnerScore() {
    if (this.didPlayerWin(this.scorePlayer1)) {
      return -1;
    } else if (this.didPlayerWin(this.scorePlayer2)) {
      return 1;
    } else if (this.canPlay(this.board) !== true) {
      return 0;
    }
    return null;
  }

  // Fonction qui permet de de trouver le meilleur coup à jouer pour l'ordinateur basé sur le principe mathématique minimax
  minimax(copyBoard, isMaximizing, player1, player2) {
    let winnerScore = this.getWinnerScore();
    if (winnerScore !== null) {
      return winnerScore;
    }
    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let index = 0; index < 9; index++) {
      if (copyBoard[index] === undefined) {
        copyBoard[index] = isMaximizing ? player2.name : player1.name;

        if (isMaximizing) {
          this.scorePlayer2.push(this.magicBoard[index]);
        } else {
          this.scorePlayer1.push(this.magicBoard[index]);
        }

        let score = this.minimax(copyBoard, !isMaximizing, player1, player2);

        copyBoard[index] = undefined;
        if (isMaximizing) {
          this.scorePlayer2.pop();
        } else {
          this.scorePlayer1.pop();
        }

        if (isMaximizing) {
          bestScore = Math.max(score, bestScore);
        } else {
          bestScore = Math.min(score, bestScore);
        }
      }
    }

    return bestScore;
  }

  // fonction qui permet d'afficher la modal de choix du joueur qui commence
  toggleModal = () => {
    if (this.modal.classList.contains("open")) {
      this.modal.classList.remove("open");
      this.modalBackGround.classList.remove("open");
      this.modal.classList.add("closed");
      this.modalBackGround.classList.add("closed");
    } else {
      this.modal.classList.remove("closed");
      this.modalBackGround.classList.remove("closed");
      this.modal.classList.add("open");
      this.modalBackGround.classList.add("open");
    }

    document.getElementById("activX").addEventListener("click", (e) => {
      this.player1 = new Player("X", true, true);
      this.player2 = new Computer("O", false);
      this.modal.classList.remove("open");
      this.modalBackGround.classList.remove("open");
      this.modal.classList.add("closed");
      this.modalBackGround.classList.add("closed");
      this.getHeader(this.player1, this.player2);
    });

    document.getElementById("activO").addEventListener("click", (e) => {
      this.player1 = new Player("X", false);
      this.player2 = new Computer("O", true, true, true);

      this.modal.classList.remove("open");
      this.modalBackGround.classList.remove("open");
      this.modal.classList.add("closed");
      this.modalBackGround.classList.add("closed");
      this.getHeader(this.player1, this.player2);
      let move = this.findBestMove(this.board, this.player1, this.player2);
      this.board[move] = this.player2.name;
      this.scorePlayer2.push(this.magicBoard[move]);

      document
        .querySelector(`div[data-index="${move}"]`)
        .children[1].classList.remove("dn");
      document
        .querySelector(`div[data-index="${move}"]`)
        .children[0].classList.add("dn");
      console.log(this.container);
      document.querySelector(`div[data-index="${move}"]`).style.pointerEvents =
        "none";

      if (this.canPlay(this.board) !== true) {
        this.container.style.pointerEvents = "none";
        this.divPlayer2Header.classList.remove("activ");
        this.divPlayer1Header.classList.remove("activ");
      } else if (this.didPlayerWin(this.scorePlayer2)) {
        this.container.style.pointerEvents = "none";
        this.circleWin.style.display = "flex";
        score2++;
        this.score2.textContent = score2;
      } else {
        this.divPlayer2Header.classList.remove("activ");
        this.divPlayer1Header.classList.add("activ");
        this.divPlayer1Header.style.transform = "scale(1.1)";
        this.divPlayer2Header.style.transform = "scale(1)";
        this.player2.active = false;
        this.player1.active = true;
      }
    });
  };
}

class Player {
  constructor(name, active = false, firstPlayer = null) {
    this.name = name;
    this.active = active;
    this.firstPlayer = firstPlayer;
  }
}

class Computer extends Player {
  constructor(name, active, firstPlayer = null, computer = true) {
    super(name, (active = true), (firstPlayer = true));
    this.computer = computer;
  }
}

const game = new Game();
game.getApp();
