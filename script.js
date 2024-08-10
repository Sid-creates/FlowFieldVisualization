const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;


class Line{
    constructor(canvas){ //makes the instance of the class
        //sets the properties the line
        this.canvas = canvas;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.width;
        this.history = [{x: this.x, y: this.y}];
        this.lineWidth = Math.floor(Math.random() * 15 + 1);
        this.hue = Math.floor(Math.random() * 360);
        this.maxLength = Math.floor(Math.random() * 50 + 5); 
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY =5;
        this.lifeSpan= this.maxLength * 2;
        this.timer = 0;
    }
    draw(context){ // draw action for the line
        //context.linecap = 'round';
        context.strokeStyle = 'hsl(' + this.hue + ', 100%, 50%)';
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.moveTo(this.history[0].x, this.history[0].y);
        for(let i = 0; i < this.history.length; i++){
            context.lineTo(this.history[i].x, this.history[i].y);
        }
        context.stroke();
    }
    update(){
        this.timer++;
        if(this.timer < this.lifeSpan){
            this.x += this.speedX + Math.random() * 60 - 30;
            this.y += this.speedY + Math.random() * 60 - 30;
           
            this.history.push({x: this.x, y: this.y});
            if(this.history.length > this.maxLength){
                this.history.shift();
            }
        }else if(this.history.length <= 1){
            this.reset();
        }
        else{
            this.history.shift();
        }
            
    }
    reset(){
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.width;
        this.history = [{x: this.x, y: this.y}];
        this.timer = 0;
    }
    
}

//----------------------------------------------//

const linesArray = [];
const numberOfLines = 100;
for(let i = 0; i < numberOfLines; i++){
    linesArray.push(new Line(canvas));
}

console.log(linesArray);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    linesArray.forEach(object => {
        object.draw(ctx);
        object.update();
    });
    requestAnimationFrame(animate);
}
animate();
