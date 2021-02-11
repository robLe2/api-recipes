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
            recipe: $('.js-recipe'),
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
        console.log(recipeData); //Affiche la data correspondant au endpoint
        const recipeCount = recipeData.to;
        console.log(recipeCount);
        const recipeRand = Math.floor(Math.random() * recipeCount)

        const recipeTitle = recipeData.hits[recipeRand].recipe.label;
        const recipeImage = recipeData.hits[recipeRand].recipe.image;

        const recipe = RecipeTemplate({title: recipeTitle, image: recipeImage});
        this.$els.recipe.html(recipe);
        this.$els.container.addClass('is-ready');
    }
}