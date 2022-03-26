let input = document.querySelector(".search-bar");

let submit = document.querySelector(".submit-btn");

let score = document.querySelector(".scores-right");


   


function manageQuery(args) {

   let queries = args.toLowerCase().split(" ");

   let apiUrl = `https://api.teleport.org/api/urban_areas/slug:${queries[0]}`;

   for (i = 1; i < queries.length; i++) {
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
   let sortedData = obj.categories;

   sortData(sortedData);
}

function sortData(sortedObj) {

   for (i = 0; i < sortedObj.length; i++) {


      let catName = sortedObj[i].name;
      let catScore = sortedObj[i].score_out_of_10;

      score.textContent += ` ${catName}: ${catScore} `;

   }


}







submit.addEventListener("click", () => manageQuery(input.value));