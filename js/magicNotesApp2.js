
showNotes();

let clearHistoryBtn = document.getElementById('clrHistoryBtn');
clearHistoryBtn.addEventListener('click', function (e) {
    localStorage.clear();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(element => {
        element.remove();
    });
    let notesElm = document.getElementById('notes');
    if (notesElm.children.length == 4) {
        let h2 = document.createElement('h2');
        h2.innerText = 'Nothing to show here!';
        notesElm.lastElementChild.replaceWith(h2);
    }
});

let searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', function (e) {
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(element => {
        let cardText = element.getElementsByTagName('p')[0].innerText.toUpperCase();
        let cardTitle = element.getElementsByTagName('h4')[0].innerText.toUpperCase();
        console.log('mn');
        if (cardText.includes(searchBox.value.toUpperCase())) {
            element.style.display = "inline-block";
        }
        else if(cardTitle.includes(searchBox.value.toUpperCase())){
            element.style.display = "inline-block";
        }
        else {
            element.style.display = "none";
        }
    });
});

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';

    let addTitle = document.getElementById('note-title');
    let noteTitles = localStorage.getItem('noteTitles');
    if (noteTitles == null) {
        noteTitlesObj = [];
    }
    else {
        noteTitlesObj = JSON.parse(noteTitles);
    }
    if(addTitle.value!=''){
    noteTitlesObj.push(addTitle.value);
    }
    else{
        noteTitlesObj.push(`Note ${noteTitlesObj.length}`);
    }
    localStorage.setItem('noteTitles', JSON.stringify(noteTitlesObj));
    addTitle.value = '';

    showNotes();
})

function showNotes() {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let noteTitles = localStorage.getItem('noteTitles');
    if (noteTitles == null) {
        noteTitlesObj = [];
    }
    else {
        noteTitlesObj = JSON.parse(noteTitles);
    }

    let deletedNotesIndex = localStorage.getItem('deletedNotesIndex');
    if (deletedNotesIndex == null) {
        deletedNotesIndexObj = [];
    }
    else {
        deletedNotesIndexObj = JSON.parse(deletedNotesIndex);
    }
    let html = '';
    notesObj.forEach(function (element, index) {
        let bool = false;
        deletedNotesIndexObj.forEach(deletedNotesIndex => {
            if (index == deletedNotesIndex) {
                bool = true;
            }

        });
        if (bool == false) {
            html += `<div class="noteCard" id="">
        <div class="card-body">
                <h4 class="note-title">${noteTitlesObj[index]}</h4>
                <div class="txtNt">
                    <p class="textNote">${element}</p>
                </div>
                <button class="deleteBtn" id="${index}" onClick="deleteNote(this.id)">Delete</button>
        </div>
    </div>`;
        }
    });
    let notesElm = document.getElementById('notes');
    if (html.length != 0) {
        let notes = document.createElement('div');
        notes.innerHTML = html;
        notesElm.lastElementChild.replaceWith(notes);
    }
    else {
        let h2 = document.createElement('h2');
        h2.innerText = 'Nothing to show here!';
        notesElm.lastElementChild.replaceWith(h2);
    }
}

function deleteNote(id) {

    let deletedNotesIndex = localStorage.getItem('deletedNotesIndex');
    if (deletedNotesIndex == null) {
        deletedNotesIndexObj = [];
    }
    else {
        deletedNotesIndexObj = JSON.parse(deletedNotesIndex);
    }
    deletedNotesIndexObj.push(id);
    localStorage.setItem('deletedNotesIndex', JSON.stringify(deletedNotesIndexObj));

    showNotes();
}


