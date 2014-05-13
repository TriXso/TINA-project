
var breadcrumbs;
var crumbsDiv;

function loadBreadcrumbs(){ //divko do ktorého sa budu generovať omrvinky musí mať id "bcrumbs"
    crumbsDiv = document.getElementById("bcrumbs");
    
    if(localStorage.getItem("milanCrumbs") != undefined){
        breadcrumbs = JSON.parse(localStorage.getItem("milanCrumbs"));
    }
    else{
        breadcrumbs = new Array();
        breadcrumbs.push([document.title,location.pathname]);
    }
    if(breadcrumbs[breadcrumbs.length-1][0] != document.title){
        breadcrumbs.push([document.title,location.pathname]);
    }
    if(breadcrumbs.length > 5){
        breadcrumbs.splice(0,breadcrumbs.length-5);
    }
    
    var crumbsTxt = "";
    for(i = 0; i < breadcrumbs.length; i++){
        crumbsTxt += "<a href='"+breadcrumbs[i][1]+"'>"+breadcrumbs[i][0]+"</a>";
        if(i != breadcrumbs.length-1){
            crumbsTxt += "&#160;>&#160;";
        }
    }
    crumbsDiv.innerHTML = crumbsTxt;
    localStorage.setItem("milanCrumbs",JSON.stringify(breadcrumbs));
}