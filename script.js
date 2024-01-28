window.onload = async function () {
  const restartBtn = document.querySelector(".btnrestart");
  const nextBtn = document.querySelector(".btnnext");
  restartBtn.addEventListener("click", restartGame);
  nextBtn.addEventListener("click", setUpRound);
  await setUpRound();
};

async function setUpRound() {
  const url = "countries.json";
  const response = await fetch(url);
  const countries = await response.json();
  const randomFlagImgInfo = [];

  const questionText = document.getElementById("question");
  const randomFlagImg = document.querySelectorAll(".flagimg");
  const statusText = document.getElementById("statustext");
  const nextBtn = document.getElementById("nextbtn");
  const randomNumberArray = [];
  nextBtn.disabled = true;

  while (randomNumberArray.length < 4) {
    var r = Math.floor(Math.random() * countries.length);
    if (randomNumberArray.indexOf(r) === -1) randomNumberArray.push(r);
  }

  for (let i = 0; i < randomFlagImg.length; i++) {
    randomFlagImg[i].src = countries[randomNumberArray[i]].flag;
    randomFlagImg[i].classList.remove("incorrect", "correct");
    randomFlagImgInfo[i] = countries[randomNumberArray[i]].name;

    const eventHandler = () => {
      checkAnswer(randomFlagImgInfo, i);
    };

    randomFlagImg[i].addEventListener("click", eventHandler);
    randomFlagImg[i].storedEventHandler = eventHandler;
  }

  questionText.innerText = randomFlagImgInfo[Math.floor(Math.random() * 4)];
  statusText.innerText = "";
}

function removeEventListeners() {
  const randomFlagImg = document.querySelectorAll(".flagimg");
  randomFlagImg.forEach((img) => {
    if (img.storedEventHandler) {
      img.removeEventListener("click", img.storedEventHandler);
    }
  });
}

function checkAnswer(flagInfo, id) {
  const questionText = document.getElementById("question").innerText;
  const randomFlagImg = document.querySelectorAll(".flagimg");
  const statusText = document.getElementById("statustext");
  const pointsDivs = document.querySelectorAll(".points");
  const round = checkRound(pointsDivs);

  const correctAnswer = flagInfo.findIndex(
    (r) => r.toUpperCase() === questionText
  );

  randomFlagImg.forEach((img, index) => {
    img.classList.add(index === correctAnswer ? "correct" : "incorrect");
  });

  const userIsCorrect = flagInfo[id].toUpperCase() === questionText;

  statusText.innerText = userIsCorrect ? "Correct!" : "Wrong!";
  statusText.style.color = userIsCorrect ? "#00ff00" : "#ff0000";
  pointsDivs[round].classList.add(
    userIsCorrect ? "badge-correct" : "badge-incorrect"
  );

  newRound();
}

function isCorrectAnswer(flags) {
  const questionText = document.getElementById("question").innerText;
  return flags.findIndex((r) => r.toUpperCase() === questionText);
}

function newRound() {
  removeEventListeners();
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
  pointsDivs.forEach((p) =>
    p.classList.remove("badge-incorrect", "badge-correct")
  );

  await setUpRound();
}
