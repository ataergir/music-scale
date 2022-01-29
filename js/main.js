var allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
var letters = ["C", "D", "E", "F", "G", "A", "B", "C"];

//! Respect the syntax for these arrays: "data-scale" + Steps / Chords / Roman / Seventh !!!
var majorSteps = [0, 2, 2, 1, 2, 2, 2];
var minorSteps = [0, 2, 1, 2, 2, 1, 2];
var bluesSteps = [0, 3, 2, 1, 1, 3, 2];

var majorChords = ["maj","min","min","maj","maj","min","dim"];
var minorChords = ["min","dim","maj","min","min","maj","maj"];

var majorRoman = ["I","ii","iii","IV","V","vi","vii°"];
var minorRoman = ["i","ii°","III","iv","v","VI","VII"];

var majorSeventh = ["maj7","min7","min7","maj7","7","min7","ø7"];
var minorSeventh = ["min7","ø7","maj7","min7","min7","maj7","7"];

var fundNoteInput;
var pitchInput;
var scaleInput;
var steps;
var notesInScale = [];

var notesButtons = document.querySelectorAll(".note-btn");
var pitchButtons = document.querySelectorAll(".pitch-btn");
var scaleButtons = document.querySelectorAll(".scale-btn");

function getNote(d) {
    fundNoteInput = d.getAttribute("data-note");

    notesButtons.forEach(function(e){
        e.style.backgroundColor = "transparent"
        e.style.color = "black"
    });

    d.style.backgroundColor = "black";
    d.style.color = "white";
    getNoteInArray();
}
function getPitch(d) {
    pitchInput = d.getAttribute("data-pitch");

    pitchButtons.forEach(function(e){
        e.style.backgroundColor = "transparent"
        e.style.color = "black"
    });

    d.style.backgroundColor = "black";
    d.style.color = "white";

    getNoteInArray();
}

function getScale(d) {
    scaleInput = d.getAttribute("data-scale");
    /*
    if (scaleInput == "major"){
        steps = majorSteps;
    }else if (scaleInput == "minor"){
        steps = minorSteps;
    }
    */
    steps = eval(scaleInput + "Steps");

    scaleButtons.forEach(function(e){
        e.style.backgroundColor = "transparent"
        e.style.color = "black"
    });

    d.style.backgroundColor = "black";
    d.style.color = "white";
    getNoteInArray();
}

function getNoteInArray(){
    if(fundNoteInput !== undefined && pitchInput !== undefined && scaleInput !== undefined){
        if(pitchInput == "flat"){
            var index = allNotes.findIndex(findNote) - 1;
            if (index < 0){
                index = 11;
            }
        } else if (pitchInput == "natural"){
            var index = allNotes.findIndex(findNote);
        } else if (pitchInput == "sharp"){
            var index = allNotes.findIndex(findNote) + 1;
            if (index >= allNotes.length){
                index = 0;
            }
        }
        findNotesinScale(index);
    }
}

function findNote(note) {
    return note == fundNoteInput;
}

function findNotesinScale(index){
    for(var i = 0 ; i < steps.length ; i++){
        notesInScale[i] = allNotes[index + steps[i]];
        index += steps[i];
    }
    console.log("notes in scale: " + notesInScale);
    scaleToHTML(notesInScale);
}

var wrapper = document.querySelector(".main-wrapper");

var counter;
function scaleToHTML(notes){
    //clean previous scale
    while (wrapper.firstChild){
        wrapper.lastChild.remove();
    }
    console.log(notes);
    counter = 0;
    notes.forEach(note =>
        createDiv(note)
    );
}

var prevNote;
function createDiv(note){
    var noteWrapper = document.createElement("div");
    noteWrapper.classList.add("note-info");

    var noteLetter = document.createElement("div");
    noteLetter.classList.add("note-letter");

    var sharpFlat = document.createElement("div");
    sharpFlat.classList.add("sharp-flat");

    if(counter == 0 && note[1] == "#"){
        let letterIndex = letters.findIndex(findLetter);
        function findLetter(letter) {
            return letter == note[0];
        }
        noteLetter.textContent = letters[letterIndex + 1];
        sharpFlat.textContent = "♭";
        prevNote = letters[letterIndex + 1] + "♭";
    }
    else if(counter > 0 && note[0] == prevNote[0]){
        let letterIndex = letters.findIndex(findLetter);
        
        function findLetter(letter) {
            return letter == note[0];
        }

        noteLetter.textContent = letters[letterIndex + 1];
        sharpFlat.textContent = "♭";
        prevNote = letters[letterIndex + 1] + "♭";
    }
    else{
        noteLetter.textContent = note[0];
        sharpFlat.textContent = note[1];
        prevNote = note;
    }
    /////////////////////////////////////////////////////////////////////
    var majMin = document.createElement("div");
    majMin.classList.add("maj-min");
    /*
    if(scaleInput == "major"){
        chord = majorChords[counter];
    }else if(scaleInput == "minor"){
        chord = minorChords[counter];
    }
    */
    var chord = eval(scaleInput + "Chords" + `[${counter}]`);
    majMin.textContent = chord;

    /////////////////////////////////////////////////////////////////////
    var roman = document.createElement("div");
    roman.classList.add("roman-numeral");
    /*
    if(scaleInput == "major"){
        romanNum = majorRoman[counter];
    }else if(scaleInput == "minor"){
        romanNum = minorRoman[counter];
    }
    */
    var romanNum = eval(scaleInput + "Roman" + `[${counter}]`);
    roman.textContent = romanNum;
    
    /////////////////////////////////////////////////////////////////////
    var altern = document.createElement("div");
    altern.classList.add("alternative-note");
    /*
    if(scaleInput == "major"){
        seventhChord = majorSeventh[counter];
    }else if(scaleInput == "minor"){
        seventhChord= minorSeventh[counter];
    }
    */
    var seventhChord = eval(scaleInput + "Seventh" + `[${counter}]`);
    altern.textContent = seventhChord;
    /////////////////////////////////////////////////////////////////////

    counter++;
    noteWrapper.append(noteLetter, sharpFlat, majMin, roman, altern);
    noteWrapper.setAttribute("onclick", "changeCardColor(this)");
    wrapper.append(noteWrapper);
}

var invCounter = 0;
function invert(){
    var notesWrapper = document.querySelector(".main-wrapper");
    notesWrapper.classList.toggle("invert");

    var body = document.querySelector("body");
    body.classList.toggle("darkbg");

    var header = document.querySelector("header");
    header.classList.toggle("invert");

    var invertButton = document.querySelector(".invertButton");
    if (invCounter == 0){
        invertButton.textContent = "light";
        invCounter = 1;
    }else if (invCounter == 1){
        invertButton.textContent = "dark";
        invCounter = 0;
    }
    
}


function changeCardColor(d){
    d.classList.toggle("invert");
}