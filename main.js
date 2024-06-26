function formHandler(event) {
    event.preventDefault();
    if($("input[type=checkbox]").is(":checked")){
        let name = document.getElementById("name").value;
        let color = document.querySelector('select[name="color"]').value
        let notags = document.getElementById("none").checked;
        let tagU = document.getElementById("urgend").checked;
        let tagI = document.getElementById("important").checked;
        let start = document.getElementById("from").value
        let end = document.getElementById("too").value
        




        addTaskFunk(name, color, notags, tagU, tagI, start, end);
        document.getElementById('taskForm').reset();
        noNeew();
    }else{
        alert("please select a Tag");
    }
}
const form = document.getElementById("taskForm");
form.addEventListener("submit", formHandler);


function neew(){
    document.getElementById("ontop").style.display = "block";
        document.getElementById("add").style.display = "block";
    }


function noNeew(){
document.getElementById("ontop").style.display = "none";
    document.getElementById("add").style.display = "none";
}


function addTaskFunk(name, color, notags, tagU, tagI, start, end){
    let container = document.getElementById("madeTasks");
    let entry = document.createElement('div');
    entry.className = "addedTask";

    let checkedtag = "";
    if(tagU == true){
        checkedtag = "&#10710;";
    }
    if(tagI == true){
        checkedtag = checkedtag + "&#8252;";
    }
    entry.innerHTML = `
    <div class="topTask">
        <input type="checkbox" onclick="prozentding()" name="done" id="done">
        <p>${name}</p>
        <div class="taskTag">
        <p>${checkedtag}</p>
        </div>
    </div>
    <button type="submit" name="delete"><img src="weg.svg" alt="Delete"></button>
     `
    container.appendChild(entry);
    prozentding();
}
function prozentding(){
    const allecheck = document.querySelectorAll('#done');
    const totalcheck = allecheck.length;
    const donecheck = Array.from(allecheck).filter(checkbox => checkbox.checked).length;
    document.getElementById('erledigt').textContent= `Progress: ${donecheck} / ${totalcheck}`;
}
function nosing() {
    urgend.checked = false;
    important.checked = false;
    }
function yess() {
none.checked = false;
}
