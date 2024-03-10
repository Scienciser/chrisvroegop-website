import { utils, xyCoords } from "./utils"


const offsetsJLSTZ: xyCoords[][] = [
    [[0, 0], [0, 0], [0, 0], [0, 0]],    // Offset 1
    [[0, 0], [1, 0], [0, 0], [-1, 0]],   // Offset 2
    [[0, 0], [1, -1], [0, 0], [-1, -1]], // Offset 3
    [[0, 0], [0, 2], [0, 0], [0, 2]],    // Offset 4
    [[0, 0], [1, 2], [0, 0], [1, 2]]     // Offset 5
];

const offsetsI: xyCoords[][] = [
    [[0, 0], [-1, 0], [-1, 1], [0, 1]],  // Offset 1
    [[-1, 0], [0, 0], [1, 1], [0, 1]],   // Offset 2
    [[2, 0], [0, 0], [-2, 1], [0, 1]],   // Offset 3
    [[-1, 0], [0, 1], [1, 0], [0, -1]],  // Offset 4
    [[2, 0], [0, -2], [-2, 0], [0, 2]]   // Offset 5
];

const offsetsO: xyCoords[][] = [
    [[0, 0], [0, -1], [-1, -1], [-1, 0]]     // Offset 1
]

export enum ShapeType {
    ShapeI = 1,
    ShapeJ = 2,
    ShapeL = 3,
    ShapeO = 4,
    ShapeS = 5,
    ShapeT = 6,
    ShapeZ = 7,
}

export const ShapeTypeClassMapping: Record<number, string> = {
    0: "empty-cell",
    1: "shape-i",
    2: "shape-j",
    3: "shape-l",
    4: "shape-o",
    5: "shape-s",
    6: "shape-t",
    7: "shape-z",
}

export class Shape {
    cells: number[];
    centre: number;
    shapeType: ShapeType;
    position: number;
    shapeClass: string;
    offsets: xyCoords[][];

    constructor(w: number, h: number) {
        this.shapeType = utils.random(1, 8);
        this.position = 0;
        const cx = Math.floor(w / 2) - 1; // 4
        const cy = h - 1;
        const c = cy * w + cx; // 214 for std board

        switch (this.shapeType) {
            case ShapeType.ShapeI:
                // Offsets: (x-1, y), (x, y), (x+1, y), (x+2, y)
                this.cells = [c-1+0*w, c+0+0*w, c+1+0*w, c+2+0*w] // [213, 214, 215, 216] for std board
                this.centre = 1;
                this.shapeClass = "shape-i";
                this.offsets = offsetsI;
                break;
            case ShapeType.ShapeJ:
                // Offsets: (x-1, y), (x-1, y-1), (x, y-1), (x+1, y-1)
                this.cells = [c-1+0*w, c-1-1*w, c+0-1*w, c+1-1*w]; // [213, 203, 204, 205] for std board
                this.centre = 2;
                this.shapeClass = "shape-j";
                this.offsets = offsetsJLSTZ;
                break;
            case ShapeType.ShapeL:
                // Offsets: (x+1, y), (x-1, y-1), (x, y-1), (x+1, y-1)
                this.cells = [c+1+0*w, c-1-1*w, c+0-1*w, c+1-1*w]; // [215, 203, 204, 205] for std board
                this.centre = 2;
                this.shapeClass = "shape-l";
                this.offsets = offsetsJLSTZ;
                break;
            case ShapeType.ShapeO:
                // Offsets: (x-1, y), (x, y), (x-1, y-1), (x, y-1)
                this.cells = [c-1+0*w, c+0+0*w, c-1-1*w, c+0-1*w]; // [213, 214, 203, 204] for std board
                this.centre = 2;
                this.shapeClass = "shape-o";
                this.offsets = offsetsO;
                break;
            case ShapeType.ShapeS:
                // Offsets: (x, y), (x+1, y), (x-1, y-1), (x, y-1)
                this.cells = [c+0+0*w, c+1+0*w, c-1-1*w, c+0-1*w]; // [214, 215, 203, 204] for std board
                this.centre = 3;
                this.shapeClass = "shape-s";
                this.offsets = offsetsJLSTZ;
                break;
            case ShapeType.ShapeT:
                // Offsets: (x, y), (x-1, y-1), (x, y-1), (x+1, y-1)
                this.cells = [c+0+0*w, c-1-1*w, c+0-1*w, c+1-1*w]; // [214, 203, 204, 205] for std board
                this.centre = 2;
                this.shapeClass = "shape-t";
                this.offsets = offsetsJLSTZ;
                break;
            case ShapeType.ShapeZ:
                // Offsets: (x-1, y), (x, y), (x, y-1), (x+1, y-1)
                this.cells = [c-1+0*w, c+0+0*w, c+0-1*w, c+1-1*w]; // [213, 214, 204, 205]
                this.centre = 2;
                this.shapeClass = "shape-z";
                this.offsets = offsetsJLSTZ;
                break;            
        }
    }
}
