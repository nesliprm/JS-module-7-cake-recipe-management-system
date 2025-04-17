"use strict";

const cakeRecipes = require("./cake-recipes.json");
const prompt = require("prompt-sync")();

const getUniqueAuthors = (recipes) => {
  const uniqueAuthors = [];

  cakeRecipes.forEach((recipe) => {
    const author = recipe.Author;
    if (!uniqueAuthors.includes(author)) {
      uniqueAuthors.push(author);
    }
  });

  return uniqueAuthors.join("\n");

  // FOR NUMBERED LIST
  // const numberedList = uniqueAuthors
  //   .map((author, index) => `${index + 1}. ${author}`)
  //   .join("\n");

  // return numberedList;
};

// console.log(getUniqueAuthors(recipes));

const recipeNames = (recipes) => {
  if (!recipes.length) {
    console.log("There are no recipes found.");
  } else {
    recipes.forEach(({ Name }) => {
      console.log(Name);
    });
  }
};

// console.log(recipeNames(cakeRecipes));

const getRecipesByAuthor = (recipes, author) => {
  const recipesByAuthor = recipes.filter((recipe) => {
    return recipe.Author === author;
  });

  if (recipesByAuthor.length === 0) {
    console.log(`There are no recipes found by ${author}.`);
  } else {
    console.log(`ALL RECIPES by ${author}:\n--------------------------------`);

    return recipesByAuthor;
  }
};

// recipeNames(getRecipesByAuthor(cakeRecipes, "Gordon Ramsey Nilsen"));

const getRecipeByIngredient = (recipes, ingredient) => {
  const recipesListByIngredient = recipes.filter((recipe) =>
    recipe.Ingredients.some((ing) => ing.includes(ingredient))
  );
  return recipesListByIngredient;
};

// recipeNames(getRecipeByIngredient(cakeRecipes, "140g caster sugar"));

const getRecipeByName = (recipes, name) =>
  recipes.find((recipe) => recipe.Name.includes(name));

// console.log(getRecipeByName(cakeRecipes, "carrot"));

const getIngredients = (recipes) => {
  return recipes.reduce((ingredients, recipe) => {
    return [...ingredients, ...recipe.Ingredients];
  }, []);
};

// console.log(getIngredients(getRecipesByAuthor(cakeRecipes, "Angela Nilsen")));

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

do {
  choice = displayMenu();

  switch (choice) {
    case 1:
      console.log(getUniqueAuthors(cakeRecipes).join("\n"));
      break;
    case 2:
      const authorInput = prompt("Enter an author name: ");
      recipeNames(getRecipesByAuthor(cakeRecipes, authorInput));
      break;
    case 3:
      const ingredientInput = prompt("Enter an ingredient: ");
      recipeNames(getRecipeByIngredient(cakeRecipes, ingredientInput));
      break;
    case 4:
      const recipeNameInput = prompt("Enter the name of a recipe: ");
      console.log([getRecipeByName(cakeRecipes, recipeNameInput)]);
      // if (recipe) {
      //   recipeNames([recipe]);
      // } else {
      //   console.log("No recipe found with that name.");
      // }
      break;
    case 5:
      break;
    case 0:
      console.log("Exiting...");
      break;
    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
