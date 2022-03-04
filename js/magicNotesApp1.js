let h2 = document.getElementsByTagName('h2')[0];
        h2.innerText = 'Nothing to show here!';

let clearHistoryBtn = document.getElementById('clrHistoryBtn');
clearHistoryBtn.addEventListener('click', function (e) {
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(element => {
        element.remove();
    });
    let notesElm = document.getElementById('notes');
    if (notesElm.children.length == 3) {
        let h2 = document.createElement('h2');
        h2.innerText = 'Nothing to show here!';
        notesElm.appendChild(h2);
    }
});

let searchBox = document.getElementById('searchBox');
searchBox.addEventListener('input', function (e) {
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(element => {
        let cardText = element.getElementsByTagName('p')[0].innerText;
        if (cardText.includes(searchBox.value)) {
            element.style.display = "inline-block";
        }
        else {
            element.style.display = "none";
        }
    });
});


let id = 0;
let textArea = document.getElementById('addTxt');
let addBtn = document.getElementById('addBtn');
let notes = document.getElementById('notes');

addBtn.addEventListener('click', function () {
    id++;
    let card = document.createElement('div');
    card.setAttribute('class', 'noteCard');
    card.setAttribute('id', id);
    card.innerHTML =
        `<div class="card-body">
            <h4 class="card-title">Note ${id}</h4>
            <div class="txtNt">
                <p class="textNote">${textArea.value}</p>
            </div>
            <button class="deleteBtn" id="deleteBtn${id}">Delete</button>
        </div>`;

    let noteCardLength = document.getElementsByClassName('noteCard').length;
    console.log(noteCardLength);
    if (noteCardLength < 1) {
        document.getElementsByTagName('h2')[0].remove();
    }
    notes.appendChild(card);
    textArea.value = null;

    let deleteBtn = document.getElementById(`deleteBtn${id}`);
    deleteBtn.addEventListener('click', function (e) {
        e.target.parentNode.parentNode.remove();
        let notesElm = document.getElementById('notes');
        if (notesElm.children.length == 3) {
            let h2 = document.createElement('h2');
            h2.innerText = 'Nothing to show here!';
            notesElm.appendChild(h2);
        }
    })
});