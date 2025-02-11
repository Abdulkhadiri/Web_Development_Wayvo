let taskCounter = 1;

function add() {
  let txt = document.getElementById('txt').value;
  if (!txt) return;

  let taskId = `task-${taskCounter}`;
  let html = `<li id="${taskId}" class="item">
                <p>${txt}</p>
                <button type="button" onclick="dele(this, '${taskId}')">Delete</button>
              </li>`;

  let ma = document.getElementById('task-list');
  ma.insertAdjacentHTML('afterbegin', html);

  document.getElementById('txt').value = '';
  taskCounter++;
}

function dele(button, taskId) {
  let taskElement = document.getElementById(taskId);
  taskElement.remove();
}

function deleteall() {
  let taskList = document.getElementById('task-list');
  let allTasks = taskList.getElementsByTagName('li');
  Array.from(allTasks).forEach(task => {
    task.remove();
  });
}

