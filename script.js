const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

ctx.linewidth = 10;
ctx.linecap = 'round';
ctx.strokeStyle = 'blue';

class Line{
    constructor(){ //makes the instance of the class
        //sets the properties the line
        this.startX = Math.random() * canvas.width;
        this.startY = Math.random() * canvas.width;
        this.endX = Math.random() * canvas.width;
        this.endY = Math.random() * canvas.width;
    }
    draw(){ // draw action for the line
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();
    }
}

const line1 = new Line(); //creates a new instance of the class
line1.draw(); //draws the line