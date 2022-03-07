// getting all required elements
const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
const icon = searchWrapper.querySelector(".icon");
const recherche = searchWrapper.querySelector(".recherche-boutton")
const CLEFAPI = '9987b872070804777ffad9e56ac930a2';
let resultatsAPI;
let resultatsAPI1;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');
let linkTag = searchWrapper.querySelector("a");
let webLink;
const joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];


let ajd = new Date();
let options = {weekday: 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR', options);
// console.log(jourActuel, ajd);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJoursEnOrdre = joursSemaine.slice(joursSemaine.indexOf(jourActuel)).concat(joursSemaine.slice(0, joursSemaine.indexOf(jourActuel)));
// console.log(tabJoursEnOrdre);
// if user press any key and release
inputBox.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    
        emptyArray = suggestions.filter((data)=>{
            //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        });
        emptyArray = emptyArray.map((data)=>{
            // passing return data inside li tag
            return data = `<li>${data}</li>`;
        });
        searchWrapper.classList.add("active"); //show autocomplete box
        showSuggestions(emptyArray);
        let allList = suggBox.querySelectorAll("li");
        for (let i = 0; i < allList.length; i++) {
            //adding onclick attribute in all li tag
            allList[i].setAttribute("onclick", "select(this)");
        }
    }
    function showSuggestions(list){
        let listData;
        if(!list.length){
            userValue = inputBox.value;
            listData = `<li>${userValue}</li>`;
        }else{
          listData = list.join('');
        }
        suggBox.innerHTML = listData;
    }
    
function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    console.log(selectData);
    searchWrapper.classList.remove("active");
    }

function cherche(){
    webLink=encodeURI(inputBox.value);
    console.log(webLink);
    fetch (`https://api.geoapify.com/v1/geocode/search?text=${webLink}&format=json&apiKey=bfcbd32c412648c7bdba234501290cf6`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
     resultatsAPI1 = data;
        console.log(data);
    resultatsAPI=data;
    let long = resultatsAPI1.results[0].lon;
    let lat = resultatsAPI1.results[0].lat;
    console.log(long);
    console.log(lat);
    AppelAPI(long,lat);
    check();
})}
function AppelAPI(long, lat) {

    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
         console.log(data);

        resultatsAPI = data;

        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI1.query.text;


        // les heures, par tranche de trois, avec leur temperature.

        let heureActuelle = new Date().getHours();

        for(let i = 0; i < heure.length; i++) {

            let heureIncr = heureActuelle + i * 3;

            if(heureIncr > 24) {
                heure[i].innerText = `${heureIncr - 24} h`;
            } else if(heureIncr === 24) {
                heure[i].innerText = "00 h"
            } else {
                heure[i].innerText = `${heureIncr} h`;
            }

        }

        // temp pour 3h
        for(let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
        }


        // trois premieres lettres des jours 

        for(let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3);
        }


        // Temps par jour
        for(let m = 0; m < 7; m++){
            tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m + 1].temp.day)}°`
        }

        // Icone dynamique 
         if(heureActuelle >= 6 && heureActuelle < 21) {
             imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
         } else  {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg`
         }


         chargementContainer.classList.add('disparition');

    })

}
function check(){
    if (document.getElementById('semaine').checked && !document.getElementById('Heure').checked) {
        document.getElementsByClassName("jour-prevision-bloc")[0].style.display="grid";
        document.getElementsByClassName("heure-bloc-prevision")[0].style.display="none";
        document.getElementsByClassName("container")[0].style.height="600px";
        document.getElementsByClassName("container")[0].style.gridTemplate="100px 300px 100px 100px / repeat(8, 100px);";
        document.getElementsByClassName("jour-prevision-bloc")[0].style.gridArea="3 / 1 / 4 / -1;" ;



}else if(document.getElementById('Heure').checked && !document.getElementById('semaine').checked) {
        document.getElementsByClassName("jour-prevision-bloc")[0].style.display="none";
        document.getElementsByClassName("heure-bloc-prevision")[0].style.display="grid";
        document.getElementsByClassName("heure-bloc-prevision")[0].style.gridArea="3 / 1 / 4 / -1;" ;
        document.getElementsByClassName("container")[0].style.gridTemplate="100px 300px 100px  / repeat(8, 100px)";
        document.getElementsByClassName("container")[0].style.height="500px";

    }else { document.getElementsByClassName("heure-bloc-prevision")[0].style.display="grid";
            document.getElementsByClassName("jour-prevision-bloc")[0].style.display="grid";
            document.getElementsByClassName("heure-bloc-prevision")[0].style.gridArea="3 / 1 / 4 / -1;" ;
            document.getElementsByClassName("container")[0].style.gridTemplate="100px 300px 100px 100px / repeat(8, 100px)";
            document.getElementsByClassName("jour-prevision-bloc")[0].style.gridArea="4 / 1 / 5 / -1;" ;
            document.getElementsByClassName("container")[0].style.height="600px";


}
}