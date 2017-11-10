import { config } from './config';
import { Square, SquareTypes } from './Square';

export class City {
    public squares: Square[] = [];

    private _height: number;
    private _width: number;

    get streetCount(): number {
        return this.squares.filter(s => s.type === SquareTypes.STREET).length;
    }
    constructor(
        width: number = config.city.width,
        height: number = config.city.height
    ) {
        this._height = height;
        this._width = width;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.squares.push(new Square(x, y, this));
            }
        }

        this.findSquare(
            Math.floor(this._width / 2),
            Math.floor(this._height / 2)
        ).type =
            SquareTypes.STREET;
    }

    public tick(): void {
        if (
            this.streetCount <
            this._height * this._width * config.city.streetCoverage
        ) {
            for (const square of this.squares) {
                square.populate();
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

    public findSquare(x: number, y: number): Square {
        return this.squares.filter(
            square => square.x === x && square.y === y
        )[0];
    }

    private _findColumn(y: number): Square[] {
        return this.squares.filter(square => square.y === y);
    }

    private _findRow(x: number): Square[] {
        return this.squares.filter(square => square.x === x);
    }
}