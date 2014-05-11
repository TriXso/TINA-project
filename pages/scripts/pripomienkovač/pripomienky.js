
function Note(text){
    this.text = text;
    this.timeStamp = new Date();
}


var reminder;
var newNote;
var notesDiv;
var notes;
var lastIndex = 0;


window.onload = function(){
    setReminder();
}

function setReminder(){
    reminder = document.getElementById("reminder"); //id kompletného bloku pre pripomienkovač
    newNote = document.getElementById("new_note"); //id texarea elementu pre nové pripomienky
    notesDiv = document.getElementById("notes"); //id bloku pre staré pripomienky
    
    newNote.addEventListener('keypress',function(event){
            if(event.keyCode == 13 && !event.shiftKey){
                createNote();
                event.preventDefault();
                newNote.value = null;
            }
    },false);
    
    loadNotes();
}

function loadNotes(){
    if(localStorage.getItem("milanReminder") != undefined){
        notes = JSON.parse(localStorage.getItem("milanReminder"));
    }
    else {
        notes = new Array();
        return;
    }
    for(i = 0; i < notes.length; i++){
        var noteDiv = document.createElement("div");
        noteDiv.setAttribute("id","note_"+i+"_"+lastIndex);
        noteDiv.setAttribute("class","note");
        var text = document.createElement("p");
        text.setAttribute("id","note_text");
        var time = document.createElement("p");
        time.setAttribute("id","note_time");
        var checkbox = document.createElement("input");
        checkbox.setAttribute("type","checkbox");
        checkbox.setAttribute("id","note_check");
        checkbox.setAttribute("onclick","checkNote("+lastIndex+")");
        text.innerHTML = notes[i].text;
        notes[i].timeStamp = new Date(notes[i].timeStamp);
        time.innerHTML = notes[i].timeStamp.getDate()+"."
                        +notes[i].timeStamp.getMonth()+1+"."
                        +notes[i].timeStamp.getFullYear()+" "
                        +notes[i].timeStamp.getHours()+":"
                        +("00".substring(0,2-(notes[i].timeStamp.getMinutes+"").length)+notes[i].timeStamp.getMinutes());
        noteDiv.appendChild(text);
        noteDiv.appendChild(time);
        noteDiv.appendChild(checkbox);
        notesDiv.appendChild(noteDiv);
        lastIndex++;
    }
}

function createNote(){
    var note = new Note(newNote.value);
    notes.push(note);
    var noteDiv = document.createElement("div");
    noteDiv.setAttribute("id","note_"+(notes.length-1)+"_"+lastIndex);
    noteDiv.setAttribute("class","note");
    var text = document.createElement("p");
    text.setAttribute("id","note_text");
    var time = document.createElement("p");
    time.setAttribute("id","note_time");
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id","note_check");
    checkbox.setAttribute("onclick","checkNote("+lastIndex+")");
    text.innerHTML = note.text;
    time.innerHTML = note.timeStamp.getDate()+"."
                        +note.timeStamp.getMonth()+1+"."
                        +note.timeStamp.getFullYear()+" "
                        +note.timeStamp.getHours()+":"
                        +("00".substring(0,2-(note.timeStamp.getMinutes+"").length)+note.timeStamp.getMinutes());
    noteDiv.appendChild(text);
    noteDiv.appendChild(time);
    noteDiv.appendChild(checkbox);
    notesDiv.appendChild(noteDiv);
    lastIndex++;
    localStorage.setItem("milanReminder",JSON.stringify(notes));
}

function checkNote(genIndex){
    setTimeout(function(){
        var idParts;
        for(i = 1; i < notesDiv.childNodes.length; i++){
            idParts = notesDiv.childNodes[i].id.split("_");
            if(genIndex == parseInt(idParts[2])){
                deleteNote(parseInt(idParts[1]));
                break;
            }
        }
    },1500);
}

function deleteNote(arrayIndex){
    notes.splice(arrayIndex,1);
    var i, idParts;
    for(i = 1 ; i < notesDiv.childNodes.length; i++){
        idParts = notesDiv.childNodes[i].id.split("_");
        if(parseInt(idParts[1]) == arrayIndex){
            notesDiv.removeChild(notesDiv.childNodes[i]);
            break;
        }
    }
    arrayIndex = i-1;
    for(i ; i < notesDiv.childNodes.length; i++){
        idParts = notesDiv.childNodes[i].id.split("_")
        notesDiv.childNodes[i].id = "note_"+arrayIndex+"_"+idParts[2];
        notesDiv.childNodes[i].childNodes[2].setAttribute("onclick","checkNote("+idParts[2]+")");
        arrayIndex++;
    }
    localStorage.setItem("milanReminder",JSON.stringify(notes));
}