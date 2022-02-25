document.getElementById("search-button").addEventListener("click", function () {
    const input = document.getElementById("search-input");
    const inputText = input.value;
    if (inputText == '') {
        let error = document.getElementById('error')
        error.innerText="Opps! Please Enter a Valid Keyword"
    }
    else {
        const error = document.getElementById('error')
        error.style.display = 'none';
        console.log(inputText);
        input.value = "";
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) => displayFood(data.meals));
 }
});
const displayFood = (foods) => {
  const container = document.getElementById("container");
  container.innerHTML = "";

  foods.forEach((food) => {
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
