let gridSize = 40;
let dots = [];
let noiseScale = 0.005;

function setup() {
    let myDiv = document.getElementById('01');
    let divWidth = myDiv.offsetWidth;
    let divHeight = myDiv.offsetHeight;

    let canvas = createCanvas(divWidth, divHeight);
    canvas.parent('01');

    for (let x = gridSize / 2; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
            dots.push(new Dot(x, y));
        }
    }
}

function draw() {
    clear();
    for (let dot of dots) {
        dot.move();
        dot.display();
    }

    // Lines between dots
    stroke(0);
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        let rightNeighbor = getNeighbor(dot, gridSize, 0);
        let bottomNeighbor = getNeighbor(dot, 0, gridSize);
        if (rightNeighbor) {
            line(dot.x, dot.y, rightNeighbor.x, rightNeighbor.y);
        }
        if (bottomNeighbor) {
            line(dot.x, dot.y, bottomNeighbor.x, bottomNeighbor.y);
        }
    }
}

function windowResized() {
    let myDiv = document.getElementById('01');
    let divWidth = myDiv.offsetWidth;
    let divHeight = myDiv.offsetHeight;
    resizeCanvas(divWidth, divHeight);

    // Recalculate dots positions
    dots = [];
    for (let x = gridSize / 2; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
            dots.push(new Dot(x, y));
        }
    }
}

class Dot {
    constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.diameter = 1;
        this.maxOffset = 20; 
        this.noiseOffsetX = random(1000); 
        this.noiseOffsetY = random(1000);
    }

    move() {
        let offsetX = noise(this.noiseOffsetX + frameCount * noiseScale) * this.maxOffset * 2 - this.maxOffset;
        let offsetY = noise(this.noiseOffsetY + frameCount * noiseScale) * this.maxOffset * 2 - this.maxOffset;
        this.x = this.baseX + offsetX;
        this.y = this.baseY + offsetY;
        this.x = constrain(this.x, this.baseX - this.maxOffset, this.baseX + this.maxOffset);
        this.y = constrain(this.y, this.baseY - this.maxOffset, this.baseY + this.maxOffset);
    }

    display() {
        fill(0);
        noStroke();
        ellipse(this.x, this.y, this.diameter);
    }
}

function getNeighbor(dot, offsetX, offsetY) {
    let neighborX = dot.baseX + offsetX;
    let neighborY = dot.baseY + offsetY;
    for (let d of dots) {
        if (d.baseX === neighborX && d.baseY === neighborY) {
            return d;
        }
    }
    return null;
}
