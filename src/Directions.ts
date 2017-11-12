export enum Direction {
    NORTH,
    EAST,
    SOUTH,
    WEST,
}

export const Directions: Direction[] = [
    Direction.NORTH,
    Direction.EAST,
    Direction.SOUTH,
    Direction.WEST,
];

export function getDirectionNumber(direction: Direction): number {
    switch (direction) {
        case Direction.NORTH:
            return 1;
        case Direction.EAST:
            return 2;
        case Direction.SOUTH:
            return 4;
        case Direction.WEST:
            return 8;
    }
}
