import { City } from './City';

const SINGLE_STREET_POPULATION_CHANCE = 10;
const INTERSECTION_POPULATION_CHANCE = 50;
const RANDOM_TARGET = 1;

export class Square {
    public x: number;
    public y: number;

    private _type: SquareTypes = SquareTypes.EMPTY;
    private _parent: City;

    get type(): SquareTypes {
        return this._type;
    }

    set type(value: SquareTypes) {
        if (this._streetConnections() <= 1) {
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

    populate(): void {
        if (this.type === SquareTypes.STREET) {
            const intersectionChance: number = Math.floor(
                Math.random() * INTERSECTION_POPULATION_CHANCE
            );

            const singleChance: number = Math.floor(
                Math.random() * SINGLE_STREET_POPULATION_CHANCE
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
        }
    }

    private _populateStreet() {
        const selectedSquare: number = Math.floor(Math.random() * 4);
        if (this.closeBy[selectedSquare]) {
            this.closeBy[selectedSquare].type = SquareTypes.STREET;
        }
    }

    toString(): string {
        return this.type;
    }

    private _streetConnections(): number {
        return this.closeBy.filter(
            square => (square ? square.type === SquareTypes.STREET : false)
        ).length;
    }
}

export enum SquareTypes {
    EMPTY = ' ',
    STREET = '#',
}
