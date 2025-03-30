var userLoginId;

function updateList() {
  fetch("http://localhost/TaskManager/backend")
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

function renderSignInDiv() {
  var heroPageElement = document.getElementById("button-text-container-id");
  heroPageElement.innerHTML = ` 
            <div class="button-text-container" id="button-text-container-id">
             <h1>Sign in</h1>        
             <div class="login-button-container">
            <form id="login-container-id"class="login-container">
             <label class="task-info-title">Username</label>
            <input class="login-input" id="username-id">
             <label class="task-info-title">Password</label> 
            <input class="login-input" type="password" id="password-id">
                <div class="toast-container" id="toast-container-id">
               
            </div>
            <input type="submit" value="Sign in" type="Sign up" class="login-submit-button">
         
            </form>
            </div>
            </div>`;

  document
    .getElementById("login-container-id")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username-id").value;
      const password = document.getElementById("password-id").value;

      fetch("http://localhost/TaskManager/backend/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "signIn",
          username: username,
          password: password,
        }), // Send the data as JSON
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data["status"] == "match") {
            userLoginId = data["UserId"];
            console.log("user is " + userLoginId);
            loadHomePage();
          } else {
            console.log("failed to login");
            document.getElementById(
              "toast-container-id"
            ).innerHTML = `<h1 class="toast-container-text">Wrong credentials<h1>`;
          }
        })
        .catch((error) => console.log(error));
    });
}

function renderSignUpDiv() {
  var heroPageElement = document.getElementById("button-text-container-id");
  heroPageElement.innerHTML = ` 
            <div class="button-text-container" id="button-text-container-id">
             <h1>Sign up</h1>        
             <div class="login-button-container">
            <form id="login-container-id"class="login-container">
             <label class="task-info-title">Username</label>
            <input class="login-input" id="username-id">
             <label class="task-info-title">Password</label> 
            <input class="login-input" id="password-id" type="password">
             <label class="task-info-title">Repeat password</label> 
            <input class="login-input"  type="password" id="repeat-password-id">
            <div class="sign-up-toast-div" id="sign-up-toast-div-id"></div>
            <input type="submit"  value="Sign up" class="login-submit-button">
            </form>
            </div>
            </div>`;

  document
    .getElementById("login-container-id")
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username-id").value;
      const password = document.getElementById("password-id").value;
      const rPassword = document.getElementById("repeat-password-id").value;

      if (password == "" || username == "" || rPassword == "") {
        console.log("Please enter valid credentials");
        document.getElementById("sign-up-toast-div-id").innerHTML =
          "Please enter valid credentials";
        return;
      } else if (rPassword !== password) {
        console.log("password not matching");
        document.getElementById("sign-up-toast-div-id").innerHTML =
          "Passwords not matching";
        return;
      } else if (username.length > 15) {
        document.getElementById("sign-up-toast-div-id").innerHTML =
          "Username cant be longer than 15 characters";
        return;
      } else if (password.length > 32) {
        document.getElementById("sign-up-toast-div-id").innerHTML =
          "Password cant be longer than 32 characters";
        return;
      }

      fetch("http://localhost/TaskManager/backend/index.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "signUp",
          username: username,
          password: password,
        }), // Send the data as JSON
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => console.log(error));
      renderSignInDiv();
    });
}

function renderList() {
  fetch("http://localhost/TaskManager/backend")
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

        let daysRemaining = calculateRemainingDays(data[index]["dueDate"]);

        document.getElementById(`${index}-task-name-id`).innerText =
          data[index]["name"];
        document.getElementById(`${index}-task-description-id`).innerText =
          data[index]["description"];
        document.getElementById(`${index}-task-date-id`).innerText =
          data[index]["dueDate"];
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
        <div class="header">
        <h1 class="webpage-title" id="webpage-title-id">ListFlow</h1>
        <button class="sign-out-button" onclick="signOutFunction()">sign out</button>
        </div>
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

function signOutFunction() {
  fetch("http://localhost/TaskManager/backend/index.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // Indicate that we're sending JSON
    },
    body: JSON.stringify({
      type: "signOut",
    }), // Send the data as JSON
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(userLoginId);
    })
    .catch((error) => console.log(error));
  location.reload(); //reloads the page
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
     <button class="sign-out-button" onclick="signOutFunction()">sign out</button>
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
              <div class="toast-container" id="toast-container-id">
               
              </div>
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
          document.getElementById(
            "toast-container-id"
          ).innerHTML = `<h1 class="toast-container-text">task name is too long<h1>`;
          return;
        } else if (taskName.length == 0) {
          document.getElementById(
            "toast-container-id"
          ).innerHTML = `<h1 class="toast-container-text">Please enter a name for your task<h1>`;
          return;
        } else if (taskDescription.length == 0) {
          document.getElementById(
            "toast-container-id"
          ).innerHTML = `<h1 class="toast-container-text">Please enter a description for your task<h1>`;
          return;
        } else if (taskDescription.length > 80) {
          console.log("task description too long too long");
          document.getElementById(
            "toast-container-id"
          ).innerHTML = `<h1 class="toast-container-text">task description too long too long<h1>`;
          return;
        } else {
          await fetch("http://localhost/TaskManager/backend/index.php", {
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
              userId: userLoginId,
            }), // Send the data as JSON
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              document.getElementById(
                "toast-container-id"
              ).innerHTML = `<h1 class="toast-container-text">Task created<h1>`;
              console.log(userLoginId);
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

  await fetch("http://localhost/TaskManager/backend/index.php", {
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
