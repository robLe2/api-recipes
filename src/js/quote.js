import $ from 'jquery';
import QuoteTemplate from './hbs/quote.hbs';

/*
* Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
* 3- Afficher la citation
* */

export default class Quote {
    constructor () {
        this.initEls();
        this.initEvents();
    }

    initEls () {
        this.$els = {
            container: $('.js-container'),
            quote: $('.js-quote'),
        };
    }

    initEvents () {
        this.getQuote();
    }

    getQuote () {
        const api = {
            endpoint: 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
            params: {
                'per_page': 1,
            },
        };
        $.ajaxSetup({cache: false});
        $.getJSON(api.endpoint, api.params)
            .then((response) => {
                this.renderQuote(response);
            })
            .catch((err) => {
                console.log('Error Quote', err);
            });
    }

    renderQuote (quoteData) {
         const quoteContent = quoteData[0].content.rendered;
         const quoteAuthor = quoteData[0].title.rendered;

         const quote = QuoteTemplate({text: quoteContent, author: quoteAuthor});
         this.$els.quote.html(quote);
         this.$els.container.addClass('is-ready');
    }
}
