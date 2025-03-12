// DOM
const rulesBtn = document.querySelector(".rules-btn");

const closeBtn = document.querySelector(".close-btn");

const modalRules = document.querySelector(".modal");

const CHOICES = [
	{
		name: "paper",
		beats: "rock",
	},

	{
		name: "scissors",
		beats: "paper",
	},

	{
		name: "rock",
		beats: "scissors",
	},
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultDiv = document.querySelector(".result");
const finalResult = document.querySelectorAll(".final-result");

const resultWinner = document.querySelector(".results-winner");
const resultText = document.querySelector(".result-text");

const playAgainBtn = document.querySelector(".play-again");

const playerScore = document.querySelector(".player-score");
const aiScore = document.querySelector(".ai-score");

let score = 0;
let playerScoreValue = 0;
let aiScoreValue = 0;

// GAME LOGIC
choiceButtons.forEach((button) => {
	button.addEventListener("click", () => {
		const choiceName = button.dataset.choice; //recording choice
		const choice = CHOICES.find((choice) => choice.name === choiceName);
		choose(choice);
	});
});

function choose(choice) {
	const aiChoice = aiChoose();
	displayResults([choice, aiChoice]);
	displayWinner([choice, aiChoice]);
}

function aiChoose() {
	const rand = Math.floor(Math.random() * CHOICES.length);
	return CHOICES[rand];
}

function displayResults(results) {
	finalResult.forEach((resultDiv, idx) => {
		setTimeout(() => {
			resultDiv.innerHTML = `<div class="choice ${results[idx].name}">
			<img src="images/${results[idx].name}.png"/>
			</div>`;
		}, idx * 1000);
	});

	gameDiv.classList.toggle("hidden");
	resultDiv.classList.toggle("hidden");
}

function displayWinner(results) {
	setTimeout(() => {
		const userWins = isWinner(results);
		const aiWins = isWinner(results.reverse());

		if (userWins) {
			resultText.innerText = "You Win";
			finalResult[0].classList.toggle("winner");

			keepScore(1, true);
		} else if (aiWins) {
			resultText.innerText = "Computer Wins";
			finalResult[1].classList.toggle("winner");

			keepScore(1, false);
		} else {
			resultText.innerText = "Draw";
		}
		resultWinner.classList.toggle("hidden");
		resultDiv.classList.toggle("show-winner");
	}, 1000);
}

function isWinner(results) {
	return results[0].beats === results[1].name;
}

function keepScore(point, isPlayer) {
	if (isPlayer) {
		playerScoreValue += point;
		playerScore.innerText = playerScoreValue;
	}else {
		aiScoreValue += point;
		aiScore.innerText = aiScoreValue;
	}
}

// Show/Hide Rules

playAgainBtn.addEventListener("click", () => {
	gameDiv.classList.toggle("hidden");
	resultDiv.classList.toggle("hidden");
	finalResult.forEach((resultDiv) => {
		resultDiv.innerHTML = "";
		resultDiv.classList.remove("winner");
	});

	resultText.innerText = "";
	resultWinner.classList.toggle("hidden");
	resultDiv.classList.toggle("show-winner");
});

rulesBtn.addEventListener("click", () => {
	modalRules.classList.toggle("show-modal");
});

closeBtn.addEventListener("click", () => {
	modalRules.classList.toggle("show-modal");
});
