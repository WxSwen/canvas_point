function animate (canvas) {
    let ctx     = canvas.getContext('2d'),
        w       = canvas.offsetWidth,
        h       = canvas.offsetHeight,
        points  = [],
        i;

    canvas.width = w;
    canvas.height = h;

    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.r = 1 + Math.random() * 2;
        this.moveX =  Math.random() * 2 - 1;
        this.moveY =  Math.random() * 2 - 1;
    }
    let method = {
        draw (ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fillStyle = '#aaa';
            ctx.fill()
        },
        move () {
            this.x += this.moveX;
            this.y += this.moveY;
            if(this.x > w) this.moveX = -Math.abs(this.moveX)
            else if(this.x < 0) this.moveX = Math.abs(this.moveX)
            if(this.y > h) this.moveY = -Math.abs(this.moveY)
            else if(this.y < 0) this.moveY = Math.abs(this.moveY)
        },
        line (ctx,target){
            let disX = this.x - target.x,
                disY = this.y - target.y,
                dis  = Math.sqrt(disX * disX + disY * disY);
            if(dis < 100){
                let opacity = 1 - dis / 100;
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(target.x,target.y);
                ctx.closePath();
                ctx.strokeStyle = 'rgba(170, 170, 170, ' + opacity + ')';
                ctx.strokeWidth = 1;
                ctx.stroke();
            }
        }
    };

    Point.prototype = Object.assign(Point.prototype,method);

    for(i = 0;i < 40;i ++){
        points.push(new Point(Math.random() * w, Math.random() * h));
    }

    function paint (){
        ctx.clearRect(0, 0, w, h);
        for(let k = 0;k<points.length;k++){
            points[k].move();
            points[k].draw(ctx);
            for(let j = k + 1; j < points.length; j++) {
                points[k].line(ctx, points[j])
            }
        }
    }

    let requestAnimFrame = window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.setTimeout;

    function loop(){
        requestAnimFrame(loop,1000 / 60);
        paint();
    }

    window.addEventListener('load', loop());
    window.addEventListener('resize', ()=> {
        w = canvas.width = canvas.offsetWidth;
        h = canvas.height = canvas.offsetHeight;

    })

}

export default animate;
