/* ------------ OBJEKT PIPE ------------ */
/*- Definovanie objektu Pipe -*/
function Pipe(type,image,sides,connected1,connected2,i,j){
    this.type = type; //0=round; 1=straight; 2=start; 3=end;
    this.image = image; //image if pipe
    this.x = 0;
    this.y = 0;
    this.angle = 0; //aktualne natocenie
    this.sides = sides; //1=enable connection; 0=disable connection;
    this.connected1 = connected1; //references to connected pipes
    this.connected2 = connected2;
    this.row = i;
    this.column = j;
    this.active = false;
}
/*- Definovanie funkcii na operaciu s objektom Pipe -*/
Pipe.prototype.rotate = function(){
    if(this.type == 0){
        if(this.angle == 0){
            this.sides = [1,1,0,0];
        }
        else if(this.angle == 90){
            this.sides = [0,1,1,0];
        }
        else if(this.angle == 180){
            this.sides = [0,0,1,1];
        }
        else if(this.angle == 270){
            this.sides = [1,0,0,1];
        }
    }
    else if(this.type == 1){
        for(i = 0; i < this.sides.length; i++){
            if(this.sides[i] == 0){
                this.sides[i] = 1;
            }
            else if(this.sides[i] == 1){
                this.sides[i] = 0;
            }
        }
    }
    //console.log(this.sides.toString());
}

Pipe.prototype.lookForConnection = function(){
    this.clearConnections();
    for(i = 0; i < this.sides.length; i++){
        if(this.sides[i] == 1){
            if(i == 0){
                if(this.row == 0 && this.column == 0){
                    this.connectStart();
                }
                else if(this.row - 1 >= 0){
                    if(puzzle[this.row-1][this.column].sides[2] == 1){
                        this.connectPipes(this.row-1, this.column);
                    }
                }
            }
            else if(i == 1){
                if(this.column + 1 <= 7){
                    if(puzzle[this.row][this.column+1].sides[3] == 1){
                        this.connectPipes(this.row, this.column+1);
                    }
                }
            }
            else if(i == 2){
                if(this.row == 4 && this.column == 6){
                    this.connectEnd();
                }
                else if(this.row + 1 <= 4){
                    if(puzzle[this.row+1][this.column].sides[0] == 1){
                        this.connectPipes(this.row+1, this.column);
                    }
                }
            }
            else if(i == 3){
                if(this.column - 1 >= 0){
                    if(puzzle[this.row][this.column-1].sides[1] == 1){
                        this.connectPipes(this.row, this.column-1);
                    }
                }
            }
        }
    }
}

Pipe.prototype.clearConnections = function(){
    if(this.connected1 != null){
        if(this.connected1.connected1 != null){
            if(this.connected1.connected1.row == this.row && this.connected1.connected1.column == this.column){
                this.connected1.connected1 = null;
            }
        }
        if(this.connected1.connected2 != null){
            if(this.connected1.connected2.row == this.row && this.connected1.connected2.column == this.column){
                this.connected1.connected2 = null;
            }
        }
        this.connected1 = null;
    }
    if(this.connected2 != null){
        if(this.connected2.connected1 != null){
            if(this.connected2.connected1.row == this.row && this.connected2.connected1.column == this.column){
                this.connected2.connected1 = null;
            }
        }
        if(this.connected2.connected2 != null){
            if(this.connected2.connected2.row == this.row && this.connected2.connected2.column == this.column){
                this.connected2.connected2 = null;
            }
        }
        this.connected2 = null;
    }
}

Pipe.prototype.connectPipes = function(conRow, conColumn){
    if(this.connected1 == null){
        this.connected1 = puzzle[conRow][conColumn];
        if(this.connected1.connected1 == null){
            this.connected1.connected1 = this;
        }
        else if(this.connected1.connected2 == null){
            this.connected1.connected2 = this;
        }
    }
    else if(this.connected2 == null){
        this.connected2 = puzzle[conRow][conColumn];
        if(this.connected2.connected1 == null){
            this.connected2.connected1 = this;
        }
        else if(this.connected2.connected2 == null){
            this.connected2.connected2 = this;
        }
    }
}

Pipe.prototype.connectStart = function(){
    if(this.connected1 == null){
        this.connected1 = startPipe;
        startPipe.connected1 = this;
    }
    else if(this.connected2 == null){
        this.connected2 = startPipe;
        startPipe.connected1 = this;
    }
}

Pipe.prototype.connectEnd = function(){
    if(this.connected1 == null){
        this.connected1 = endPipe;
        endPipe.connected1 = this;
    }
    else if(this.connected2 == null){
        this.connected2 = endPipe;
        endPipe.connected1 = this;
    }
}

Pipe.prototype.getNext = function(previous){
    if(this.connected1 != null){
        if(this.connected1.row == previous.row && this.connected1.column == previous.column){
            return this.connected2;
        }
    }
    if(this.connected2 !=null){
        if(this.connected2.row == previous.row && this.connected2.column == previous.column){
            return this.connected1;
        }
    }
}

/* --------------------------------------*/
var level, previousLevel = -1;
var playCanvas, controlCanvas;
var playground, controll;
var pipeHover, pipeClick, pipeOut, valveClick;
var loading, timer;
var xOffset = 0, yOffset = 0;
var startPipe, endPipe, valve;
var counter = 0, score = 0, time = 61;
var pocetTxt, skoreTxt;
var result;
var puzzle;
var animationArray = new Array();
var images = [];

var imageLoader = {
    loaded: false,
    loadedImages: 0,
    totalImages: 0,
    load: function(url){
        this.totalImages++;
        this.loaded = false;
        var image = new Image();
        image.src = url;
        image.onload = function(){
            imageLoader.loadedImages++;
            if(imageLoader.loadedImages == imageLoader.totalImages){
                imageLoader.loaded = true;
            }
        };
        return image;
    }
};

function drawLoading(){
    controll.fillRect(0,0,640,100);
    playground.fillRect(0,0,640,480);
    playground.clearRect(165,198,310,85);
    playground.fillRect(170,203,((imageLoader.loadedImages/imageLoader.totalImages)*300),75);
    if(imageLoader.loaded){
        clearInterval(loading);
        controll.clearRect(0,0,640,100);
        playground.clearRect(0,0,640,480);
        startScreen();
    }
}


window.onload = function(){
    playCanvas = document.getElementById("playground");
    controlCanvas = document.getElementById("control");
    playground = playCanvas.getContext("2d");
    controll = controlCanvas.getContext("2d");
    loading = setInterval(drawLoading,33);
    images.push(imageLoader.load('images/pipe.png'));
    images.push(imageLoader.load('images/roundpipe.png'));
    images.push(imageLoader.load('images/straightpipe.png'));
    images.push(imageLoader.load('images/grid.png'));
    images.push(imageLoader.load('images/controlls.png'));
    images.push(imageLoader.load('images/button.png'));
    images.push(imageLoader.load('images/start.png'));
};

function startScreen(){
    if(localStorage.getItem("milanPlumberScore") != undefined){
        scoreObject = JSON.parse(localStorage.getItem("milanPlumberScore"));
        score = scoreObject.actual;
    }
    controll.drawImage(images[6],0,0,640,100,0,0,640,100);
    playground.drawImage(images[6],0,100,640,460,0,0,640,460);
    playground.font = "bold 20px arial";
    playground.fillText("Tvoje skóre: "+score,320-(playground.measureText("Tvoje skóre: "+score).width/2),230);
    playground.drawImage(images[5],0,0,153,56,320-(153/2),260,153,56);
    playground.drawImage(images[5],2*153,0,153,56,320-(153/2),260+56+20,153,56);
    var clickEvent, hoverEvent;
    
    playCanvas.addEventListener('mousemove',hoverEvent = function(event){
            var ex = event.pageX;
            var ey = event.pageY;
            
            if(ex > 320-(153/2) && ex < 320-(153/2)+153 && ey > 260+100 && ey < 260+56+100){
                playground.drawImage(images[5],0,56,153,56,320-(153/2),260,153,56);
            }
            else if(ex > 320-(153/2) && ex < 320-(153/2)+153 && ey > 260+20+56+100 && ey < 260+20+56+56+100){
                playground.drawImage(images[5],2*153,56,153,56,320-(153/2),260+56+20,153,56);
            }
            else {
                playground.drawImage(images[5],0,0,153,56,320-(153/2),260,153,56);
                playground.drawImage(images[5],2*153,0,153,56,320-(153/2),260+56+20,153,56);
            }
    },false);
    
    playCanvas.addEventListener('click',clickEvent = function(event){
            var ex = event.pageX;
            var ey = event.pageY;
            
            if(ex > 320-(153/2) && ex < 320-(153/2)+153 && ey > 260+100 && ey < 260+56+100){
                playCanvas.removeEventListener("mousemove",hoverEvent);
                playCanvas.removeEventListener("click",clickEvent);
                var levelNumber;
                while(true){
                    levelNumber = Math.floor(Math.random()*levels.length);
                    if(levelNumber != previousLevel){
                        previousLevel = levelNumber;
                        level = levels[levelNumber];
                        break;
                    }
                }
                createGame();
            }
            else if(ex > 320-(153/2) && ex < 320-(153/2)+153 && ey > 260+20+56+100 && ey < 260+20+56+56+100){
                playCanvas.removeEventListener("mousemove",hoverEvent);
                playCanvas.removeEventListener("click",clickEvent);
                window.location.replace("graph.html");
            }
    },false);
}

function createGame(){
    controll.clearRect(0,0,640,100);
    playground.clearRect(0,0,640,460);
    playground.fillStyle = "#C0C0C0";
    playground.fillRect(0,0,640,480);
    controll.fillStyle = "#C0C0C0";
    controll.fillRect(0,0,640,100);
    counter = 0;
    time = 61;
    puzzle = [[null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null]];
    createControls();
    createPuzzle(level);
    //oznacenie rurky
    playCanvas.addEventListener('mousemove',pipeHover = function(event){
        var ex = event.pageX;
        var ey = event.pageY;
        xOffset = 20;
        
        if(ex > xOffset && ex < 640-xOffset && ey > yOffset && ey < (75*(puzzle.length+1))){
            ex = ex - xOffset;
            var j = Math.floor(ex/75);
            var i = Math.floor(ey/75)-1;
            //console.log("x: "+j+"   y: "+i);
            if(puzzle[i][j].active){
                return;
            }
            playground.fillStyle = "rgba(143,116,252,0.3)";
            playground.fillRect(puzzle[i][j].x,puzzle[i][j].y,75,75);
            for(k = 0; k < puzzle.length; k++){
                for(l = 0; l < puzzle[k].length; l++){
                    if(puzzle[k][l].active){
                        rotatePipe(puzzle[k][l]);
                        puzzle[k][l].active = false;
                    }
                }
            }
            puzzle[i][j].active = true;
        }
        else{
            for(k = 0; k < puzzle.length; k++){
                 for(l = 0; l < puzzle[k].length; l++){
                    if(puzzle[k][l].active){
                        rotatePipe(puzzle[k][l]);
                        puzzle[k][l].active = false;
                    }
                }
            }
        }
    },false);
    //otocenie rurky
    playCanvas.addEventListener("click",pipeClick = function(event){
        var ex = event.pageX;
        var ey = event.pageY;
        xOffset = 20;
        
        if(ex > xOffset && ex < 640-xOffset && ey > yOffset && ey < (75*(puzzle.length+1))){
            ex = ex - xOffset;
            var j = Math.floor(ex/75);
            var i = Math.floor(ey/75)-1;
            puzzle[i][j].angle += 90;
            if(puzzle[i][j].type == 0){
                if(puzzle[i][j].angle == 360){
                    puzzle[i][j].angle = 0;
                }
            }
            else if(puzzle[i][j].type == 1){
                if(puzzle[i][j].angle == 180){
                    puzzle[i][j].angle = 0;
                }
            }
            rotatePipe(puzzle[i][j]);
            puzzle[i][j].rotate();
            puzzle[i][j].lookForConnection();
            playground.fillStyle = "rgba(143,116,252,0.3)";
            playground.fillRect(puzzle[i][j].x,puzzle[i][j].y,75,75);
            countMoves();            
        }
    },false);
    //odidenie s myškou nad canvasom
    playCanvas.addEventListener('mouseout',pipeOut = function(){
        for(k = 0; k < puzzle.length; k++){
             for(l = 0; l < puzzle[k].length; l++){
                if(puzzle[k][l].active){
                    rotatePipe(puzzle[k][l]);
                    puzzle[k][l].active = false;
                }
            }
        }
    },false);
    //kliknutie na ventil
    controlCanvas.addEventListener("click", valveClick = function(event){
        var ex = event.pageX;
        var ey = event.pageY;
        
        if(ex > 20 && ex < 95 && ey > 12 && ey < 87 ){
            if(startPipe.connected1 == null){
                startFlow();
                return;
            }
            var valveAnimation, angle = 0;
            valveAnimation = setInterval(function(){
                if(angle == 360){
                    clearInterval(valveAnimation);
                }
                controll.clearRect(20,0,75,100);
                controll.fillStyle = "#C0C0C0";
                controll.fillRect(20,0,75,100);
                controll.drawImage(startPipe.image,0,0,75,100,startPipe.x,startPipe.y,75,100);
                controll.save();
                controll.translate(20,12);
                controll.translate(37.5,37.5);
                controll.rotate(angle*Math.PI/180);
                controll.drawImage(valve,0,0,75,75,-37.5,-37.5,75,75);
                controll.restore();
                angle += 9;
            },33);
            startFlow();
        }
    
    },false);
}


function createControls(){
    xOffset = 20;
    startPipe = new Pipe(2,images[0],[0,0,1,0],null,null,-1,0);
    startPipe.x = xOffset;
    startPipe.y = 0;
    controll.drawImage(startPipe.image,0,0,75,100,startPipe.x,startPipe.y,75,100);
    valve = images[4];
    controll.drawImage(valve,0,0,75,75,xOffset,12,75,75);
    controll.fillStyle = "black";
    controll.font = "bold 20px arial";
    pocetTxt = "Počet ťahov: ";
    controll.fillText(pocetTxt,120,25);
    controll.fillText(counter,120+controll.measureText(pocetTxt).width,25);
    skoreTxt = "Skóre: ";
    controll.fillText(skoreTxt,360,25);
    controll.fillText(score,360+controll.measureText(skoreTxt).width,25);
    controll.drawImage(images[4],0,75,100,50,120,45,500,50);
    startTimer();
}

function createPuzzle(level){
    xOffset = 20;
    endPipe = new Pipe(3,images[0],[1,0,0,0],null,null,5,6);
    endPipe.x = 470;
    endPipe.y = 375;
    for(i = 0; i < level.length; i++){
        for(j = 0; j < level[i].length; j++){
            if(level[i][j] == 0){
                puzzle[i][j] = new Pipe(0,images[1],[1,1,0,0],null,null,i,j);
            }
            if(level[i][j] == 1){
                puzzle[i][j] = new Pipe(1,images[2],[0,1,0,1],null,null,i,j);
            }
            puzzle[i][j].x = (75*j)+xOffset;
            puzzle[i][j].y = 75*i;
        }
    }
       
    for(i = 0; i < puzzle.length; i++){
        for(j = 0; j < puzzle[i].length; j++){
            playground.drawImage(images[3],0,0,75,75,puzzle[i][j].x,puzzle[i][j].y,75,75);
            playground.drawImage(puzzle[i][j].image,0,0,75,75,puzzle[i][j].x,puzzle[i][j].y,75,75);
        }
    }
    playground.drawImage(endPipe.image,75,0,75,100,endPipe.x,endPipe.y,75,100);
    
    //náhodné otáčanie
    var i, j;
    for(i = 0; i < puzzle.length; i++){
        for(j = 0; j < puzzle[i].length; j++){
            var numberOfClicks = Math.floor((Math.random()*4)+1);
            counter = -numberOfClicks;
            for(l = 0; l < numberOfClicks; l++){
                randomInitRotation(25+(75*j),10+(75*i));
            }
            //console.log("Otočil "+i+" "+j+" ; "+numberOfClicks+"x");
        }
    }
}

function randomInitRotation(x,y){
        xOffset = 20;
        
        if(x > xOffset && x < 640-xOffset && y > yOffset && y < (75*(puzzle.length+1))){
            x = x - xOffset;
            var j = Math.floor(x/75);
            var i = Math.floor(y/75);
            puzzle[i][j].angle += 90;
            if(puzzle[i][j].type == 0){
                if(puzzle[i][j].angle == 360){
                    puzzle[i][j].angle = 0;
                }
            }
            else if(puzzle[i][j].type == 1){
                if(puzzle[i][j].angle == 180){
                    puzzle[i][j].angle = 0;
                }
            }
            rotatePipe(puzzle[i][j]);
            puzzle[i][j].rotate();
            puzzle[i][j].lookForConnection();
            countMoves();            
        }
}

function rotatePipe(pipe){
    playground.fillStyle = "#C0C0C0";
    playground.save();
    playground.clearRect(pipe.x,pipe.y,75,75);
    playground.fillRect(pipe.x,pipe.y,75,75);
    playground.drawImage(images[3],0,0,75,75,pipe.x,pipe.y,75,75);
    playground.translate(pipe.x,pipe.y);
    playground.translate(37.5,37,5);
    playground.rotate(pipe.angle*Math.PI/180);
    playground.drawImage(pipe.image,0,0,75,75,-37.5,-37.5,75,75);
    playground.restore();
}

function startTimer(){
    timer = setInterval(drawTime,1000);
}

function drawTime(){
    if(time == 0){
        clearInterval(timer);
        startFlow();
        return;
    }
    controll.clearRect(135,48,((470/60)*time),44);
    controll.drawImage(images[4],0,75,100,50,120,45,500,50);
    time--;
    controll.fillStyle = "#3DF5A5";
    controll.fillRect(135,48,((470/60)*time),44);
    controll.fillStyle = "black";
    controll.fillText(time,240+120,75);
}

function countMoves(){
    counter++;
    controll.clearRect(120+controll.measureText(pocetTxt).width,5,controll.measureText(counter).width+10,20);
    controll.fillStyle = "#C0C0C0";
    controll.fillRect(120+controll.measureText(pocetTxt).width,5,controll.measureText(counter).width+10,20);
    controll.fillStyle = "black";
    controll.font = "bold 20px arial";
    controll.fillText(counter,120+controll.measureText(pocetTxt).width,25);
}

function startFlow(){
    var currentPipe, previousPipe, nextPipe;
    var tempArray;
    clearInterval(timer);
    banInteraction();
    if(startPipe.connected1 != null){
        currentPipe = startPipe.connected1;
        previousPipe = startPipe;
        while(true){
            console.log(currentPipe.row+", "+currentPipe.column);
            if(currentPipe.getNext(previousPipe) != null){
                tempArray = [previousPipe.row,previousPipe.column,currentPipe.getNext(previousPipe).row,currentPipe.getNext(previousPipe).column,currentPipe];
                animationArray.push(tempArray);
                if(currentPipe.getNext(previousPipe).row == endPipe.row && currentPipe.getNext(previousPipe).column == endPipe.column){
                    animateFlow(animationArray[0][0],animationArray[0][1],animationArray[0][2],animationArray[0][3],animationArray[0][4]);
                    result = 0;
                    calculateScore();
                    console.log("Vyhral si!");
                    return;
                }
                nextPipe = currentPipe.getNext(previousPipe);
                previousPipe = currentPipe;
                currentPipe = nextPipe;
                nextPipe = null;
            }
            else{
                tempArray = [previousPipe.row,previousPipe.column,-2,-2,currentPipe];
                animationArray.push(tempArray);
                animateFlow(animationArray[0][0],animationArray[0][1],animationArray[0][2],animationArray[0][3],animationArray[0][4]);
                result = 1;
                console.log("Prehral si!");
                return;
            }
        }
    }
    else {
        result = 1;
        console.log("Prehral si!");
        endScreen();
    }

}

function animateFlow(fromRow, fromColumn, toRow, toColumn, pipe){
    var scaleX=1, scaleY=1, flowAngle=0;
    if(pipe == null){
        console.log("Koniec animácie");
        return;
    }
    if(pipe.type == 0){
        if(pipe.angle == 0){
            if(toRow == -2 && toColumn == -2 && fromRow == pipe.row && fromColumn > pipe.column){
                scaleX = 1;
                scaleY = -1;
                flowAngle = 90;
            }
            else if(fromRow == pipe.row && fromColumn > pipe.column && toRow < pipe.row && toColumn == pipe.column){
                scaleX = 1;
                scaleY = -1;
                flowAngle = 90;
            }
        }
        else if(pipe.angle == 90){
            if(toRow == -2 && toColumn == -2 && fromRow > pipe.row && fromColumn == pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = -90;
            }
            else if(fromRow > pipe.row && fromColumn == pipe.column && toRow == pipe.row && toColumn > pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = -90;
            }
        }
        else if(pipe.angle == 180){
            if(toRow == -2 && toColumn == -2 && fromRow == pipe.row && fromColumn < pipe.column){
                scaleX = 1;
                scaleY = -1;
                flowAngle = 90;
            }
            else if(fromRow == pipe.row && fromColumn < pipe.column && toRow > pipe.row && toColumn == pipe.column){
                scaleX = 1;
                scaleY = -1;
                flowAngle = 90;
            }
        }
        else if(pipe.angle == 270){
            if(toRow == -2 && toColumn == -2 && fromRow < pipe.row && fromColumn == pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = -90;
            }
            else if(fromRow < pipe.row && fromColumn == pipe.column && toRow == pipe.row && toColumn < pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = -90;
            }
        }
    }
    else if(pipe.type == 1){
        if(pipe.angle == 0){
            if(toRow == -2 && toColumn == -2 && fromRow == pipe.row && fromColumn > pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = 0;
            }
            else if(fromRow == pipe.row && fromColumn > pipe.column && toRow == pipe.row && toColumn < pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = 0;
            }
        }
        else if(pipe.angle == 90){
            if(toRow == -2 && toColumn == -2 && fromRow > pipe.row && fromColumn == pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = 0;
            }
            else if(fromRow > pipe.row && fromColumn == pipe.column && toRow < pipe.row && toColumn == pipe.column){
                scaleX = -1;
                scaleY = 1;
                flowAngle = 0;
            }
        }
    }
    
    var animation, frame=0;
    animation = setInterval(function(){
        if(frame == 13){
            clearInterval(animation);
            animationArray.shift();
            if(animationArray.length != 0){
                animateFlow(animationArray[0][0],animationArray[0][1],animationArray[0][2],animationArray[0][3],animationArray[0][4]);
            }
            else {
                setTimeout(endScreen,500);
            }
            return;
        }
        playground.fillStyle = "#C0C0C0";
        playground.save();
        playground.clearRect(pipe.x,pipe.y,75,75);
        playground.fillRect(pipe.x,pipe.y,75,75);
        playground.drawImage(images[3],0,0,75,75,pipe.x,pipe.y,75,75);
        playground.translate(pipe.x,pipe.y);
        playground.translate(37.5,37,5);
        playground.rotate(pipe.angle*Math.PI/180);
        playground.scale(scaleX,scaleY);
        playground.rotate(flowAngle*Math.PI/180);
        playground.drawImage(pipe.image,0,(75*frame),75,75,-37.5,-37.5,75,75);
        playground.restore();
        frame++;
    
    },66.66);
}

function banInteraction(){
    playCanvas.removeEventListener("mousemove",pipeHover);
    playCanvas.removeEventListener("mouseout",pipeOut);
    playCanvas.removeEventListener("click",pipeClick);
    controlCanvas.removeEventListener("click",valveClick);
}

function calculateScore(){
    if(time == 0) time = 1;
    var newScore = (100-counter)*time;
    if(newScore < 0) newScore = 0;
    if(scoreObject.top.length == 0){
        scoreObject.top.push(newScore);
    }
    else{
        scoreObject.top.sort(function(a,b){return b-a;});
        scoreObject.top.push(newScore);
        scoreObject.top.sort(function(a,b){return b-a;});
        if(scoreObject.top.length > 10){
            scoreObject.top.splice(scoreObject.top.length-1,1);
        }
    }
    scoreObject.latest.push([scoreObject.gameNumber,newScore]);
    scoreObject.gameNumber++;
    if(scoreObject.latest.length > 20){
        scoreObject.latest.splice(0,1);
    }
    score += newScore;
    scoreObject.actual = score;
    localStorage.setItem("milanPlumberScore",JSON.stringify(scoreObject));
}

function endScreen(){
    controll.fillStyle = "rgba(0,0,0,0.7)";
    controll.fillRect(0,0,640,100);
    playground.fillStyle = "rgba(0,0,0,0.7)";
    playground.fillRect(0,0,640,460);
    playground.fillStyle = "#00EEFF";
    xOffset = 132.5;
    playground.fillRect(132.5,0,375,322);
    playground.fillStyle = "black";
    playground.font = "bold 20px arial";
    var scoreTxt;
    if(result == 0){
        playground.fillText("Gratulujem k víťaztvu! :)",((375-playground.measureText("Gratulujem k víťaztvu! :)").width)/2)+xOffset,45);
        scoreTxt = "Tvoje nové skóre je: ";
    }
    else if(result == 1){
        playground.fillText("Aah škoda. Prehral si. :(",((375-playground.measureText("Aah škoda. Prehral si. :(").width)/2)+xOffset,45);
        scoreTxt = "Tvoje doterajšie skóre: ";
    }
    playground.fillText(scoreTxt,((375-playground.measureText(scoreTxt).width)/2)+xOffset,85);
    playground.font = "bold 30px arial";
    playground.fillText(score,((375-playground.measureText(score).width)/2)+xOffset,135);
    
    var levelButton;
    if(result == 0){
        levelButton = 3*153;
    }
    else if(result == 1){
        levelButton = 153;
    }
    playground.drawImage(images[5],levelButton,0,153,56,((375-153)/2)+xOffset,165,153,56);
    playground.drawImage(images[5],2*153,0,153,56,((375-153)/2)+xOffset,165+15+56,153,56);
    
    var clickEvent, hoverEvent;
    
    playCanvas.addEventListener('mousemove',hoverEvent = function(event){
            var ex = event.pageX;
            var ey = event.pageY;
            
            if(ex > 243.5 && ex < 243.5+153 && ey > 165+100 && ey < 165+56+100){
                playground.drawImage(images[5],levelButton,56,153,56,((375-153)/2)+xOffset,165,153,56);
            }
            else if(ex > 243.5 && ex < 243.5+153 && ey > 165+15+56+100 && ey < 165+15+56+56+100){
                playground.drawImage(images[5],2*153,56,153,56,((375-153)/2)+xOffset,165+15+56,153,56);
            }
            else {
                playground.drawImage(images[5],levelButton,0,153,56,((375-153)/2)+xOffset,165,153,56);
                playground.drawImage(images[5],2*153,0,153,56,((375-153)/2)+xOffset,165+15+56,153,56);
            }
    },false);
    
    playCanvas.addEventListener('click',clickEvent = function(event){
            var ex = event.pageX;
            var ey = event.pageY;
            
            if(ex > 243.5 && ex < 243.5+153 && ey > 165+100 && ey < 165+56+100){
                playCanvas.removeEventListener("mousemove",hoverEvent);
                playCanvas.removeEventListener("click",clickEvent);
                if(result == 0){
                    if(localStorage.getItem("milanPlumberScore") != undefined){
                        scoreObject = JSON.parse(localStorage.getItem("milanPlumberScore"));
                        score = scoreObject.actual;
                    }
                    var levelNumber;
                    while(true){
                        levelNumber = Math.floor(Math.random()*levels.length);
                        if(levelNumber != previousLevel){
                            previousLevel = levelNumber;
                            level = levels[levelNumber];
                            break;
                        }
                    }
                    createGame();
                }
                else if(result == 1){
                    createGame();
                }
            }
            else if(ex > 243.5 && ex < 243.5+153 && ey > 165+15+56+100 && ey < 165+15+56+56+100){
                playCanvas.removeEventListener("mousemove",hoverEvent);
                playCanvas.removeEventListener("click",clickEvent);
                window.location.replace("graph.html");
            }
    
    },false);

}
