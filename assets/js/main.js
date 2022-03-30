"use strict";

let input = document.querySelector(".search-bar");

let submit = document.querySelector(".submit-btn");

let scoreContainer = document.querySelector(".score-descr");

let scoreLeft = document.querySelector(".scores-left-content");

let scoreRight = document.querySelector(".scores-right-content");

let description = document.querySelector(".summary");

   


function manageQuery(args) {

   let queries = args.toLowerCase().split(" ");

   

   let apiUrl = `https://api.teleport.org/api/urban_areas/slug:${queries[0]}`;

   for (let i = 1; i < queries.length; i++) {

      if (queries[i] !== ""){
         apiUrl += `-${queries[i]}`;
      };
   }
   apiUrl += `/scores/`;

   console.log(apiUrl);


   getData(apiUrl);
};



async function getData(url) { 
   
   const response = await fetch(url);

   const data = await response.json();

   console.log(data);


   getObj(data);
};


function getObj(obj) {
   
   let dataCategories = obj.categories;
   let dataSummary = obj.summary;
   let dataStatus = obj.status;

   showData(dataCategories, dataSummary, dataStatus);
}


function showData(categories, summary, status) {
   
   if(status === 404) {

      scoreContainer.style.display = "none";
      alert("City not found");

   }else {
      scoreContainer.style.display= "flex";
   }

   description.innerHTML =  "";
   scoreRight.innerHTML = "";
   scoreLeft.innerHTML = "";

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

   let resume = summary;

   description.innerHTML = resume;
   console.log(resume);
   
}







submit.addEventListener("click", () => manageQuery(input.value));