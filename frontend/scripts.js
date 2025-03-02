function updateList() {
  fetch("http://localhost/toDoMaker/backend")
    .then((response) => response.json())
    .then((data) => {
      if (data == null) return;
    });
}

function calculateRemainingDays(dueDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);

  console.log("current Date:" + currentDate);
  console.log("current Date:" + typeof currentDate);
  console.log("due date:" + dueDateObj);
  console.log("due date:" + typeof dueDateObj);
  const diffDays = Math.round(Math.abs((dueDateObj - currentDate) / oneDay));

  console.log("daysremaning::::::" + diffDays);
  return diffDays;
}
function renderList() {
  fetch("http://localhost/toDoMaker/backend")
    .then((response) => response.json())
    .then((data) => {
      if (data == null) return;
      document.getElementById("task-list-id").innerHTML = "";
      data.forEach((element, index) => {
        document.getElementById("task-list-id").innerHTML += `
     <div id="${index}-task-container-id" class="task-container">
      <div class="delete-button-date-container">
     <button onclick="deleteTask(${index})" class="delete-task-button"></button>
      <h1 class="created-date" id="${index}-created-date-id">Created: 11.5.2024</h1>
      </div>
      <h1 id="${index}-task-name-id" class="task-name"></h1>
      <h1 id="${index}-task-description-id" class="task-description"></h1>
         <h1 class="days-remaining" id="${index}-days-remaining-id"> </h1>
      <div class="due-date-container">
      <h1 class="task-due-title">Due date:&nbsp</h1>
      <h1 id="${index}-task-date-id" class="task-due-date"></h1>
      </div>
   
     `;

        let daysRemaining = calculateRemainingDays(data[index]["date"]);

        document.getElementById(`${index}-task-name-id`).innerText =
          data[index]["name"];
        document.getElementById(`${index}-task-description-id`).innerText =
          data[index]["description"];
        document.getElementById(`${index}-task-date-id`).innerText =
          data[index]["date"];
        document.getElementById(`${index}-created-date-id`).innerText =
          data[index]["createdDate"];
        console.log(index);
        document.getElementById(
          `${index}-days-remaining-id`
        ).innerText = `${daysRemaining} days remaing`;
      });
    });
}

function loadHomePage() {
  document.getElementById("page-container-id").innerHTML = `
    <div id="page-container-id" class="page-content">
      <div class="front-page-container" id="front-page-container-id">
        <h1 class="webpage-title" id="webpage-title-id">ListFlow</h1>
        <div class="button-text-container" id="button-text-container-id">
          <div class="">
            <button class="create-task-page-button" onclick="createTaskPage()">
              Create task
            </button>

            <button class="view-tasks-button" onclick="viewTasksPage()">
              View tasks
            </button>
          </div>
          <div class="welcome-text-container">
            <h1 class="welcome-text">
              Welcome to ListFlow, your personal task manager designed to help
              you stay on top of your daily goals.
            </h1>
          </div>
        </div>
      </div>
    </div>`;
}

function createTaskPage() {
  var containerElement = document.getElementById("button-text-container-id");
  var taskListElement = document.getElementById("testing-id");
  if (containerElement !== null) {
    containerElement.classList.add("button-text-container-animation");
    var titleElement = document.getElementById("webpage-title-id");
    titleElement.classList.add("webpage-title-animation");
  } else if (taskListElement !== null) {
    console.log("task list not null");
    taskListElement.classList.add("task-list-animation");
    console.log(taskListElement.classList);
  }
  setTimeout(() => {
    document.getElementById("page-container-id").innerHTML = `
    <div class="header">
    <button onclick="loadHomePage()"class="webpage-title-small" id="webpage-title-small-id">ListFlow</button>
    <button class="view-tasks-button-two" onclick="viewTasksPage()">View tasks </button>  
    </div>
    
        
    <div class=create-task-page>
         
         <form method="post" class="create-task-form" id="create-task-form-id">
            <label class="task-info-title">Task name</label>
            <input type="text" class="task-input" id="task-name-input-id" />
            <label class="task-info-title">Task description</label>
            <input
              type="text"
              class="task-input"
              id="task-description-input-id"
            />
            <label class="task-info-title">Task date</label>
            <input type="date" id="task-date-input-id" class="task-input" />
            <input type="submit" value="Create task" class="create-task-button" />
          </form>
          <div class="view-tasks-button-two-container">
          
        </div>
      </div>`;
    document
      .getElementById("create-task-form-id")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("hello");
        const date = new Date().toISOString().split("T")[0];
        const taskName = document.getElementById("task-name-input-id").value;
        const taskDescription = document.getElementById(
          "task-description-input-id"
        ).value;
        const taskDate = document.getElementById("task-date-input-id").value;
        if (taskName.length > 25) {
          console.log("task name too long");
          return;
        } else if (taskDescription.length > 80) {
          console.log("task description too long too long");
          return;
        } else {
          await fetch("http://localhost/toDoMaker/backend/index.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Indicate that we're sending JSON
            },
            body: JSON.stringify({
              type: "create",
              name: taskName,
              description: taskDescription,
              date: taskDate,
              createdDate: date,
            }), // Send the data as JSON
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
            })
            .catch((error) => console.log(error));
          updateList();
          console.log(taskName, taskDescription, taskDate);
        }
      });
  }, 1000); // Match the duration of fade-out
}
function viewTasksPage() {
  let screenWidth = window.innerWidth;
  window.addEventListener("resize", (e) => {
    e.preventDefault();
    screenWidth = window.innerWidth;
  });
  var formElement = document.getElementById("create-task-form-id");
  var containerElement = document.getElementById("button-text-container-id");
  var taskListElement = document.getElementById("testing-id");
  if (formElement !== null) {
    formElement.classList.add("task-form-animation");
  } else {
    containerElement.classList.add("button-text-container-animation");
    var titleElement = document.getElementById("webpage-title-id");
    titleElement.classList.add("webpage-title-animation");
  }
  setTimeout(() => {
    document.getElementById("page-container-id").innerHTML = `
  <div class="header">
  <button onclick="loadHomePage()"class="webpage-title-small" id="webpage-title-small-id">ListFlow</button>
  </div>
  <div class="tasks-list-container" id="testing-id">
      <div class="tasks-list-title-button-container">
      <h1 class="task-list-title">Task list</h1>  
        <button class="create-task-page-button-two" onclick="createTaskPage()">
              Create task
        </button>
      </div>
      <div id="task-list-id" class="tasks-container"></div>
      </div>`;
    renderList();

    const taskList = document.getElementById("task-list-id");
    taskList.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (screenWidth > 768) taskList.scrollLeft += e.deltaY;
      else taskList.scrollTop += e.deltaY;
    });
  }, 1000);
}

async function deleteTask(index) {
  taskName = document.getElementById(`${index}-task-name-id`).innerText;
  document.getElementById(`${index}-task-container-id`).remove();

  await fetch("http://localhost/toDoMaker/backend/index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Indicate that we're sending JSON
    },
    body: JSON.stringify({
      type: "delete",
      message: taskName,
    }), // Send the data as JSON
  })
    //.then((response))
    .then((data) => {
      console.log(data);
    });

  updateList();
}
