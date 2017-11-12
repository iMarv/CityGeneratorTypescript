import { Direction } from './Directions';
import { config } from './config';
import { Square } from './Square';

export class City {
    public squares: Square[] = [];
    public height: number;
    public width: number;

    /**
     * Returns the current amount of streets
     *
     * @readonly
     * @type {number}
     * @memberof City
     */
    get streetCount(): number {
        return this.squares.filter(s => s.isStreet).length;
    }

    /**
     * Returns if the maximum amount of streets for this city has been reached
     *
     * @readonly
     * @type {boolean}
     * @memberof City
     */
    get maxStreetsReached(): boolean {
        return !(
            this.streetCount <
            this.height * this.width * config.city.streetCoverage
        );
    }

    /**
     * Creates an instance of City.
     * @param {number} [width=config.city.width] Width of the city; Optional
     * @param {number} [height=config.city.height] Height of the city; Optional
     * @memberof City
     */
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
        ).isStreet = true;
    }

    /**
     * Runs a creation tick if the city has a sufficient amount of space
     *
     * @memberof City
     */
    public tick(): void {
        if (!this.maxStreetsReached) {
            for (const square of this.squares) {
                square.populate();
            }
        }
    }

    /**
     * Prints the current state of the city to the console
     *
     * @memberof City
     */
    public print(): void {
        for (let y = 0; y < this.height; y++) {
            console.log(
                this._findRow(y)
                    .map(square => square.toString())
                    .join('')
            );
        }
    }

    /**
     * Returns the square at the given position of the city
     *
     * @param {number} x x-Position of the square
     * @param {number} y y-Position of the square
     * @returns {Square} Square at the position (x | y)
     * @memberof City
     */
    public findSquare(x: number, y: number): Square {
        return this.squares.filter(
            square => square.x === x && square.y === y
        )[0];
    }

    /**
     * Returns the first square from a given direction relative to a given square
     *
     * @param {Direction} direction Direction of the wanted square
     * @param {Square} from Original square
     * @returns {Square} Square relative to the given one
     * @memberof City
     */
    public findSquareDirection(direction: Direction, from: Square): Square {
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

    /**
     * Calculates the street-density around a given square
     *
     * @param {Square} square Original square
     * @param {number} [radius=config.city.densityRadius] Radius around the square to check; Optional
     * @returns {number} Number between 0 and 1. With 0 as a low density and 1 as a high density
     * @memberof City
     */
    public getDensity(
        square: Square,
        radius: number = config.city.densityRadius
    ): number {
        const surroundingSquares: Square[] = this.getSurroundingSquares(
            square,
            radius
        );

        const streetCount: number = surroundingSquares.filter(
            s => (s ? s.isStreet : false)
        ).length;

        return streetCount / surroundingSquares.length;
    }

    /**
     * Returns an array of squares which are placed around a given square
     *
     * @param {Square} square Original square
     * @param {number} radius Radius around the square to check for
     * @returns {Square[]} Array of squares around the given square
     * @memberof City
     */
    public getSurroundingSquares(square: Square, radius: number): Square[] {
        const surroundingSquares: Square[] = [];
        for (let x = square.x - radius; x <= square.x + radius; x++) {
            for (let y = square.y - radius; y <= square.y + radius; y++) {
                surroundingSquares.push(this.findSquare(x, y));
            }
        }
        return surroundingSquares;
    }

    /**
     * Returns a row of squares
     *
     * @private
     * @param {number} y y-position of the desired squares
     * @returns {Square[]} Row at the given position
     * @memberof City
     */
    private _findRow(y: number): Square[] {
        return this.squares.filter(square => square.y === y);
    }
}
