import { mappedStreets } from './StreetMapping';
import { Directions, getDirectionNumber, Direction } from './Directions';
import { config } from './config';
import { City } from './City';

const RANDOM_TARGET = 1;

export class Square {
    public x: number;
    public y: number;

    private _isStreet: boolean = false;
    private _parent: City;
    private _clusterBlock: boolean = false;

    get isStreet(): boolean {
        return this._isStreet;
    }

    set isStreet(value: boolean) {
        if (value && this._streetConnections() <= 1) {
            this._isStreet = value;
        }
    }

    get closeBy(): Square[] {
        return [
            this._parent.findSquareDirection(Direction.NORTH, this),
            this._parent.findSquareDirection(Direction.EAST, this),
            this._parent.findSquareDirection(Direction.WEST, this),
            this._parent.findSquareDirection(Direction.SOUTH, this),
        ];
    }

    constructor(x: number, y: number, parent: City) {
        this.x = x;
        this.y = y;
        this._parent = parent;
    }

    populate(): void {
        if (this.isStreet) {
            const intersectionChance: number = this._randomNumber(
                config.square.chance.intersection *
                    (config.square.densityBase.intersection +
                        this._parent.getDensity(this))
            );

            const singleChance: number = this._randomNumber(
                config.square.chance.single *
                    (config.square.densityBase.single +
                        this._parent.getDensity(this))
            );

            if (
                (this._streetConnections() === 1 ||
                    this._parent.streetCount === 1) &&
                singleChance === RANDOM_TARGET
            ) {
                this._populateStreet();
            } else if (intersectionChance === RANDOM_TARGET) {
                this._populateStreet();
            }
        } else if (
            !this._clusterBlock &&
            !this.isStreet &&
            this._streetConnections() >= 2
        ) {
            const diagonalStreets: Square[] = this._parent
                .getSurroundingSquares(this, 1)
                .filter(s => !(this.closeBy.indexOf(s) > -1))
                .filter(s => s.isStreet);

            if (diagonalStreets.length === 0) {
                this._isStreet = true;
            } else {
                this._clusterBlock = true;
            }
        }
    }

    private _populateStreet() {
        const selectedSquare: number = this._randomNumber(4);
        if (this.closeBy[selectedSquare]) {
            this.closeBy[selectedSquare].isStreet = true;
        }
    }

    toString(): string {
        if (this.isStreet) {
            let status: number = 0;
            for (let direction of Directions) {
                const square: Square = this._parent.findSquareDirection(
                    direction,
                    this
                );

                if (square && square.isStreet) {
                    status += getDirectionNumber(direction);
                }
            }

            return mappedStreets[status];
        } else {
            const surroundingsEmpty: number = this._parent
                .getSurroundingSquares(this, 1)
                .filter(s => (s ? !s.isStreet : true)).length;

            if (surroundingsEmpty === 9) {
                return SquareTypes.PARK;
            } else {
                return SquareTypes.EMPTY;
            }
        }
    }

    private _streetConnections(): number {
        return this.closeBy.filter(square => (square ? square.isStreet : false))
            .length;
    }

    private _randomNumber(max: number) {
        return Math.floor(Math.random() * max);
    }
}

export enum SquareTypes {
    EMPTY = ' ',
    PARK = '.',
}
