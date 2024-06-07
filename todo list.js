const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<span>${inputBox.value}</span>`;
        addButtons(li);
        listContainer.appendChild(li);
        inputBox.value = "";
        saveData();
    }
}

function addButtons(li) {
    let editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = "Edit";
    editBtn.onclick = () => editTask(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.onclick = () => deleteTask(deleteBtn);

    let doneBtn = document.createElement("button");
    doneBtn.className = "done";
    doneBtn.innerHTML = "Done";
    doneBtn.onclick = () => doneTask(doneBtn);

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.appendChild(doneBtn);
}

function editTask(button) {
    let li = button.parentElement;
    let span = li.getElementsByTagName("span")[0];
    let currentText = span.textContent;
    let input = document.createElement("input");
    input.type = "text";
    input.value = currentText;

    let saveBtn = document.createElement("button");
    saveBtn.className = "save";
    saveBtn.innerHTML = "Save";
    saveBtn.onclick = () => saveEdit(input, saveBtn);

    li.insertBefore(input, span);
    li.removeChild(span);
    li.insertBefore(saveBtn, button);
    li.removeChild(button);
}

function saveEdit(input, button) {
    let li = button.parentElement;
    let newText = input.value;
    let span = document.createElement("span");
    span.textContent = newText;

    li.insertBefore(span, input);
    li.removeChild(input);
    let editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerHTML = "Edit";
    editBtn.onclick = () => editTask(editBtn);

    li.insertBefore(editBtn, button);
    li.removeChild(button);

    saveData();
}

function deleteTask(button) {
    let li = button.parentElement;
    li.remove();
    saveData();
}

function doneTask(button) {
    let li = button.parentElement;
    li.classList.toggle("checked");
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
    let items = listContainer.getElementsByTagName("li");
    for (let item of items) {
        addButtons(item);
    }
}

showTask();
