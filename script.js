const addTaskBtn = document.getElementById("addTask");
const btnText = addTaskBtn.innerText;
const TaskNameTextField = document.getElementById("TaskName");
const recordsDisplay = document.getElementById("records");
let userArray = [];
let edit_id = null;

let objStr = localStorage.getItem("users");
if (objStr != null) {
  userArray = JSON.parse(objStr);
}
DisplayInfo();
addTaskBtn.onclick = () => {
  // Get user's name from text field
  const name = TaskNameTextField.value;
  if (name === "") {
    alert("Please enter a Task..!");
    return;
  } else if (edit_id != null) {
    userArray.splice(edit_id, 1, {
      name: name,
    });
    edit_id = null;
  } else {
    userArray.unshift({
      name: name,
    });
  }

  SaveInfo(userArray);
  TaskNameTextField.value = "";
  addTaskBtn.innerText = btnText;
};

// Storage user's name in local storage
function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
  DisplayInfo();
}

// Display user's name
function DisplayInfo() {
  let statement = "";
  userArray.forEach((user, i) => {
    statement += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${user.name}</td>
           <td><i class="btn text-white fa fa-pen btn-info mx-2" onclick='EditInfo(${i})'></i>
           <i class="btn btn-danger text-white fa-solid fa-xmark" onclick='DeleteInfo(${i})'></i></td>
           </tr>`;
  });
  recordsDisplay.innerHTML = statement;
}

// Edit user's name
function EditInfo(id) {
  edit_id = id;
  TaskNameTextField.value = userArray[id].name;
  addTaskBtn.innerText = "Save Changes";
}

// Delete user's name
function DeleteInfo(id) {
  if (confirm("Are You sure to delete the #Task.!")) {
    txt = userArray.splice(id, 1);
    SaveInfo(userArray);
  }
}
