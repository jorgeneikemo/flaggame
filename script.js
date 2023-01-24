let countryList=[{}];
let questionText;
let randomFlagImg = [];
let randomFlagImgInfo = [];
let randomNumberArray = [];
let points = 0;
let pointsText;

window.onload = async function(){
    questionText = document.getElementById("question");
    pointsText =  document.getElementById("points");
    randomFlagImg = document.querySelectorAll(".flagimg");
    for(i=0; i< randomFlagImg.length; i++){
        randomFlagImg[i].addEventListener("click", checkAnswer);
    }

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
    //create 4 unique random numbers to choose info from the countryList.
    while(randomNumberArray.length < 4){
        var r = Math.floor(Math.random() * countryList.length);
        if(randomNumberArray.indexOf(r) === -1) randomNumberArray.push(r);
    }
    

    for(i=0; i<4; i++){
        randomFlagImg[i].src = countryList[randomNumberArray[i]].flag;
        randomFlagImgInfo[i] = countryList[randomNumberArray[i]].name;
        console.log(randomNumberArray[i]);
        console.log(randomFlagImgInfo[i]);
    }

    questionText.innerText = randomFlagImgInfo[Math.floor(Math.random() * 4)];
    pointsText.innerText = "Points: " + points.toString();

}

function checkAnswer(){
    if(randomFlagImgInfo[this.id] === questionText.innerText){
        alert("Correct!");
        randomNumberArray = [];
        points += 1;
        setUpGame();
    }
    else{
        alert("Wrong!");
        randomNumberArray = [];
        setUpGame();
    }
}
