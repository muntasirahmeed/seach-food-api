const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keypress', function (event) {
  if (event.key == 'Enter') {
    searchButton.click();
  }
})
document.getElementById("search-button").addEventListener("click", function () {
  const input = document.getElementById("search-input");
  const inputText = input.value;
  if (!inputText) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    let error = document.getElementById("error1");
    error.innerText = "Please Enter something!";
  } else {
    const error = document.getElementById("error1");
    error.style.display = "none";
    input.value = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayFood(data.meals));
  }
});
const displayFood = (foods) => {
  if (foods == null || undefined) {
    const container = document.getElementById("container");
    container.innerHTML = "";
    let error = document.getElementById("error2");
    error.innerText = "Opps! Results not found";
  } else {
    let error = document.getElementById("error2");
    error.innerText = "";
    const container = document.getElementById("container");
    container.innerHTML = "";

    foods?.forEach((food) => {
      // console.log(food)
      const div = document.createElement("div");
      div.classList.add("col");

      div.innerHTML = `
                <div onclick="displayFoodDetail(${food.idMeal})" class="card">
                <img src="${food.strMealThumb}" class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">${food.strMeal}</h5>
                  <p class="card-text">Description: Click To see more details about food!</p>
                </div>
              </div>
        
                `;
      container.appendChild(div);
    });
  }
};
function displayFoodDetail(mealId) {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoodDetailLoad(data.meals[0]));
}
const displayFoodDetailLoad = (food) => {
  const khabar = food;
  console.log(khabar);
  const container = document.getElementById("container2");
  container.innerHTML = `
        <div class="card">
            <img src="${khabar.strMealThumb}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">${khabar.strMeal}</h5>
              <p class="card-text">Description:${khabar.strInstructions}</p>
            </div>
            <a href="${khabar.strYoutube}" class= "btn btn-secondary">See Demo</a> 
        </div>
    
    `;
};
