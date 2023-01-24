let countryList=[{}];
let randomFlagImg = [];
let randomFlagImgInfo = [];
let randomNumberArray = [];

let points = 0;
let rounds = 1;
const maxRounds = 10;

let questionText;
let pointsText;
let statusText;
let roundsText;

window.onload = async function(){
    questionText = document.getElementById("question");
    pointsText =  document.getElementById("points");
    randomFlagImg = document.querySelectorAll(".flagimg");
    statusText = document.getElementById("statustext");
    roundsText = document.getElementById("rounds");

    getData();

}

//Fetch all the countries info from json.
async function getData(){
    const url = "countries.json";
    let response = await fetch(url);
    countryList = await response.json();

    //console.log(countryList);
    setUpGame();
}
function setUpGame(){
    //make the flags clickable
    for(i=0; i< randomFlagImg.length; i++){
        randomFlagImg[i].addEventListener("click", checkAnswer);
        randomFlagImg[i].classList.remove("incorrect");
        randomFlagImg[i].classList.remove("correct");
    }

    //create 4 unique random numbers to choose info from the countryList.
    while(randomNumberArray.length < 4){
        var r = Math.floor(Math.random() * countryList.length);
        if(randomNumberArray.indexOf(r) === -1) randomNumberArray.push(r);
    }
    
    //select random image and log the name.
    for(i=0; i<4; i++){
        randomFlagImg[i].src = countryList[randomNumberArray[i]].flag;
        randomFlagImgInfo[i] = countryList[randomNumberArray[i]].name;
    }

    questionText.innerText = randomFlagImgInfo[Math.floor(Math.random() * 4)];
    statusText.innerText = "";
    roundsText.innerText = "Round " + rounds + "/" + maxRounds;
    

}

function checkAnswer(){
    if(randomFlagImgInfo[this.id].toUpperCase() === questionText.innerText){
        //alert("Correct!");
        randomFlagImg[this.id].classList.add("correct");
        randomNumberArray = [];

        //change the points and count down round
        points += 1;
        rounds += 1;

        pointsText.innerText = "Points: " + points.toString();
        statusText.innerText = "Correct!";
        statusText.style.color = "green";

        newRound();
    }
    else{
        //clear the random number array.
        randomFlagImg[this.id].classList.add("incorrect");
        randomNumberArray = [];

        rounds += 1;

        statusText.innerText = "Wrong!";
        statusText.style.color = "red";

        newRound();
    }
}

function newRound(){
    //prevent the user from clicking again
    removeEventListener();

    if(rounds!=maxRounds){
    //restart the game after timeout
    setTimeout(setUpGame,2000);
    }
    else{
        roundsText.innerText = "Game over!";
    }
}

function removeEventListener(){
    for(i=0; i< randomFlagImg.length; i++){
        randomFlagImg[i].removeEventListener("click", checkAnswer);
    }
}
