const myTodoList = document.querySelector(".myTodoList");
var inputValue = document.querySelector(".input");
var sessionInputValue = document.querySelector(".sessionInput");
const add = document.querySelector(".add");

if (window.localStorage.getItem("todos") == undefined) {
  var todos = [];
  var sessions = [];
  window.localStorage.setItem("todos", JSON.stringify(todos));
  window.localStorage.setItem("sessions", JSON.stringify(sessions));
}

var todosEX = window.localStorage.getItem("todos");
var sessionsEX = window.localStorage.getItem("sessions");

var todos = JSON.parse(todosEX);
var sessions = JSON.parse(sessionsEX);

class item {
  constructor(name, index, sessionCount) {
    this.createItem(name, index, sessionCount);
  }
  createItem(name, index, sessionCount) {
    var itemBox = document.createElement("div");
    itemBox.classList.add(name.replace(/\s/g, ''));

    var input = document.createElement("input");
    input.type = "text";
    input.value = name;
    input.index = index;
    input.classList.add("item_input");
    input.onchange = function ($event) {
      let indexof = event.target.index;
      todos[indexof] = input.value;
      window.localStorage.setItem("todos", JSON.stringify(todos));
    };

    var sessionIn = document.createElement("input");
    sessionIn.type = "number";
    sessionIn.min= 1;
    sessionIn.value = sessionCount;
    sessionIn.index = index;
    sessionIn.classList.add("item_input");
    sessionIn.onchange = function ($event) {
      let indexof = event.target.index;
      sessions[indexof] = event.target.value;
      window.localStorage.setItem("sessions", JSON.stringify(sessions));
    };

    var remove = document.createElement("button");
    remove.classList.add("remove");
    remove.innerHTML = "REMOVE";
    remove.addEventListener("click", () => this.remove(itemBox, name));

    myTodoList.appendChild(itemBox);

    itemBox.appendChild(input);
    itemBox.appendChild(sessionIn);
    itemBox.appendChild(remove);
    
  }

  remove(itemBox, name) {
    let index = todos.indexOf(name);
    todos.splice(index, 1);
    sessions.splice(index, 1);

    window.localStorage.setItem("todos", JSON.stringify(todos));
    window.localStorage.setItem("sessions", JSON.stringify(sessions));

    itemBox.parentNode.innerHTML = '';
    for (var v = 0 ; v < todos.length ; v++){
        new item(todos[v], v, sessions[v]);
    }
  }
}

function decrementSession(){

    if (sessions[0] == 1) {
        todos.splice(0, 1);
        sessions.splice(0, 1);
        window.localStorage.setItem("todos", JSON.stringify(todos));
        window.localStorage.setItem("sessions", JSON.stringify(sessions));
      } else {
        sessions[0]--;
        window.localStorage.setItem("sessions", JSON.stringify(sessions));
      }
      const htmlToRemove = document.querySelector('.' + todos[0].replace(/\s/g, ''));
      htmlToRemove.parentNode.innerHTML = "";

      for (var v = 0; v < todos.length; v++) {
        new item(todos[v], v, sessions[v]);
      }

}

add.addEventListener("click", check);
window.addEventListener("keydown", (e) => {
  if (e.which == 13) {
    check();
  }
});

function check() {
  if (inputValue.value != "") {
    new item(inputValue.value, todos.length, sessionInputValue.value);

    todos.push(inputValue.value);
    window.localStorage.setItem("todos", JSON.stringify(todos));

    sessions.push(sessionInputValue.value);
    window.localStorage.setItem("sessions", JSON.stringify(sessions));

    inputValue.value = "";
    sessionInputValue.value = 1;
  }
}

for (var v = 0; v < todos.length; v++) {
  new item(todos[v], v, sessions[v]);
}

// new item("First todo", 0, 1);
