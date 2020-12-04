var myCar;
var treeLogs = [];



var newCanvas = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 580;
        this.canvas.height = 350;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateNewCanvas, 20);

        window.addEventListener(
            'keydown', function(e){
            newCanvas.key = e.keyCode;
        })

        window.addEventListener(
            'keyup', function (e){
            newCanvas.key = false;
        })

        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}


function object(width, height, color, x, y, type) {
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = newCanvas.context;
        if (type == "image"){
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else{
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }


    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    


    this.crashWith = function(newobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = newobj.x;
        var otherright = newobj.x + (newobj.width);
        var othertop = newobj.y;
        var otherbottom = newobj.y + (newobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateNewCanvas() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < treeLogs.length; i += 1) {
        if (myCar.crashWith(treeLogs[i])) {
            newCanvas.stop();
            return;
        } 
    }
    newCanvas.clear();
    newCanvas.frameNo += 1;

    theBackground.newPos();    
    theBackground.update();

    if (newCanvas.frameNo == 1 || everyinterval(150)) {
        x = newCanvas.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 60;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        treeLogs.push(new object(30, height, "brown", x, 0, ));
        treeLogs.push(new object(30, x - height - gap, "brown", x, height + gap, ));
    }
    for (i = 0; i < treeLogs.length; i += 1) {
        treeLogs[i].x += -1;
        treeLogs[i].update();
    }

    if (newCanvas && newCanvas.key == 37) {
        myCar.speedX = -1;
    }

    if (newCanvas.key && newCanvas.key == 39) {
        myCar.speedX = 1; 
    }

    if (newCanvas.key && newCanvas.key == 38) {
        myCar.speedY = -1; 
    }

    if (newCanvas.key && newCanvas.key == 40) {
        myCar.speedY = 1; 
    }

    myCar.newPos();    
    myCar.update();
}

function everyinterval(n) {
    if ((newCanvas.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function startGame() {
    myCar = new object(50, 50, "car.gif", 10, 120, "image");
    theBackground = new object(580, 350, "road.jpg", 0, 0, "image");
    newCanvas.start();
}


