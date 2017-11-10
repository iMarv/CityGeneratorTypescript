import { Observable } from 'rxjs/Rx';
import { City } from './City';

class Game {
    private city: City;

    constructor() {
        this.city = new City();
    }

    run(): void {
        Observable.timer(0, 100).subscribe(() => {
            this.city.tick();
            this._clearConsole();
            this.city.print();
        });
    }

    private _clearConsole(): void {
        console.log('\x1Bc');
    }
}

const game: Game = new Game();
game.run();
