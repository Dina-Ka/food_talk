// Global Variable
var sidebarElements = [];
var sidebarElement = "";
var foodAjaxObject;
var foodDisplay = "";

sidebarElements = [
  "carrot",
  "broccoli",
  "asparagus",
  "cauliflower",
  "corn",
  "cucumber",
  "green pepper",
  "lettuce",
  "mushrooms",
  "onion",
  "potato",
  "pumpkin",
  "red pepper",
  "tomato",
  "beetroot",
  "brussel sprouts",
  "peas",
  "zucchini",
  "radish",
  "sweet potato",
  "artichoke",
  "leek",
  "cabbage",
  "celery",
  "chili",
  "garlic",
  "basil",
  "coriander",
];

window.onload = function () {
  sidebarElements.forEach((element) => {
    sidebarElement += `
        <div onclick=getData("${element}") class="nav_link"> <i class='bx bx-bookmark  nav_icon'></i> <span
        class="nav_name">${element}</span> </div>`;
  });
  document.getElementById("sidebarlist").innerHTML = sidebarElement;
};

function getData(food) {
  console.log(food);
  foodAjaxObject = new XMLHttpRequest();
  foodAjaxObject.open(
    "GET",
    `https://forkify-api.herokuapp.com/api/search?q=${food}`
  );
  foodAjaxObject.send();
  // console.log(foodAjaxObject.readyState)
  foodAjaxObject.addEventListener("readystatechange", function () {
    console.log(foodAjaxObject.readyState);
    if (foodAjaxObject.readyState == 4) {
      displayElement(JSON.parse(foodAjaxObject.response));
    }
  });
}

function displayElement(foodjson) {
  foodDisplay = "";
  console.log(foodjson.recipes);
  foodjson.recipes.forEach((element) => {
    foodDisplay += `
    <div class="col-lg-4 col-md-4 col-sm-12  px-4 py-2">
        <div class="food-element h-100 rounded-3 bg-light shadow-lg">
            <div class="image-section h-50">
                <img src="${element.image_url}" class="w-100 h-100 ">
            </div>
            <div class="title-desc p-2 h-50">
            <div class="h-50">
                <h2 class="section-title fs-2">${element.title}</h2>
            </div>
            <div class="h-25">
                <p class="author-article">${element.publisher}</p>
            </div>
            <div class="h-25">
                 <a href="${element.source_url}" class="orange-color" target="_blank">Read More > </a>
               </div>
            </div>
        </div>
    </div>
    `;
  });
  document.getElementById("selected-food-items").innerHTML = foodDisplay;
}
