
document.getElementsByClassName("todaydate").value = new Date().toLocaleDateString();
function formHandler(event) {
    event.preventDefault(); //reloaded die seite nicht beim submitten
    let name = document.getElementById("name").value;
    let color = document.querySelector('select[name="color"]').value
    let notags = document.getElementById("none").checked;
    let tagU = document.getElementById("urgend").checked;
    let tagI = document.getElementById("important").checked;
    let start = document.getElementById("from").value
    let end = document.getElementById("too").value

    if (!name){ //schaut ob der name ausgefüllt worden ist
        alert("please name your Task")
        return;
    }
    if (!color){ //schaut ob der name ausgefüllt worden ist
        alert("please select a color")
        return;
    }
    if (notags == false && tagU == false && tagI == false){ //schaut ob eines der checkboxen ausgefüllt worden ist
        alert("please choose at least one tag option");
        return;
    }
    if (start == false){ //schaut ob eines der checkboxen ausgefüllt worden ist
        alert("please pick a starting date");
        return;
    }
    if (end == false){ //schaut ob eines der checkboxen ausgefüllt worden ist
        alert("please pick an ending date");
        return;
    }
    
    addTaskFunk(name, color, notags, tagU, tagI, start, end);
        document.getElementById('taskForm').reset();
        noNeew();
}

const form = document.getElementById("taskForm");
form.addEventListener("submit", formHandler);


function addTaskFunk(name, color, notags, tagU, tagI, start, end){// Function to add a new task

    let container = document.getElementById("madeTasks");
    let entry = document.createElement('div');
    entry.className = "addedTask";
    entry.id = Math.random().toString(36).substring(7); // Assigning a unique ID to each task

    let checkedtag = "";
    if(tagU == true){
        checkedtag = "&#10710;";
    }
    if(tagI == true){
        checkedtag = checkedtag + " &#8252;";
    }
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
        <img src="trash.svg" id="delete" name="delete" onclick="deleteT(this);">
        <img src="pencil.svg" id="edit" name="edit" onclick="editT('${entry.id}');">
    </div>
    `;
    container.appendChild(entry);

    // Storing the initial values of the task
    tasks[entry.id] = {name, color, notags, tagU, tagI, start, end};
    prozentding();


}

function neew(){
    document.getElementById("ontop").style.display = "block";
        document.getElementById("add").style.display = "block";
    }

function noNeew(){
document.getElementById("ontop").style.display = "none";
    document.getElementById("add").style.display = "none";
}


function prozentding(){
    const allecheck = document.querySelectorAll('#done');
    const totalcheck = allecheck.length;
    const donecheck = Array.from(allecheck).filter(checkbox => checkbox.checked).length;
    document.getElementById('erledigt').textContent= `Progress: ${donecheck} / ${totalcheck}`;
}

function deleteT(el){
    let rlyDelete = confirm("do you really want to delete this task?")
    if (rlyDelete == true){
        let parentDiv = el.closest('.addedTask'); // sucht das nähste "addedTask" div und speichert das in "parentDiv"
        parentDiv.remove(); //entfernt den completten div in dem sich das element(delete img) befindet
    }
    prozentding();
}

function editT(event){
    //thisedit = el.closest('.addedTask') die task die am nehsten ist, finden

    console.log("oui");
    document.getElementById('editTaskPopup').style.display = 'block';

    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();
        let taskId = document.getElementById('editPopup').dataset.taskId; // Assuming the popup has a data-task-id attribute set to the task ID
        let newName = document.getElementById('editName').value;
        let newColor = document.getElementById('editColor').value;
        let newNotags = document.getElementById('editTagU').checked || document.getElementById('editTagI').checked;
        let newTagU = document.getElementById('editTagU').checked;
        let newTagI = document.getElementById('editTagI').checked;
        let newStart = document.getElementById('editStart').value;
        let newEnd = document.getElementById('editEnd').value;
    
        // Update the task
        tasks[taskId] = {name: newName, color: newColor, notags: newNotags, tagU: newTagU, tagI: newTagI, start: newStart, end: newEnd};
    
        // Close the popup
        document.getElementById('editTaskPopup').style.display = 'block';
        document.getElementById('editForm').style.display = 'block';

    });
    
    // Show the pop-up

}

function nosing() {
    urgend.checked = false;
    important.checked = false;
    }
    
function yess() {
none.checked = false;
}
