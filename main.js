// Entfernt alle Event-Listener, die mit '.data-api' verknüpft sind, um Doppelbindungen zu vermeiden
$(document).off('.data-api')

// Funktion zur Behandlung des Formular-Submit-Events
function formHandler(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite beim Absenden des Formulars
    // Sammelt die Werte aus dem Formular
    let name = document.getElementById("name").value;
    let color = document.querySelector('select[name="color"]').value
    let notags = document.getElementById("none").checked;
    let tagU = document.getElementById("urgend").checked;
    let tagI = document.getElementById("important").checked;
    let start = document.getElementById("from").value
    let end = document.getElementById("too").value

    // Überprüft, ob der Name eingegeben wurde
    if (!name){
        alert("please name your Task")
        return;
    }
    // Überprüft, ob eine Farbe ausgewählt wurde
    if (!color){
        alert("please select a color")
        return;
    }
    // Überprüft, ob mindestens eine Tag-Option ausgewählt wurde
    if (notags == false && tagU == false && tagI == false){
        console.log("no checkmark");
        alert("please choose at least one tag option");
        return;
    }

    // Fügt die Aufgabe hinzu und setzt das Formular zurück
    addTaskFunk(name, color, notags, tagU, tagI, start, end);
    document.getElementById('taskForm').reset();
    noNeew();
}

// Bindet die formHandler-Funktion an das Submit-Event des Formulars
const form = document.getElementById("taskForm");
form.addEventListener("submit", formHandler);

// Funktion zum Hinzufügen einer neuen Aufgabe
function addTaskFunk(name, color, notags, tagU, tagI, start, end){
    let container = document.getElementById("madeTasks");
    let entry = document.createElement('div');
    entry.className = "addedTask";
    const uniqueId = Date.now(); // Generiert eine eindeutige ID für jede Aufgabe
    entry.setAttribute('data-id', uniqueId);

    // Erstellt die Markierungen für die Tags
    let checkedtag = "";
    if(tagU == true){
        checkedtag = "&#10710;";
    }
    if(tagI == true){
        checkedtag = checkedtag + " &#8252;";
    }
    // Setzt den HTML-Inhalt für die neue Aufgabe
    entry.innerHTML = `
    <div class="wholeTask">
        <div class="TaskBody">
            <div class="TaskName">
                <input type="checkbox" onclick="prozentding()" name="done" id="done">${name}
            </div>
            <div class="taskTag">
            <p>${checkedtag}</p>
            </div>
        </div>
        <img src="trash.svg" id="delete" name="delete"  onclick="deleteT(this);" >
        <img src="pencil.svg" id="edit" name="edit"  onclick="editT(${uniqueId});">
    </div>
    `
    container.appendChild(entry);
    prozentding();
    oldTask(); // Schließt das Pop-up nach dem Hinzufügen eines Tasks
}

// Funktion zum Bearbeiten einer Aufgabe
function editT(taskId){
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    const taskName = taskElement.querySelector('.TaskName input[type="checkbox"]').nextSibling.nodeValue.trim();
    taskElement.querySelector('.TaskName').innerHTML = `<input type="text" value="${taskName}" id="editName${taskId}">`;
    taskElement.querySelector('[name="edit"]').src = "save.svg";
    taskElement.querySelector('[name="edit"]').setAttribute('onclick', `saveT(${taskId});`);
}

// Funktion zum Speichern der bearbeiteten Aufgabe
function saveT(taskId){
    const taskElement = document.querySelector(`[data-id="${taskId}"]`);
    const editedName = taskElement.querySelector(`#editName${taskId}`).value;
    taskElement.querySelector('.TaskName').innerHTML = `<input type="checkbox" onclick="prozentding()" name="done" id="done">${editedName}`;
    taskElement.querySelector('[name="edit"]').src = "pencil.svg"; // Wechselt das Icon zurück zu "pencil.svg"
    taskElement.querySelector('[name="edit"]').setAttribute('onclick', `editT(${taskId});`);
}

// Funktionen zum Anzeigen und Verbergen des Formulars für neue Aufgaben
function newTask(){
    document.getElementById("ontop").style.display = "block";
    document.getElementById("add").style.display = "block";
}

function oldTask(){
    document.getElementById("ontop").style.display = "none";
    document.getElementById("add").style.display = "none";
}

// Funktion zur Aktualisierung des Fortschritts basierend auf erledigten Aufgaben
function prozentding(){
    const allecheck = document.querySelectorAll('#done');
    const totalcheck = allecheck.length;
    const donecheck = Array.from(allecheck).filter(checkbox => checkbox.checked).length;
    document.getElementById('erledigt').textContent= `Progress: ${donecheck} / ${totalcheck}`;
}

// Funktion zum Löschen einer Aufgabe
function deleteT(el){
    let rlyDelete = confirm("do you really want to delete this task?")
    if (rlyDelete == true){
        let parentDiv = el.closest('.wholeTask');
        parentDiv.remove();
    }
}

// Funktionen zum Umschalten der Tag-Optionen
function nosing() {
    urgend.checked = false;
    important.checked = false;
}
    
function yess() {
    none.checked = false;
}