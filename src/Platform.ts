import { Square } from './Square';

export const DEFAULT_WIDTH: number = 10;
export const DEFAULT_HEIGHT: number = 10;

export class Platform {
    public squares: Square[][] = [];

    constructor(
        height: number = DEFAULT_HEIGHT,
        width: number = DEFAULT_WIDTH
    ) {
        for (let x: number = 0; x <= width; x++) {
            this.squares[x] = [];
            for (let y: number = 0; y <= height; y++) {
                this.squares[x][y] = new Square(x, y);
            }
        }
    }

    public print(): void {
        for (let y: number = 0; y < this.squares.length; y++) {
            let out: string[] = [];

            for (let x: number = 0; x < this.squares[y].length; x++) {
                out.push(this.squares[x][y].toString());
            }

            console.log(out.join(' '));
        }
    }
}
