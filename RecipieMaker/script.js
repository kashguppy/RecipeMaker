const recipes = []; // Recipes will load dynamically

// Fetch Recipes from JSON
async function loadRecipes() {
  const response = await fetch('recipes.json');
  const data = await response.json();
  recipes.push(...data);
  displayRecipes(recipes);
}

// Display Recipes on the Page
function displayRecipes(recipesArray) {
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = '';
  recipesArray.forEach((recipe, index) => {
    const card = document.createElement('div');
    card.classList.add('recipe-card');
    card.innerHTML = `
      <h2>${recipe.name}</h2>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
      <p><strong>Rating:</strong> ${recipe.rating} ⭐</p>
      <button onclick="viewRecipe(${index})">View Details</button>
    `;
    recipeList.appendChild(card);
  });
}

// Search Recipes
document.getElementById('search-bar').addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  const filtered = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(query) ||
    recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(query))
  );
  displayRecipes(filtered);
});

// View Recipe Details
function viewRecipe(index) {
  alert(
    `${recipes[index].name}\n\nIngredients: ${recipes[index].ingredients.join(', ')}\n\nInstructions: ${recipes[index].instructions}`
  );
}

// Add a New Recipe
document.getElementById('add-recipe-btn').addEventListener('click', () => {
  const name = document.getElementById('recipe-name').value;
  const ingredients = document.getElementById('recipe-ingredients').value.split(',');
  const instructions = document.getElementById('recipe-instructions').value;
  const rating = parseFloat(document.getElementById('recipe-rating').value);

  if (name && ingredients.length && instructions && rating) {
    recipes.push({ name, ingredients, instructions, rating });
    displayRecipes(recipes);
    alert('Recipe added successfully!');
    closeModal('add-recipe-modal');
  } else {
    alert('Please fill out all fields.');
  }
});

// Open/Close Modals
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

document.getElementById('add-recipe-open').addEventListener('click', () => {
  openModal('add-recipe-modal');
});

// Load Recipes on Page Load
loadRecipes();





// Game logic
let timeLeft = 30;
let timer;
let requiredIngredients = ["Carrot", "Potato", "Onion"];
let addedIngredients = [];

function startGame() {
    // Reset everything
    timeLeft = 30;
    addedIngredients = [];
    document.getElementById("timeRemaining").textContent = timeLeft;
    document.getElementById("pot").innerHTML = "";
    document.getElementById("instructions").textContent = "Drag ingredients into the pot!";

    // Display ingredients
    const ingredients = ["Carrot", "Potato", "Onion", "Tomato", "Pepper", "Broccoli"];
    const container = document.getElementById("ingredientsContainer");
    container.innerHTML = "";
    ingredients.forEach((ing) => {
        const item = document.createElement("div");
        item.className = "ingredient";
        item.textContent = ing;
        item.draggable = true;
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", ing);
        });
        container.appendChild(item);
    });

    // Start timer
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeRemaining").textContent = timeLeft;
        if (timeLeft <= 0) {
            endGame(false);
        }
    }, 1000);

    // Show the pot as a drop zone
    const pot = document.getElementById("pot");
    pot.addEventListener("dragover", (e) => e.preventDefault());
    pot.addEventListener("drop", (e) => {
        e.preventDefault();
        const ingredient = e.dataTransfer.getData("text/plain");
        if (requiredIngredients.includes(ingredient)) {
            addedIngredients.push(ingredient);
            pot.innerHTML += `<p>${ingredient}</p>`;
            if (addedIngredients.length === requiredIngredients.length) {
                endGame(true);
            }
        } else {
            alert("Wrong ingredient!");
        }
    });

    // Toggle buttons
    document.getElementById("startGameButton").classList.add("hidden");
    document.getElementById("resetGameButton").classList.remove("hidden");
}

function endGame(success) {
    clearInterval(timer);
    if (success) {
        document.getElementById("instructions").textContent = "You completed the recipe! Well done!";
    } else {
        document.getElementById("instructions").textContent = "Time's up! Try again!";
    }
    document.getElementById("resetGameButton").classList.remove("hidden");
}

document.getElementById("startGameButton").addEventListener("click", startGame);
document.getElementById("resetGameButton").addEventListener("click", () => {
    document.getElementById("startGameButton").classList.remove("hidden");
    document.getElementById("resetGameButton").classList.add("hidden");
    document.getElementById("pot").innerHTML = "";
    document.getElementById("ingredientsContainer").innerHTML = "";
});




