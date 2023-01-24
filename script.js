let jsontext;
let loopDone=false;
let countryList=[{}];
let countryListFiltered = [{}];
let myJSON;
let randomFlagImg;
window.onload = async function(){
    jsontext = document.getElementById("jsontext");
    randomFlagImg = document.getElementById("randomflag");
    getData();

}

async function getData(){
    const url = "https://restcountries.com/v3.1/all";
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    
    for(i=0;i<250;i++){
        let name = data[i]["name"]["common"];
        let flag = data[i]["flags"]["svg"];
        let independent = data[i]["independent"];
        let capital = data[i]["capital"]?.[0];
        countryList[i] = {"name": name, "flag": flag, "independent": independent, "capital": capital};
        if(i==249){
            loopDone = true;
            console.log("loopdone")
            filterArray();
        }
    }
}

//Remove all nations that are not independent;
function filterArray(){
    countryListFiltered = countryList.filter(function(obj){
        return obj.independent != false;
    });

    //myJSON = JSON.stringify(countryListFiltered);
    let randomNum = Math.floor(Math.random() * countryListFiltered.length);
    randomFlagImg.src = countryListFiltered[randomNum].flag;
    console.log(countryListFiltered[randomNum].name);
    //console.log(Math.floor(Math.random() * countryListFiltered.length));
    //jsontext.innerText = myJSON;
}