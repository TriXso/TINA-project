
function Obdlznik(x,y,width,height) { //Zadefinovanie vlastného objektu spolu s konštruktorom (ten môže byť aj prázdny)
    this.x = x;                       //Nastavenie hodnôt objektu. Prefix "this" služi na identifikáciu atributu patriaci k objektu
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvas = null;
}

Obdlznik.prototype.move = function(){  //Efektívne zadefinovanie metódy objektu. Dalo by sa to vpísať aj do vnútra objektu a však 
    this.canvas.clearRect(this.x,this.y,this.width,this.height); //neodporuča sa to kvôli šetreniu pamäte.
    this.x = rand(0,(640-this.width)); //Opäť prefix "this" používame pri práci s atribútami objektu
    this.y = rand(0,(480-this.height));
    this.draw(this.x,this.y);
}

Obdlznik.prototype.draw = function(x,y){
    this.canvas.fillStyle = "rgb("+rand(0,255)+","+rand(0,255)+","+rand(0,255)+")";
    this.canvas.fillRect(x,y,this.width,this.height);
}


window.onload = function(){
    var canvas = document.getElementById("my_canvas");
    var context = canvas.getContext("2d");
    var tvar = new Obdlznik(320,240,30,30); //vytvorenie nami definovaného objektu
    tvar.canvas = context;
    tvar.draw(tvar.x,tvar.y);
    canvas.addEventListener('click', function(event){ //pridanie reakcie na klinutie pre celý canvas
        var ex = event.pageX;
        var ey = event.pageY;
        
        if(ey > tvar.y && ey < (tvar.y + tvar.height) && ex > tvar.x && ex < (tvar.x + tvar.width)){ //ošetrenie klinutia len na náš objekt
            tvar.move();
        }
    
    },false);
}


function rand(start, end){
    return Math.floor((Math.random() * end)+start);
}