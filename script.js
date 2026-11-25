function connect () {

var mealTitle = document.getElementById("mealBox").value;

if (mealTitle == "") {
    document.getElementById("searchMessage").textContent = "Please enter a meal name.";
}
else {
    var url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealTitle}`;

    document.getElementById("searchMessage").textContent = "Searching meals...";
    fetch (url)
    .then (res => res.json() )
    .then (data => displaySearch (data));
}

}

function searchFromTop () {
    var mealTitle = document.getElementById("topSearchBox").value;
    document.getElementById("mealBox").value = mealTitle;
    connect();
    document.getElementById("searchSection").scrollIntoView();
}

function searchIngredient (ingredient) {

    var url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;

    document.getElementById("searchMessage").textContent = "Searching meals with " + ingredient + "...";

    fetch (url)
    .then (res => res.json() )
    .then (data => displaySearch (data));

    window.location.hash = "searchArea";
}

function displaySearch (data) {

    var oldContent = document.getElementById("searchArea");
    oldContent.textContent = "";

    if (data.meals == null) {
        document.getElementById("searchMessage").textContent = "No meals found. Please try another search.";
    }
    else {
        document.getElementById("searchMessage").textContent = "Search Results (Showing maximum 5 meals)";
        var totalMeals = data.meals.length;

        if (totalMeals > 5) {
            totalMeals = 5;
        }

        for (var i = 1; i <= totalMeals; i++) {
            var newDiv = document.createElement("div");
            newDiv.classList.add("innerStyle");

            newDiv.innerHTML = `<img src="${data.meals[i-1].strMealThumb}" alt="Meal Image">
                                <p>${data.meals[i-1].strMeal}</p>`;

            oldContent.appendChild(newDiv);
        }
    }
}

function loadHomeMeals () {

    var url = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch (url)
    .then (res => res.json() )
    .then (data => displayHomeMeal (data));

}

function displayHomeMeal (data) {

    var oldContent = document.getElementById("showArea");
    var newDiv = document.createElement("div");
    newDiv.classList.add("innerStyle");

    newDiv.innerHTML = `<img src="${data.meals[0].strMealThumb}" alt="Meal Image">
                        <p>${data.meals[0].strMeal}</p>`;

    oldContent.appendChild(newDiv);
}

for (var a = 1; a <= 8; a++) {
    loadHomeMeals();
}

document.getElementById("mealBox").addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        connect();
    }
});

document.getElementById("topSearchBox").addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        searchFromTop();
    }
});
