export class CanvasLocal {
    constructor(g, canvas) {
        this.graphics = g;
        this.maxX = canvas.width - 1;
        this.maxY = canvas.height - 1;
        this.centerX = this.maxX / 2;
        this.centerY = this.maxY / 2;
    }

    iX(x) { return Math.round(x); }
    iY(y) { return this.maxY - Math.round(y); }

    drawLine(x1, y1, x2, y2) {
        this.graphics.beginPath();
        this.graphics.moveTo(x1, y1);
        this.graphics.lineTo(x2, y2);
        this.graphics.stroke();
    }

    paint() {
        let size = Math.min(this.maxX, this.maxY) * 0.8;
        let offsetX = (this.maxX - size) / 2;
        let offsetY = (this.maxY - size) / 2;

        // 1. Vértices del triángulo inicial
        let xA = this.centerX,          yA = offsetY;
        let xB = offsetX + size,        yB = offsetY + size;
        let xC = offsetX,               yC = offsetY + size;

        let q = 0.08;
        let p = 1 - q;

        for (let i = 0; i < 20; i++) {

            // 2. Dibujar triángulo
            this.drawLine(xA, yA, xB, yB);
            this.drawLine(xB, yB, xC, yC);
            this.drawLine(xC, yC, xA, yA);

            // 3. Nuevos vértices (interpolación)
            let xA1 = p * xA + q * xB;
            let yA1 = p * yA + q * yB;

            let xB1 = p * xB + q * xC;
            let yB1 = p * yB + q * yC;

            let xC1 = p * xC + q * xA;
            let yC1 = p * yC + q * yA;

            xA = xA1; yA = yA1;
            xB = xB1; yB = yB1;
            xC = xC1; yC = yC1;
        }
    }
}
