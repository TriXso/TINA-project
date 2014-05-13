var kalendar;
var searchedBy;


function showMeniny(elementID){ //táto funkcia sa sa musí volať v window.onload; elemntID je id elementu pre vypisovanie menín;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET","scripts/meniny/meniny.xml",false);
    xmlhttp.send();
    xmlDoc=xmlhttp.responseXML;
    element = document.getElementById(elementID);
    var pad = "00";
    var month = (new Date().getMonth()+1)+"";
    var day = (new Date().getDate())+"";
    today = (pad.substring(0,pad.length-month.length)+month)+(pad.substring(0,pad.length-day.length)+day);
    var name;
    
    kalendar = xmlDoc.getElementsByTagName("zaznam");
    for(i = 0; i < kalendar.length; i++){
        if(kalendar[i].childNodes[1].nodeName == "den"){
            if(kalendar[i].childNodes[1].childNodes[0].nodeValue == today){
                for(j = 2; j < kalendar[i].childNodes.length; j++){
                    if(kalendar[i].childNodes[j].nodeName == "SK"){
                        name = kalendar[i].childNodes[j].childNodes[0].nodeValue;
                        element.innerHTML = day+"."+month+"."+(new Date().getFullYear())+"&#160;&#160;Meniny má dnes "+name+".";
                        return;
                    }
                }
            }
        }
    }
}

function checkMeninySearch(elementID){
    element = document.getElementById(elementID);
    var datePattern = /^\d{1,2}\.\d{1,2}\./g;
    var namePattern = /\w{3,}/g;
    removeTooltip();
    if(datePattern.test(element.value)){
        searchedBy = 0;
    }
    else if(namePattern.test(element.value)){
        searchedBy = 1;
    }
    else {
        showTooltip(element.parentNode);
    }

}

function searchMeniny(valueElementID, writeElementID){
    removeTooltip();
    if(searchedBy == 0){
        searchMeninyByDate(document.getElementById(writeElementID),document.getElementById(valueElementID).value);
    }
    else if(searchedBy == 1){
        searchMeninyByName(document.getElementById(writeElementID),document.getElementById(valueElementID).value);
    }
    else{
        showTooltip(document.getElementById(valueElementID).parentNode);
    }
}

function searchMeninyByDate(writeTo,value){
    var pad = "00";
    var dateParts = value.split(".");
    var day = dateParts[0];
    var month = dateParts[1];
    searchedDay = (pad.substring(0,pad.length-month.length)+month)+(pad.substring(0,pad.length-day.length)+day);
    
    for(i = 0; i < kalendar.length; i++){
        if(kalendar[i].childNodes[1].nodeName == "den"){
            if(kalendar[i].childNodes[1].childNodes[0].nodeValue == searchedDay){
                for(j = 2; j < kalendar[i].childNodes.length; j++){
                    if(kalendar[i].childNodes[j].nodeName == "SK"){
                        var name = kalendar[i].childNodes[j].childNodes[0].nodeValue;
                        writeTo.innerHTML = "Dňa "+day+"."+month+". má meniny "+name+".";
                        return;
                    }
                }
            }
        }
    }
}

function searchMeninyByName(writeTo,value){
    var name = value.latinise().toLowerCase();
    
    for(i = 0; i < kalendar.length; i++){
        for(j = 0; j < kalendar[i].childNodes.length; j++){
            if(kalendar[i].childNodes[j].nodeName == "SK"){
                var names = kalendar[i].childNodes[j].childNodes[0].nodeValue.latinise().toLowerCase().split(", ");
                for(l = 0; l < names.length; l++){
                    if(names[l] == name){
                        var day = kalendar[i].childNodes[1].childNodes[0].nodeValue.substr(2,2);
                        var month = kalendar[i].childNodes[1].childNodes[0].nodeValue.substr(0,2);
                        names = kalendar[i].childNodes[j].childNodes[0].nodeValue.split(", ");
                        name = names[l];
                        writeTo.innerHTML = name+" má meniny dňa "+day+"."+month+".";
                        return;
                    }
                }
            }
        }
    }
}

function showTooltip(parent){
    var tooltip = document.createElement("div");
    tooltip.setAttribute("id","tooltip");
    var text = document.createElement("p");
    text.setAttribute("id","tooltip_text");
    text.innerHTML = "Ak vkladáte dátum musí mať tvar DD.MM. !";
    tooltip.appendChild(text);
    parent.appendChild(tooltip);
    var time = setTimeout(removeTooltip,3500);
};

function removeTooltip(){
    tooltip = document.getElementById("tooltip");
    if(tooltip != undefined){
        children = tooltip.parentNode.childNodes;
        for(i = 0; i < children.length; i++){
            if(children[i].id == "tooltip"){
                tooltip.parentNode.removeChild(children[i]);
            }
        }
    }
}
