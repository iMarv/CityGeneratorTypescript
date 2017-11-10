import { City } from './City';

export enum SquareTypes {
    EMPTY = 'o',
    STREET = '#',
}

export class Square {
    public x: number;
    public y: number;
    public type: SquareTypes = SquareTypes.EMPTY;

    private _parent: City;

    constructor(x: number, y: number, parent: City) {
        this.x = x;
        this.y = y;
        this._parent = parent;
    }

    toString(): string {
        return this.type;
    }
}
