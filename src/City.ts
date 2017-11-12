import { Direction } from './Directions';
import { config } from './config';
import { Square, SquareTypes } from './Square';

export class City {
    public squares: Square[] = [];
    public height: number;
    public width: number;

    private _miscAdded: boolean = false;

    get done(): boolean {
        return this._miscAdded;
    }

    get streetCount(): number {
        return this.squares.filter(s => s.type === SquareTypes.STREET).length;
    }

    get maxStreetsReached(): boolean {
        return !(
            this.streetCount <
            this.height * this.width * config.city.streetCoverage
        );
    }

    constructor(
        width: number = config.city.width,
        height: number = config.city.height
    ) {
        this.height = height;
        this.width = width;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                this.squares.push(new Square(x, y, this));
            }
        }

        this.findSquare(
            Math.floor(Math.random() * this.width),
            Math.floor(Math.random() * this.height)
        ).type =
            SquareTypes.STREET;
    }

    public tick(): void {
        if (!this.maxStreetsReached) {
            for (const square of this.squares) {
                square.populate();
            }
        } else if (!this._miscAdded) {
            for (const square of this.squares) {
                square.populate(true);
            }

            this._miscAdded = true;
        }
    }

    public print(): void {
        for (let y = 0; y < this.height; y++) {
            console.log(
                this._findRow(y)
                    .map(square => square.toString())
                    .join('')
            );
        }
    }

    public findSquare(x: number, y: number): Square {
        return this.squares.filter(
            square => square.x === x && square.y === y
        )[0];
    }

    public findSquareDirection(direction: Direction, from: Square) {
        switch (direction) {
            default:
            case Direction.NORTH:
                return this.findSquare(from.x, from.y - 1);
            case Direction.SOUTH:
                return this.findSquare(from.x, from.y + 1);
            case Direction.WEST:
                return this.findSquare(from.x - 1, from.y);
            case Direction.EAST:
                return this.findSquare(from.x + 1, from.y);
        }
    }

    public getDensity(
        square: Square,
        radius: number = config.city.densityRadius
    ): number {
        const surroundingSquares: Square[] = this.getSurroundingSquares(
            square,
            radius
        );

        const streetCount: number = surroundingSquares.filter(
            s => (s ? s.type === SquareTypes.STREET : false)
        ).length;

        return streetCount / surroundingSquares.length;
    }

    public getSurroundingSquares(square: Square, radius: number) {
        const surroundingSquares: Square[] = [];
        for (let x = square.x - radius; x <= square.x + radius; x++) {
            for (let y = square.y - radius; y <= square.y + radius; y++) {
                surroundingSquares.push(this.findSquare(x, y));
            }
        }
        return surroundingSquares;
    }

    private _findRow(y: number): Square[] {
        return this.squares.filter(square => square.y === y);
    }
}
