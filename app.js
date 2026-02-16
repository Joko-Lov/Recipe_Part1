// -----------------------------
// Recipe Data
// -----------------------------

const recipes = [
    { id: 1, title: "Pasta Alfredo", difficulty: "easy", time: 20 },
    { id: 2, title: "Chicken Curry", difficulty: "medium", time: 45 },
    { id: 3, title: "Beef Wellington", difficulty: "hard", time: 90 },
    { id: 4, title: "Grilled Cheese", difficulty: "easy", time: 10 },
    { id: 5, title: "Caesar Salad", difficulty: "easy", time: 15 },
    { id: 6, title: "Biryani", difficulty: "hard", time: 60 },
    { id: 7, title: "Fried Rice", difficulty: "medium", time: 25 },
    { id: 8, title: "Omelette", difficulty: "easy", time: 8 }
];

// -----------------------------
// State
// -----------------------------

let currentFilter = "all";
let currentSort = "none";

// -----------------------------
// DOM References
// -----------------------------

const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll("[data-filter]");
const sortButtons = document.querySelectorAll("[data-sort]");

// -----------------------------
// Pure Filter Functions
// -----------------------------

const filterByDifficulty = (recipes, difficulty) => {
    return recipes.filter(recipe => recipe.difficulty === difficulty);
};

const filterByTime = (recipes, maxTime) => {
    return recipes.filter(recipe => recipe.time < maxTime);
};

const applyFilter = (recipes, filterType) => {
    switch (filterType) {
        case "easy":
        case "medium":
        case "hard":
            return filterByDifficulty(recipes, filterType);
        case "quick":
            return filterByTime(recipes, 30);
        default:
            return recipes;
    }
};

// -----------------------------
// Pure Sort Functions
// -----------------------------

const sortByName = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.title.localeCompare(b.title)
    );
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) =>
        a.time - b.time
    );
};

const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes;
    }
};

// -----------------------------
// Render Function
// -----------------------------

const renderRecipes = (recipesToRender) => {
    recipeContainer.innerHTML = "";

    recipesToRender.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                Difficulty: ${recipe.difficulty}<br>
                Time: ${recipe.time} mins
            </div>
        `;

        recipeContainer.appendChild(card);
    });
};

// -----------------------------
// Update Display
// -----------------------------

const updateDisplay = () => {
    let recipesToDisplay = recipes;

    recipesToDisplay = applyFilter(recipesToDisplay, currentFilter);
    recipesToDisplay = applySort(recipesToDisplay, currentSort);

    renderRecipes(recipesToDisplay);

    console.log(
        `Displaying ${recipesToDisplay.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`
    );
};

// -----------------------------
// Update Active Buttons
// -----------------------------

const updateActiveButtons = () => {

    filterButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add("active");
        }
    });

    sortButtons.forEach(btn => {
        btn.classList.remove("active");
        if (btn.dataset.sort === currentSort) {
            btn.classList.add("active");
        }
    });
};

// -----------------------------
// Event Listeners
// -----------------------------

const setupEventListeners = () => {

    filterButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            currentFilter = event.target.dataset.filter;
            updateActiveButtons();
            updateDisplay();
        });
    });

    sortButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            currentSort = event.target.dataset.sort;
            updateActiveButtons();
            updateDisplay();
        });
    });
};

// -----------------------------
// Initialization
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    updateDisplay();
});
