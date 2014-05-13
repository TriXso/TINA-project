
//je potreba aby divka do ktorých má renderovať text mali id "last_visit" a "visit_number"


function setVisit(){ //táto funkcia musí byť v window.onload;
    var visit = {
        lastVisit: new Date(),
        numberOfVisits: 1
    };

    if(localStorage.getItem("milanVisits") != undefined){
        visit = JSON.parse(localStorage.getItem("milanVisits"));
        visit.lastVisit = new Date(visit.lastVisit);
    }
    
    document.getElementById("last_visit").innerHTML = "Posledný krát si tu bol "+
                                                    visit.lastVisit.getDate()+"."+
                                                    visit.lastVisit.getMonth()+"."+
                                                    visit.lastVisit.getFullYear()+" o "+
                                                    ("00".substring(0,"00".length-(visit.lastVisit.getHours()+"").length)+visit.lastVisit.getHours())+":"+
                                                    ("00".substring(0,"00".length-(visit.lastVisit.getMinutes()+"").length)+visit.lastVisit.getMinutes());
    var text;
    if(visit.numberOfVisits <= 10){
        text = "A si tu ešte len ";
    }
    else if(visit.numberOfVisits > 10){
        text = "A si tu už ";
    }
    document.getElementById("visit_number").innerHTML = text+visit.numberOfVisits+". krát.";
    
    visit.numberOfVisits++;
    visit.lastVisit = new Date();
    localStorage.setItem("milanVisits",JSON.stringify(visit));
}