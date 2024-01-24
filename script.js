let randomFlagImgInfo = [];
let randomNumberArray = [];
let countries;

window.onload = async function () {
  await getData();
};

//Fetch all the countries info from json.
async function getData() {
  const url = "countries.json";
  let response = await fetch(url);
  // Convert the response into a JavaScript object
  countries = await response.json();
  setUpGame();
}

function setUpGame() {
  const questionText = document.getElementById("question");
  const randomFlagImg = document.querySelectorAll(".flagimg");
  const statusText = document.getElementById("statustext");
  const nextBtn = document.getElementById("nextbtn");
  nextBtn.disabled = true;

  randomFlagImg.forEach((f) => {
    f.addEventListener("click", checkAnswer);
    f.classList.remove("incorrect");
    f.classList.remove("correct");
  });

  //create 4 unique random numbers to choose info from the countryList.
  while (randomNumberArray.length < 4) {
    var r = Math.floor(Math.random() * countries.length);
    if (randomNumberArray.indexOf(r) === -1) randomNumberArray.push(r);
  }

  //select random image and log the name.
  for (i = 0; i < 4; i++) {
    randomFlagImg[i].src = countries[randomNumberArray[i]].flag;
    randomFlagImgInfo[i] = countries[randomNumberArray[i]].name;
  }

  // Choose a random country for the question
  questionText.innerText = randomFlagImgInfo[Math.floor(Math.random() * 4)];
  statusText.innerText = "";
}

// This function runs when a flag is clicked
function checkAnswer() {
  const questionText = document.getElementById("question");
  const randomFlagImg = document.querySelectorAll(".flagimg");
  const statusText = document.getElementById("statustext");
  const pointsDivs = document.querySelectorAll(".points");

  const round = checkRound(pointsDivs);

  const correctAnswer = isCorrectAnswer(randomFlagImgInfo);

  randomFlagImg.forEach((img, index) => {
    img.classList.add(index === correctAnswer ? "correct" : "incorrect");
  });

  const userIsCorrect =
    randomFlagImgInfo[this.id].toUpperCase() === questionText.innerText;

  statusText.innerText = userIsCorrect ? "Correct!" : "Wrong!";
  statusText.style.color = userIsCorrect ? "#00ff00" : "#ff0000";
  pointsDivs[round].classList.add = userIsCorrect
    ? "badge-correct"
    : "badge-incorrect";
  randomNumberArray = [];

  newRound();
}

function isCorrectAnswer(flags) {
  const questionText = document.getElementById("question").innerText;
  return flags.findIndex((r) => r.toUpperCase() === questionText);
}

function newRound() {
  removeEventListener();
  const maxRounds = 10;
  const statusText = document.getElementById("statustext");
  const nextBtn = document.getElementById("nextbtn");
  const pointsDivs = document.querySelectorAll(".points");

  const points = [...pointsDivs].reduce(
    (acc, div) => acc + (div.classList.contains("badge-correct") ? 1 : 0),
    0
  );

  const round = checkRound(pointsDivs);

  if (round != maxRounds) {
    nextBtn.disabled = false;
    return;
  }

  statusText.innerText = `Game Over. You got ${points}/${maxRounds} correct.`;
  statusText.style.color = "#00ff00";
}

function checkRound(points) {
  const round = [...points].reduce(
    (acc, div) =>
      acc +
      (!div.classList.contains("badge-correct") &&
      !div.classList.contains("badge-incorrect")
        ? -1
        : 0),
    10
  );
  return round;
}

async function restartGame() {
  const pointsDivs = document.querySelectorAll(".points");
  randomNumberArray = [];
  pointsDivs.forEach((p) =>
    p.classList.remove("badge-incorrect", "badge-correct")
  );

  await getData();
}

function removeEventListener() {
  const randomFlagImg = document.querySelectorAll(".flagimg");
  randomFlagImg.forEach((f) => f.removeEventListener("click", checkAnswer));
}
