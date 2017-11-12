import { City } from './City';
import { config } from './config';

class Game {
    private city: City;

    constructor() {
        this.city = new City();
    }

    live(): void {
        setInterval(() => {
            if (!this.city.maxStreetsReached) {
                this.city.tick();
                this._clearConsole();
                this.city.print();
                console.log('Street count: ' + this.city.streetCount);
                console.log('Streets done: ' + this.city.maxStreetsReached);
            }
        }, 50);
    }

    instant(): void {
        while (!this.city.maxStreetsReached) {
            this.city.tick();
        }
        this.city.print();
    }

    private _clearConsole(): void {
        console.log('\x1Bc');
    }
}

const game: Game = new Game();

if (config.general.buildLive) {
    game.live();
} else {
    game.instant();
}
