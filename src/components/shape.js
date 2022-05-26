import { utils } from "./utils"

const offsetsJLSTZ = [
    [[0, 0], [0, 0], [0, 0], [0, 0]],    // Offset 1
    [[0, 0], [1, 0], [0, 0], [-1, 0]],   // Offset 2
    [[0, 0], [1, -1], [0, 0], [-1, -1]], // Offset 3
    [[0, 0], [0, 2], [0, 0], [0, 2]],    // Offset 4
    [[0, 0], [1, 2], [0, 0], [1, 2]]     // Offset 5
];

const offsetsI = [
    [[0, 0], [-1, 0], [-1, 1], [0, 1]],  // Offset 1
    [[-1, 0], [0, 0], [1, 1], [0, 1]],   // Offset 2
    [[2, 0], [0, 0], [-2, 1], [0, 1]],   // Offset 3
    [[-1, 0], [0, 1], [1, 0], [0, -1]],  // Offset 4
    [[2, 0], [0, -2], [-2, 0], [0, 2]]   // Offset 5
];

const offsetsO = [
    [[0, 0], [0, -1], [-1, -1], [-1, 0]]     // Offset 1
]

export class shape {
    constructor(makeShape, w, h) {
        if (makeShape) {
            this.shapeType = utils.random(1, 8);
        } else {
            this.shapeType = 0;
        }
        this.position = 0;
        const cx = Math.floor(w / 2) - 1
        const cy = h - 1
        switch (this.shapeType) {
            case 0: // Empty shape
                this.cells = [];
                this.centre = null;
                this.shapeClass = null;
                this.offsets = [];
                break;
            case 1: // I
                this.cells = [[cx - 1, cy - 1], [cx, cy - 1], [cx + 1, cy - 1], [cx + 2, cy - 1]];
                this.centre = 1;
                this.shapeClass = "shape-i";
                this.offsets = offsetsI;
                break;
            case 2: // J
                this.cells = [[cx - 1, cy], [cx - 1, cy - 1], [cx, cy - 1], [cx + 1, cy - 1]];
                this.centre = 2;
                this.shapeClass = "shape-j";
                this.offsets = offsetsJLSTZ;
                break;
            case 3: // L
                this.cells = [[cx + 1, cy], [cx - 1, cy - 1], [cx, cy - 1], [cx + 1, cy - 1]];
                this.centre = 2;
                this.shapeClass = "shape-l";
                this.offsets = offsetsJLSTZ;
                break;
            case 4: // O
                this.cells = [[cx - 1, cy], [cx, cy], [cx - 1, cy - 1], [cx, cy - 1]];
                this.centre = 2;
                this.shapeClass = "shape-o";
                this.offsets = offsetsO;
                break;
            case 5: // S
                this.cells = [[cx, cy], [cx + 1, cy], [cx - 1, cy - 1], [cx, cy - 1]];
                this.centre = 3;
                this.shapeClass = "shape-s";
                this.offsets = offsetsJLSTZ;
                break;
            case 6: // T
                this.cells = [[cx, cy], [cx - 1, cy - 1], [cx, cy - 1], [cx + 1, cy - 1]];
                this.centre = 2;
                this.shapeClass = "shape-t";
                this.offsets = offsetsJLSTZ;
                break;
            case 7: // Z
                this.cells = [[cx - 1, cy], [cx, cy], [cx, cy - 1], [cx + 1, cy - 1]];
                this.centre = 2;
                this.shapeClass = "shape-z";
                this.offsets = offsetsJLSTZ;
                break;
        }
    }
}