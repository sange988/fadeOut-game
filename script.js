const game = () => {
  let pScore = 0;
  let cScore = 0;

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    const modal = document.querySelector(".modal");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.remove("fadeOut"); 
      match.classList.add("fadeIn");
      modal.style.display = "block";
    });

    document.getElementById("close-modal").addEventListener("click", () => {
      modal.style.display = "none";
    });
  };

  const showWinReminder = () => {
    console.log('赢家提醒函数被调用'); // 调试信息
    const reminder = document.createElement('div');
    reminder.innerText = 'You win!';
    reminder.classList.add('win-reminder');
    document.body.appendChild(reminder);
    setTimeout(() => {
      reminder.remove();
    }, 3000);
  };
  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });
    //Computer Options
    const computerOptions = ["石头", "布", "剪刀"];

    options.forEach(option => {
      option.addEventListener("click", function() {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          //Here is where we call compare hands
          compareHands(this.textContent, computerChoice);
          //Update Images
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;
        }, 2000);
        //Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const updateScore = () => {
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };

  const compareHands = (playerChoice, computerChoice) => {
    //Update Text
    const winner = document.querySelector(".winner");
    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "平局";
      return;
    }
    //Check for Rock
    if (playerChoice === "石头") {
      if (computerChoice === "剪刀") {
        winner.textContent = "玩家赢";
        pScore++;
        updateScore();
        showWinReminder();
        return;
      } else {
        winner.textContent = "电脑赢";
        cScore++;
        updateScore();
        return;
      }
    }
    //Check for Paper
    if (playerChoice === "布") {
      if (computerChoice === "剪刀") {
        winner.textContent = "电脑赢";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "玩家赢";
        pScore++;
        updateScore();
        showWinReminder(); 
        return;
      }
    }
    //Check for Scissors
    if (playerChoice === "剪刀") {
      if (computerChoice === "石头") {
        winner.textContent = "电脑赢";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "玩家赢";
        pScore++;
        updateScore();
        showWinReminder(); 
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();