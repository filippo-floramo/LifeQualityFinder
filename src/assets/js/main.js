"use strict";


/*Setting up DOM variables*/ 

let input = document.querySelector(".search-bar");

let submit = document.querySelector(".submit-btn");

let scoreContainer = document.querySelector(".score-descr");

let cityScore = document.querySelector(".teleport-score");

let scoreLeft = document.querySelector(".scores-left-content");

let scoreRight = document.querySelector(".scores-right-content");

let description = document.querySelector(".summary");

   
/*Creating functions to manage input from user and retrieve data*/

function manageQuery(args) {

   let queries = args.toLowerCase().split(" ");

   let queriesFiltered = queries.filter((value) => value !== "");
   
   let apiUrl = `https://api.teleport.org/api/urban_areas/slug:${queriesFiltered[0]}`;

   for (let i = 1; i < queriesFiltered.length; i++) {
      apiUrl += `-${queriesFiltered[i]}`;
   }
   apiUrl += `/scores/`;

   getData(apiUrl).catch(error => console.error(error));
};



async function getData(url) { 
   
   const response = await fetch(url);

   const data = await response.json();

   getObj(data);
};


function getObj(obj) {
   
   let dataCategories = obj.categories;
   let dataSummary = obj.summary;
   let dataCityScore = obj.teleport_city_score;
   let dataStatus = obj.status;

   showData(dataCategories, dataSummary, dataCityScore, dataStatus);
}


function showData(categories, summary, score, status) {
   
   if(status === 404) {

      scoreContainer.style.display = "none";
      alert("City not found. Try again!");

   }else {
      scoreContainer.style.display= "flex";
   }

   description.innerHTML = "";
   scoreRight.innerHTML = "";
   scoreLeft.innerHTML = "";
   cityScore.innerHTML = "";


   cityScore.innerHTML = score.toFixed(1);

   for (let i = 0; i < categories.length; i++) {

      let catName = categories[i].name;
      let catScore = categories[i].score_out_of_10.toFixed(1);
      
      let finalScore = `${catName}: <span style="color:#E74C3C;">${catScore}</span> <br>`;

      if (i <= 8){
         scoreLeft.innerHTML +=  finalScore;
      }else {
         scoreRight.innerHTML +=  finalScore;
       };
   }

   description.innerHTML = summary;
}


/*Calling the functions on click*/

submit.addEventListener("click", () => manageQuery(input.value));