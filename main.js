/*function formHandler(event) {
    event.preventDefault();
    if($("input[type=checkbox]").is(":checked")){
        let name = document.getElementById("name").value;
        let color = document.querySelector('select[name="color"]').value
        let notags = document.getElementById("none").checked;
        let tagU = document.getElementById("urgend").checked;
        let tagI = document.getElementById("important").checked;
        let start = document.getElementById("from").value
        let end = document.getElementById("too").value
        
        console.log(!name); //schaut ob der name ausgefüllt worden ist
        if (!name){
            alert("please name your Task")
        }
    


        addTaskFunk(name, color, notags, tagU, tagI, start, end);
        document.getElementById('taskForm').reset();
        noNeew();
    }else{
        alert("please select a Tag");
    }
}*/
$(document).off('.data-api')

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
        console.log("no checkmark");
        alert("please choose at least one tag option");
        return;
    }

    addTaskFunk(name, color, notags, tagU, tagI, start, end);
        document.getElementById('taskForm').reset();
        noNeew();
}

const form = document.getElementById("taskForm");
form.addEventListener("submit", formHandler);


function addTaskFunk(name, color, notags, tagU, tagI, start, end){
    let container = document.getElementById("madeTasks");
    let entry = document.createElement('div');
    entry.className = "addedTask";

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
        <img src="trash.svg" id="delete" name="delete"  onclick="deleteT(this);" >
        <img src="pencil.svg" id="edit" name="edit"  onclick="editT();">
    </div>
    `
    container.appendChild(entry);
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

        let parentDiv = el.closest('.wholeTask'); // sucht das nähste "wholeTask" div und speichert das in "parentDiv"
        parentDiv.remove(); //entfernt den completten div in dem sich das element(delete img) befindet
    }
}

function editT(){

} 

function nosing() {
    urgend.checked = false;
    important.checked = false;
    }
    
function yess() {
none.checked = false;
}
