
window.onload = function(){
    if(localStorage.getItem("milanPlumberScore") != undefined){
        scoreObject = JSON.parse(localStorage.getItem("milanPlumberScore"));
    }
    else{
        document.getElementById("graph_frame").innerHTML = "Nemáte uložené žiadne skóre!<br>Musíte vyhrať aspoň jednu hru<br>aby sa Vám ukladalo skóre.<br><br>"+
        "<button id='button' onclick='toGame()'>Späť do hry</button>";
        return;
    }
    options = {
        series: {
            lines: {show:true},
            points: {show:true},
            shadowSize:0
        },
        yaxis: {
            tickDecimals: 0
        },
        xaxis: {
            tickDecimals: 0
        },
        selection: {
            mode:"xy"
        },
        grid: {
            backgroundColor:"#FFFFFF"
        }
    };
    var series = {
        color:"#2EA8FF",
        data:[[]]
    };
    for(i=0;i<scoreObject.latest.length;i++){
        series.data.push(scoreObject.latest[i])
    }
    
    var plot = $.plot("#graph", [series], options);
    
    document.getElementById("overall").innerHTML = "Celkové skóre: "+scoreObject.actual;
    for(i=0;i<scoreObject.top.length;i++){
        document.getElementById(i+"").innerHTML = scoreObject.top[i]+"";
    }
}

function toGame(){
    window.location.replace("game.html");
}
