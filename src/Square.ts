import { mappedStreets } from './StreetMapping';
import { Directions, getDirectionNumber } from './Directions';
import { config } from './config';
import { City } from './City';

const RANDOM_TARGET = 1;

export class Square {
    public x: number;
    public y: number;

    private _type: SquareTypes = SquareTypes.EMPTY;
    private _parent: City;
    private _prettyPrint: string;

    get type(): SquareTypes {
        return this._type;
    }

    set type(value: SquareTypes) {
        if (value === SquareTypes.STREET && this._streetConnections() <= 1) {
            this._type = value;
        } else if (value === SquareTypes.PARK) {
            this._type = value;
        }
    }

    get closeBy(): Square[] {
        return [
            this._parent.findSquare(this.x - 1, this.y),
            this._parent.findSquare(this.x + 1, this.y),
            this._parent.findSquare(this.x, this.y - 1),
            this._parent.findSquare(this.x, this.y + 1),
        ];
    }

    constructor(x: number, y: number, parent: City) {
        this.x = x;
        this.y = y;
        this._parent = parent;
    }

    populate(misc: boolean = false): void {
        if (!misc && this.type === SquareTypes.STREET) {
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
        } else if (misc && this.type == SquareTypes.EMPTY) {
            const surroundingsEmpty: number = this._parent
                .getSurroundingSquares(this, 1)
                .filter(s => (s ? !(s.x === this.x && s.y === this.y) : true))
                .filter(
                    s =>
                        s
                            ? s.type === SquareTypes.EMPTY ||
                              s.type === SquareTypes.PARK
                            : true
                ).length;

            if (surroundingsEmpty === 8) {
                this.type = SquareTypes.PARK;
            } else {
                this._prettyPrint = ' ';
            }
        } else if (misc && this.type === SquareTypes.STREET) {
            let status: number = 0;

            for (let direction of Directions) {
                const square: Square = this._parent.findSquareDirection(
                    direction,
                    this
                );

                if (square && square.type === SquareTypes.STREET) {
                    status += getDirectionNumber(direction);
                }
            }

            this._prettyPrint = mappedStreets[status - 1];
        }
    }

    private _populateStreet() {
        const selectedSquare: number = this._randomNumber(4);
        if (this.closeBy[selectedSquare]) {
            this.closeBy[selectedSquare].type = SquareTypes.STREET;
        }
    }

    toString(): string {
        // return `(${this.x}|${this.y})`;
        return this._prettyPrint || this.type;
    }

    private _streetConnections(): number {
        return this.closeBy.filter(
            square => (square ? square.type === SquareTypes.STREET : false)
        ).length;
    }

    private _randomNumber(max: number) {
        return Math.floor(Math.random() * max);
    }
}

export enum SquareTypes {
    EMPTY = ' ',
    STREET = '#',
    PARK = '.',
}
