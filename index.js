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
  <div class="todo-item">
  <div>
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
  </div>
  <div><span>${todo.text}</span></div>
  <div>
    <button class="delete-todo js-delete-todo">
    <i class="bi bi-trash"></i>
    </button>
  </div>
  </div>
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

/* const toggleDone = (key) => {
  const index = todoItems.findIndex(item => item.id === Number(key));
  console.log(todoItems[index]);
  todoItems[index].checked = !todoItems[index].checked;
  console.log(todoItems[index]);
  renderTodo(todoItems[index]);
} */

const toggleDone = (key) => {
  console.log("toggleDone called with key:", key);
  const index = todoItems.findIndex(item => item.id === Number(key));
  console.log("item found at index:", index, ":", todoItems[index]);
  todoItems[index].checked = !todoItems[index].checked;
  console.log("item after update:", todoItems[index]);
  renderTodo(todoItems[index]);
}

const form = document.getElementById("todo-form");

form.addEventListener("submit", (event) => {
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
  console.log("list item clicked:", event.target);
  if (event.target.classList.contains("js-tick")){
    const itemKey = event.target.parentElement.dataset.key;
    console.log("itemKey:", itemKey);
    toggleDone(itemKey);
  }

  if (event.target.classList.contains('js-delete-todo')) {
    const itemKey = event.target.parentElement.dataset.key;
    deleteTodo(itemKey);
  }
})

const deleteTodo = (key) => {
  const index = todoItems.findIndex(item => item.id === Number(key));
  const todo = {
    deleted: true,
    ...todoItems[index]
  };
  todoItems = todoItems.filter(item => item.id!== Number(key));
  renderTodo(todo);
}