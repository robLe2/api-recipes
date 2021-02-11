import '../css/app.scss';
import Background from './background';
import Greeting from './greeting';
import Quote from './quote';

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
        // Start application
        new Background();
        new Greeting();
        new Quote();
    }
}

new App();
