"use strict";

// Part 1

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

const getUniqueAuthors = (recipes) => {
  const uniqueAuthors = [];

  recipes.forEach((recipe) => {
    const author = recipe.Author;
    if (!uniqueAuthors.includes(author)) {
      uniqueAuthors.push(author);
    }
  });

  return uniqueAuthors;
};

const recipeNames = (recipes) => {
  if (!recipes.length) {
    console.log("There are no recipes found.");
  } else {
    recipes.forEach(({ Name }) => {
      console.log(Name);
    });
  }
};

const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter((recipe) => {
    return recipe.Author === author;
  });
};

const getRecipeByIngredient = (recipes, ingredient) => {
  const recipesListByIngredient = recipes.filter((recipe) =>
    recipe.Ingredients.some((ing) =>
      ing.toLowerCase().includes(ingredient.toLowerCase())
    )
  );
  return recipesListByIngredient;
};

const getRecipeByName = (recipes, name) =>
  recipes.find((recipe) => recipe.Name.includes(name));

const getIngredients = (recipes) => {
  return recipes.reduce((ingredients, recipe) => {
    return [...ingredients, ...recipe.Ingredients];
  }, []);
};

// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};

let choice;
let savedIngredients = [];

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      getUniqueAuthors(cakeRecipes).forEach((author) =>
        console.log(`- ${author}`)
      );
      break;

    case 2:
      const authorInput = prompt("Enter an author name: ");
      if (authorInput) {
        const recipes = getRecipesByAuthor(cakeRecipes, authorInput);
        if (recipes.length === 0) {
          console.log(`There are no recipes found by ${authorInput}.`);
        } else {
          console.log(
            `ALL RECIPES by ${authorInput}:\n--------------------------------`
          );
          recipeNames(recipes);
        }
      } else {
        console.log("Please enter a name.");
      }
      break;

    case 3:
      const ingredientInput = prompt("Enter an ingredient: ");
      console.log(`Recipes that include ${ingredientInput}:`);
      recipeNames(getRecipeByIngredient(cakeRecipes, ingredientInput));
      break;
    case 4:
      const recipeNameInput = prompt("Enter the name of a recipe: ");
      const foundRecipe = getRecipeByName(cakeRecipes, recipeNameInput);
      if (foundRecipe) {
        console.log(foundRecipe);
        const saveRecipeIngredients = prompt(
          "Would you like to save the ingredients of this recipe? Y/N"
        );
        if (saveRecipeIngredients.toLowerCase() === "y") {
          savedIngredients.push(...foundRecipe.Ingredients);
          console.log("Ingredients saved.");
        } else {
          console.log("Ingredients not saved.");
        }
      } else {
        console.log("No recipe found with that name.");
      }

      break;
    case 5:
      if (savedIngredients.length === 0) {
        console.log("No saved ingredients found.");
      } else {
        console.log("Ingredients from all the saved recipes: ");
        savedIngredients.forEach((ingredient, index) =>
          console.log(`${index + 1}. ${ingredient}`)
        );
      }

      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
