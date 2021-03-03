import $ from 'jquery';
import RecipeTemplate from './hbs/recipe.hbs'

export default class Recipe {
    constructor () {
        this.initEls();
        this.initEvents();
    }

    initEls() {
        this.$els = {
            container: $('.js-container'),
            recipe: $('.right-part'),
        }
    }

    initEvents () {
        this.getRecipe();
    }

    getRecipe () {
        const api = {
            endpoint: "https://api.edamam.com/search?q=chicken&app_id=04d4343d&app_key=295d476b41b04b07f017dab57f8a7fc4"
        };
        $.getJSON(api.endpoint)
            .then((response) => {
                this.renderRecipe(response);
            })
            .catch((err) => {
                console.log('Error Recipe', err);
            });

    }

    renderRecipe (recipeData) {
        //console.log(recipeData); //Affiche la data correspondant au endpoint
        const recipeCount = recipeData.to;
        const recipeRand = Math.floor(Math.random() * recipeCount);
        console.log(recipeRand);

        const recipeTitle = recipeData.hits[recipeRand].recipe.label;
        const recipeImage = recipeData.hits[recipeRand].recipe.image;
        const recipeUrl = recipeData.hits[recipeRand].recipe.url;
        const recipeSource = recipeData.hits[recipeRand].recipe.source;
        const recipeYield = recipeData.hits[recipeRand].recipe.yield;
        const recipeCalories = recipeData.hits[recipeRand].recipe.calories;
        const recipeIngredients = recipeData.hits[recipeRand].recipe.ingredientLines;

        console.log(
            'Titre : '+recipeTitle+' Url : '+recipeUrl+
            ' Source : '+recipeSource+' Nb personnes : '+recipeYield+' Cal : '+recipeCalories+
            ' Ingrédients : '+recipeIngredients[1]
        );

        const recipe = RecipeTemplate({
            title: recipeTitle,
            image: recipeImage,
            url: recipeUrl,
            source: recipeSource,
            number: recipeYield,
            calories: recipeCalories,
            ingredients: recipeIngredients
        });
        this.$els.recipe.append(recipe);
        this.$els.container.addClass('is-ready');
    }
}