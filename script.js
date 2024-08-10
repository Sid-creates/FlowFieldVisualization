const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;


class Line{
    constructor(canvas){ //makes the instance of the class
        //sets the properties the line
        this.canvas = canvas;
        this.startX = Math.random() * this.canvas.width;
        this.startY = Math.random() * this.canvas.width;
        //this.endX = Math.random() * this.canvas.width;
        //this.endY = Math.random() * this.canvas.width;

        this.history = [{x: this.x, y: this.y}];

        this.lineWidth = Math.floor(Math.random() * 15 + 1);
        this.hue = Math.floor(Math.random() * 360);
    }
    draw(context){ // draw action for the line
        //context.linecap = 'round';
        context.strokeStyle = 'hsl(' + this.hue + ', 100%, 50%)';
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for(let i = 0; i < 5; i++){
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.width;
            this.history.push({x: this.x, y: this.y});
            }
        for(let i = 0; i < this.history.length; i++){
            context.lineTo(this.history[i].x, this.history[i].y);
            //context.stroke();
        }
        context.lineTo(this.endX, this.endY);
        context.stroke();
    }
}

//----------------------------------------------//

const linesArray = [];
const numberOfLines = 1;
for(let i = 0; i < numberOfLines; i++){
    linesArray.push(new Line(canvas));
}

console.log(linesArray);

linesArray.forEach(object => {
    object.draw(ctx);
});