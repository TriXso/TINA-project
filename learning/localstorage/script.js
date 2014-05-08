
function Ulozisko(){ //objekt ktorý chcem uložiť localStorage
    this.number = 0;
    this.date = null;
}

var lastVisitEl;
var visitEl;

window.onload = function(){
    lastVisitEl = document.getElementById("last_visit");
    visitEl = document.getElementById("visit");
    var mojeUlozisko;
    if(typeof(Storage)!=="undefined"){ //ošetrenie keby prehliadač nepodporoval localStorage
        if(localStorage.getItem("mojeUlozisko") != undefined){ //najprv zistím či je vôbec objekt typu Ulozisko v localStorage
            mojeUlozisko = JSON.parse(localStorage.getItem("mojeUlozisko")); //získenie objektu z localStorage
            mojeUlozisko.date = new Date(mojeUlozisko.date); //v mojeUlozisko.date je string predstavujuci dátum 
                                                             //a pre lepšiu prácu s ním si ho konvertujem na Date objekt
        }
        else{ //v prípade prvého prístupu si vytvorím nový objekt pre uložisko
            mojeUlozisko = new Ulozisko();
            mojeUlozisko.number = 1;
            mojeUlozisko.date = new Date();
        }
        
        lastVisitEl.innerHTML = mojeUlozisko.date.getDate() //poskladanie dátumu do chceného tvaru
        +"."+mojeUlozisko.date.getMonth()
        +"."+mojeUlozisko.date.getFullYear()
        +" o "+mojeUlozisko.date.getHours()
        +":"+mojeUlozisko.date.getMinutes();
        visitEl.innerHTML = mojeUlozisko.number + 1;
        
        mojeUlozisko.date = new Date(); //aktualizovanie dátumu
        mojeUlozisko.number += 1; //zvýšenie počtu návštev
        localStorage.setItem("mojeUlozisko",JSON.stringify(mojeUlozisko)); //uloženie objektu do localStorage
    }
    else{ //v prípade, že prehliadač nepodporuje localStorage, vypíše len jednu správu
        var body = document.getElementsByTagName("body")[0];
        for(i=0; i < body.childNodes.length; i++){
            body.removeChild(body.childNodes[body.childNodes.length - 1]);
        }
        var message = document.createElement("p");
        message.innerHTML = "LocalStorage nie je podporovaný vašim prehliadačom!";
        body.appendChild(message);
    }
}

/* localStorage vie ukladať len páry "meno:hodnota" pričom oba sú stringy. A však JSON má funckiu ktorou vie hocijaký objekt
premeniť na string ktorý už vie localStorage spracovať. Pri spätnom načítaní z localStorage použijem opäť JSON funkciu,
ktorou string premením na môj objekt. Pozor ak vnútri môj objektu mám ďalšie objekty (napr. Date) tie ostanú v string formáte.
V prípade vnorených objektov je dobré pre ich zachovanie konvertovať pomocou JSONa každý objekt samostatne a potom až použiť
stringify na celkový objekt.
*/


function reset(){ //vyresetovanie údajov v localStorage
    var mojeUlozisko = JSON.parse(localStorage.getItem("mojeUlozisko"));
    mojeUlozisko.date = new Date();
    mojeUlozisko.number = 0;
    localStorage.setItem("mojeUlozisko",JSON.stringify(mojeUlozisko));
    window.location.reload();
}