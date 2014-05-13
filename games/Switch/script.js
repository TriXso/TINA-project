var array = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var clicks=40;
var game=0;
var cas;
var nick;
var score=[[]];
var topArray=[[]];

var plot;
var poradieHry=0;
//este treba osetrit web worker a localStorage

////////////////////////////////////////////////////Start hry////////////////////////////////////////////////////////////////////////////////
//localStorage.removeItem("martinScore");

function start(){
highScore()
nick = document.getElementById("nick").value;
document.getElementById("oknoUvod").style.display="none";
for (var i=0; i<8 ;i++){
var pos = Math.floor(Math.random() * 15)
changeImage(pos)
}
tlac();
game="1";
worker.postMessage(" ");

worker.onmessage = function (e){
	cas = e.data.seconds_left;
	document.getElementById("cas").innerHTML = cas;
	if (cas == 0){document.getElementById("oknoKoniec").style.display="block";
			worker.terminate()
			return} 
	}
}

/////////////////////////////////////////////////////////////Vykreslenie plochy///////////////////////////////////////////////////////////////////

function tlac(){
	for (var i = 0; i <= 15; i++){
		var id = "P" + i;
			if (array[i] == "1")
				document.getElementById(id).src = "img/on2.png";
			if (array[i] == "0")
				document.getElementById(id).src = "img/off2.png";
								}
				}

				
				
///////////////////////////////////////////////////////////////////Zmena spinacov/////////////////////////////////////////////////////////////////////////////////				

function changeImage(id) {
if (game=="1"){
   var clicked = document.getElementById(id);   
   var i=clicked.id.substring(1);}
   else {
   var i=id;
   }
   
   array[i]=(array[i]+1)%2;
   var h = parseInt(i)-4;
   var d = parseInt(i)+4;
   var p = parseInt(i)+1;
   var l = parseInt(i)-1;
   
   if (i=="0"){
   array[p]=(array[p]+1)%2;
   array[d]=(array[d]+1)%2;}
   else
   if (i=="3"){
   array[l]=(array[l]+1)%2;
   array[d]=(array[d]+1)%2;
   }
   else
   if (i=="15"){
   array[l]=(array[l]+1)%2;
   array[h]=(array[h]+1)%2;
   }
   else
   if (i=="12"){
   array[p]=(array[p]+1)%2;
   array[h]=(array[h]+1)%2;
   }
   else
   if (i=="1" || i=="2"){
   array[p]=(array[p]+1)%2;
   array[l]=(array[l]+1)%2;
   array[d]=(array[d]+1)%2;}
   else
   if (i=="7" || i=="11"){
   array[d]=(array[d]+1)%2;
   array[h]=(array[h]+1)%2;
   array[l]=(array[l]+1)%2;}
   else
   if (i=="4" || i=="8"){
   array[p]=(array[p]+1)%2;
   array[h]=(array[h]+1)%2;
   array[d]=(array[d]+1)%2;}
   else
   if (i=="13" || i=="14"){
   array[h]=(array[h]+1)%2;
   array[p]=(array[p]+1)%2;
   array[l]=(array[l]+1)%2;}
   else
   {
   array[h]=(array[h]+1)%2;
   array[d]=(array[d]+1)%2;
   array[p]=(array[p]+1)%2;
   array[l]=(array[l]+1)%2;
   }
   
   if (game=="1"){
   tlac()
   clicks--;
   document.getElementById("score").innerHTML = clicks;
		if (clicks == 0){
			document.getElementById("oknoKoniec").style.display="block";
			worker.terminate()
			return}
   check()
   }
   }
   
   
 /////////////////////////////////////////////////////////Kontrola vyhry///////////////////////////////////////////////////////////////////  
 
function check(){
var count=0;
   for (var i=array.length; i--;) {
     count+=array[i];
   }
if (count==array.length){
worker.terminate();
var points=parseInt(clicks)+parseInt(cas)
document.getElementById("vypis").innerHTML = nick + " tvoje skóre je: " +points;


for (var i=0;i<score.length;i++){
if (score[i][0]==nick)
poradieHry++}
if (score!=0)
var j=score.length
else
var j=0;
score[j] = new Array(3)
score[j][0]=nick;
score[j][1]=points;
score[j][2]=poradieHry;
localStorage.setItem("martinScore",JSON.stringify(score));

document.getElementById("oknoSkore").style.display="block";
highScore()
}
}   

//////////////////////////////////////////////////////////Skore//////////////////////////////////////////////////////////////////////////////

function highScore(){//vykresluje tabulku pre Top 10 High score
var j=0;
if(localStorage.getItem("martinScore") != undefined){
	score=(JSON.parse(localStorage.getItem("martinScore")));
	topArray=score;
	topArray.sort(function(a,b) {
				return b[1]-a[1];})
		}
		else{
		topArray[0][0]="PC"
		topArray[0][1]="0"
		}
		
for (i=0;i<10 && i<(topArray.length);i++){
		var n="n"+i;
		var s="s"+i;
			document.getElementById(n).innerHTML = topArray[i][0];
			document.getElementById(s).innerHTML = topArray[i][1];
}


}
/////////////////////////////////////////////////////////////////////Graf///////////////////////////////////////////////////////////////////

function graf(){//vykresluje graf pre daneho hraca
var osobneScore=[];
document.getElementById("oknoGraf").style.display="block";
score.sort(function(a,b) {
				return a[2]-b[2];})
for (var i=0;i<score.length;i++){
if (score[i][0]==nick)
osobneScore.push(score[i][1]);
}

plot = $.jqplot ('graf', [osobneScore],{
seriesColors:['#FFFF00'],
		seriesDefaults: {showMarker:true},
grid: {
    drawGridLines: true,        // wether to draw lines across the grid or not.
        gridLineColor: '#cccccc',   // CSS color spec of the grid lines.
        background: '#181818',      // CSS color spec for background color of grid.
        borderColor: '#999999'},		
			axes: {					
				 xaxis: {
					label: "Hra",
					},
				yaxis: {
					labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
					label: "Skóre",
					},
				
				
					},
			cursor: {show: true,
								showTooltip:true
								},
});		


}

/////////////////////////////////////////////////////////////Pomocne funkcie////////////////////////////////////////////////////////////////
function kontrola(id){
var meno=id.value;

if (meno!=""){
document.getElementById('tlacidloZacni').disabled = false;
document.getElementById('tlacidloZacni').style.color = "yellow";
}
else{	
document.getElementById('tlacidloZacni').disabled = true;
document.getElementById('tlacidloZacni').style.color = "gray";
}
}
if(typeof(worker) == "undefined"){//web worker na vypocet casu
	worker = new Worker("work.js");
}
function back(){
document.getElementById("oknoGraf").style.display="none";
}

function restart(){
location.reload()
}
  
  

