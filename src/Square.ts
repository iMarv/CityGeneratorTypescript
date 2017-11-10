export class Square {
    public posX: number;
    public posY: number;

    constructor(x: number, y: number) {
        this.posX = x;
        this.posY = y;
    }

    public toString(): string {
        return `(${this.posX}|${this.posY})`;
    }
}
