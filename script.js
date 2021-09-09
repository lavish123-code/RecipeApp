const searchForm = document.querySelector('form');
const result = document.querySelector('.content');
const container = document.querySelector('.container');
let searchQuery="";
const APP_ID = '9c66d39a';
const APP_KEY = '24f090316c7001afccfe255fabd1c246';
const section = document.querySelector('section');
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    // console.log(searchQuery);
    section.style.background = "rgb(41,42,46)";
    fetchAPI();
});
async function fetchAPI() {
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    const response = await fetch(baseUrl);
    const data = await response.json();
    generateHtml(data.hits);
    // console.log(data);
}
function generateHtml(results){
    let generatedHtml = "";
    results.map(result=>{
        generatedHtml += 
        `
        <div class="item">
                <img src="${result.recipe.image}" alt="Image Not Available">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a href="${result.recipe.url}" target="_blank" class="btn">View Receipe</a>
                </div>
                <p class="item_details">Calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item_details">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : " No Data Found" }</p>
                <p class="item_details">Health Label: <br />${result.recipe.healthLabels}</p>
            </div>
        `
    })
    result.innerHTML = generatedHtml;
}