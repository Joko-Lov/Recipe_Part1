// ===============================
// RecipeJS - Part 3 (Single File)
// ===============================

const RecipeApp = (function () {
    console.log("RecipeApp initializing...");

    // ===============================
    // PRIVATE DATA
    // ===============================

    const recipes = [
        {
            id: 1,
            title: "Spaghetti Pasta",
            difficulty: "Easy",
            time: 25,
            ingredients: [
                "200g spaghetti",
                "2 tbsp olive oil",
                "2 garlic cloves",
                "1 cup tomato sauce",
                "Salt",
                "Pepper"
            ],
            steps: [
                "Boil water in a large pot",
                "Add spaghetti and cook for 8-10 minutes",
                {
                    text: "Prepare sauce",
                    substeps: [
                        "Heat olive oil",
                        "Add chopped garlic",
                        "Pour tomato sauce",
                        {
                            text: "Season properly",
                            substeps: [
                                "Add salt",
                                "Add pepper",
                                "Simmer for 5 minutes"
                            ]
                        }
                    ]
                },
                "Drain pasta",
                "Mix pasta with sauce",
                "Serve hot"
            ]
        },
        {
            id: 2,
            title: "Veg Sandwich",
            difficulty: "Easy",
            time: 10,
            ingredients: [
                "2 bread slices",
                "Butter",
                "Tomato slices",
                "Cucumber slices",
                "Salt",
                "Pepper"
            ],
            steps: [
                "Spread butter on bread",
                "Add vegetables",
                "Sprinkle salt and pepper",
                "Cover with another slice",
                "Cut and serve"
            ]
        },
        {
            id: 3,
            title: "Chicken Curry",
            difficulty: "Medium",
            time: 45,
            ingredients: [
                "500g chicken",
                "2 onions",
                "2 tomatoes",
                "Spices",
                "Oil",
                "Salt"
            ],
            steps: [
                "Heat oil in pan",
                {
                    text: "Prepare base",
                    substeps: [
                        "Saute onions",
                        "Add tomatoes",
                        "Cook until soft"
                    ]
                },
                "Add spices",
                "Add chicken pieces",
                "Cook for 25 minutes",
                "Serve hot"
            ]
        },
        {
            id: 4,
            title: "Pancakes",
            difficulty: "Easy",
            time: 20,
            ingredients: [
                "1 cup flour",
                "1 egg",
                "1 cup milk",
                "Sugar",
                "Butter"
            ],
            steps: [
                "Mix flour, egg and milk",
                "Add sugar",
                "Heat pan with butter",
                "Pour batter",
                "Flip when bubbles form",
                "Serve with syrup"
            ]
        }
    ];

    let filteredRecipes = [...recipes];

    const recipeContainer = document.getElementById("recipe-container");

    // ===============================
    // RECURSIVE STEP RENDERING
    // ===============================

    const renderSteps = (steps, level = 0) => {
        let html = "<ol>";

        steps.forEach((step) => {
            if (typeof step === "string") {
                html += `<li class="step level-${level}">${step}</li>`;
            } else {
                html += `<li class="step level-${level}">
                            ${step.text}
                            ${renderSteps(step.substeps, level + 1)}
                         </li>`;
            }
        });

        html += "</ol>";
        return html;
    };

    const createStepsHTML = (recipe) => {
        return `
            <div class="steps-container" data-recipe-id="${recipe.id}">
                ${renderSteps(recipe.steps)}
            </div>
        `;
    };

    // ===============================
    // CREATE CARD
    // ===============================

    const createRecipeCard = (recipe) => {
        return `
            <div class="recipe-card">
                <h3>${recipe.title}</h3>
                <p>Difficulty: ${recipe.difficulty}</p>
                <p>Time: ${recipe.time} mins</p>

                <button class="toggle-btn"
                        data-recipe-id="${recipe.id}"
                        data-toggle="steps">
                    Show Steps
                </button>

                <button class="toggle-btn"
                        data-recipe-id="${recipe.id}"
                        data-toggle="ingredients">
                    Show Ingredients
                </button>

                ${createStepsHTML(recipe)}

                <div class="ingredients-container"
                     data-recipe-id="${recipe.id}">
                     <ul>
                        ${recipe.ingredients
                            .map(item => `<li>${item}</li>`)
                            .join("")}
                     </ul>
                </div>
            </div>
        `;
    };

    // ===============================
    // DISPLAY RECIPES
    // ===============================

    const updateDisplay = () => {
        recipeContainer.innerHTML =
            filteredRecipes.map(createRecipeCard).join("");
    };

    // ===============================
    // TOGGLE HANDLER (Event Delegation)
    // ===============================

    const handleToggleClick = (e) => {
        const button = e.target.closest(".toggle-btn");
        if (!button) return;

        const recipeId = button.dataset.recipeId;
        const toggleType = button.dataset.toggle;

        const container = document.querySelector(
            `.${toggleType}-container[data-recipe-id="${recipeId}"]`
        );

        if (!container) return;

        container.classList.toggle("visible");

        if (container.classList.contains("visible")) {
            button.textContent = `Hide ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`;
        } else {
            button.textContent = `Show ${toggleType.charAt(0).toUpperCase() + toggleType.slice(1)}`;
        }
    };

    // ===============================
    // FILTER (Simple Example)
    // ===============================

    const filterByDifficulty = (level) => {
        filteredRecipes = recipes.filter(
            recipe => recipe.difficulty === level
        );
        updateDisplay();
    };

    // ===============================
    // EVENT LISTENERS
    // ===============================

    const setupEventListeners = () => {
        recipeContainer.addEventListener("click", handleToggleClick);
        console.log("Event listeners attached!");
    };

    // ===============================
    // INIT
    // ===============================

    const init = () => {
        updateDisplay();
        setupEventListeners();
        console.log("RecipeApp ready!");
    };

    // PUBLIC API
    return {
        init,
        updateDisplay,
        filterByDifficulty
    };

})();


// ===============================
// START APP
// ===============================
document.addEventListener("DOMContentLoaded", RecipeApp.init);
