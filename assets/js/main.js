"use strict";

let input = document.querySelector(".search-bar");

let submit = document.querySelector(".submit-btn");

let scoreLeft = document.querySelector(".scores-left-content");

let scoreRight = document.querySelector(".scores-right-content");

let description = document.querySelector(".summary")
   


function manageQuery(args) {

   let queries = args.toLowerCase().split(" ");

   let apiUrl = `https://api.teleport.org/api/urban_areas/slug:${queries[0]}`;

   for (let i = 1; i < queries.length; i++) {
      apiUrl += `-${queries[i]}`;
   }
   apiUrl += `/scores/`;

   console.log(apiUrl);


   getData(apiUrl);
};



async function getData(url) { 
   
   const response = await fetch(url);

   const data = await response.json();

   if (data.status === 404) {alert("City not found");};

   console.log(data);


   getObj(data);
};


function getObj(obj) {
   let dataCategories = obj.categories;
   let dataSummary = obj.summary;

   sortData(dataCategories, dataSummary);
}


function sortData(categories, summary) {
   
   scoreRight.innerHTML = "";
   scoreLeft.innerHTML = "";

   for (let i = 0; i < categories.length; i++) {

      let catName = categories[i].name;
      let catScore = categories[i].score_out_of_10.toFixed(1);
      
      let finalScore = ` ${catName}: ${catScore} <br>`;

      if (i <= 8){
         scoreLeft.innerHTML +=  finalScore ;
      }else {
          scoreRight.innerHTML +=  finalScore;
       };
   }

   let resume = summary;

   description.innerHTML = resume
   console.log(resume);
   
}







submit.addEventListener("click", () => manageQuery(input.value));