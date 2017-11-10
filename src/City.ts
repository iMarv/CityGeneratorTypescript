import { Square } from './Square';

const DEFAULT_WIDTH: number = 10;
const DEFAULT_HEIGHT: number = 10;

export class City {
    public squares: Square[] = [];

    private _height: number;
    private _width: number;

    constructor(
        width: number = DEFAULT_WIDTH,
        height: number = DEFAULT_HEIGHT
    ) {
        this._height = height;
        this._width = width;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.squares.push(new Square(x, y, this));
            }
        }
    }

    public print(): void {
        for (let x = 0; x < this._width; x++) {
            console.log(
                this._findRow(x)
                    .map(square => square.toString())
                    .join(' ')
            );
        }
    }

    private _findColumn(y: number): Square[] {
        return this.squares.filter(square => square.y === y);
    }

    private _findRow(x: number): Square[] {
        return this.squares.filter(square => square.x === x);
    }

    private _findSquare(x: number, y: number): Square {
        return this.squares.find(square => square.x === x && square.y === y);
    }
}
