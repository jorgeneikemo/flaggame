//Global variables
let countryList=[{}];
let randomFlagImg = [];
let randomFlagImgInfo = [];
let randomNumberArray = [];

let points = 0;
let rounds = 1;
const maxRounds = 10;

let pointsDivs = [];

let questionText;
let pointsText;
let statusText;
let roundsText;
let correctAnswer;

window.onload = async function(){
    questionText = document.getElementById("question");
    randomFlagImg = document.querySelectorAll(".flagimg");
    statusText = document.getElementById("statustext");
    pointsDivs = document.querySelectorAll('.points');
    nextBtn = document.getElementById('nextbtn')

    getData();
}

//Fetch all the countries info from json.
async function getData(){
    const url = "countries.json";
    let response = await fetch(url);
    // Convert the response into a JavaScript object
    countryList = await response.json();

    setUpGame();
}
function setUpGame(){
    //disable the nextbutton
    nextBtn.disabled = true;
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

    // Choose a random country for the question
    questionText.innerText = randomFlagImgInfo[Math.floor(Math.random() * 4)];
    statusText.innerText = "";
    
    // Save the correct answer
    for(i=0;i<randomFlagImgInfo.length;i++){
        if(randomFlagImgInfo[i].toUpperCase() === questionText.innerText){
            correctAnswer = i;
            break;
        }
    }
}

// This function runs when a flag is clicked
function checkAnswer(){
     // Check if the clicked flag's country name matches the question
    if(randomFlagImgInfo[this.id].toUpperCase() === questionText.innerText){
        // Mark the flag as correct
        randomFlagImg[this.id].classList.add("correct");
        // Reset the random number array
        randomNumberArray = [];
        // Increment points and rounds
        points += 1;
        rounds += 1;
        statusText.innerText = "Correct!";
        statusText.style.color = '#00ff00';
        // Update points div
        pointsDivs[rounds-2].style.backgroundColor = '#00ff00';
        // Start a new round
        newRound();
    }
    else{
        // Mark the clicked flag as incorrect and the correct flag as correct
        randomFlagImg[this.id].classList.add("incorrect");
        randomFlagImg[correctAnswer].classList.add("correct");
        // Reset the random number array
        randomNumberArray = [];
        // Increment rounds
        rounds += 1;
        // Update status text
        statusText.innerText = "Wrong!";
        statusText.style.color = '#ff0000' ;
        // Update points div
        pointsDivs[rounds-2].style.backgroundColor = '#ff0000'; //
        //Start a new round
        newRound();
    }
}

function newRound(){
    //prevent the user from clicking again
    removeEventListener();

    if(rounds!=maxRounds + 1){
        nextBtn.disabled = false;
    }
    else{
        statusText.innerText = `Game Over. You got ${points}/${rounds-1} correct.`;
        statusText.style.color = '#00ff00';
    }
}

function restartGame(){
    //Reset the points to zero
    points = 0;

    rounds = 1;
    randomNumberArray = [];

    //Reset the points divs color
    for(let i = 0; i< pointsDivs.length; i++){
        pointsDivs[i].style.backgroundColor = 'grey';
    }
    //Restart the game
    setUpGame();
}

function removeEventListener(){
    for(i=0; i< randomFlagImg.length; i++){
        randomFlagImg[i].removeEventListener("click", checkAnswer);
    }
}
