let todoItems = [];

const renderTodo = (todo) => {
  const list = document.getElementById("js-todo-list");
  const item = document.querySelector(`[data-key='${todo.id}']`)

  if (todo.deleted) {
    // remove the item from the DOM
    item.remove();
    return
  }

  const isChecked = todo.checked ? 'done' : '';
  const node = document.createElement("li");

  node.setAttribute("class", `todo-item ${isChecked}`);
  node.setAttribute("data-key", todo.id);

  node.innerHTML = `   
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
  <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <i class="bi bi-trash"></i>
    </button>
  `;
  
  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
};

const addTodo = (text) => {
  const todo = {
    text,
    checked: false,
    id: Date.now(),
  };
  todoItems.push(todo);
  renderTodo(todo);
};

const toggleDone = (key) => {
  const index = todoItems.findIndex(item => item.id === Number(key));
  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}

const deleteTodo = (key) => {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id !== Number(key));
  renderTodo(todo);
}

const form = document.getElementById("todo-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("todo-input");

  const text = input.value.trim();
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});

const list = document.getElementById("js-todo-list");
list.addEventListener("click", event => {
  if (event.target.classList.contains("js-tick")){
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
})



