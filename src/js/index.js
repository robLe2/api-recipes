import '../css/app.scss';
import Recipe from './recipe'

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
        // Start application
        new Recipe();
    }
}

new App();
