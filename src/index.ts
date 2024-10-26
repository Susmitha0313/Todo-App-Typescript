import { v4 as uuidv4 } from 'uuid';

type Task = {//we predefined the data types as it can be used as needed in various things
  id: string, 
  title:string, 
  completed:boolean,
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks(); // initializing an empty array to store the enteed tasks
tasks.forEach(addItemList);  

form?.addEventListener("submit", e =>{
  e.preventDefault();

  
  if(input?.value === "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidv4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);

  addItemList(newTask);
  saveTasks();
  input.value = "";//empty my string as to clear out the value as i click enter 

})


function addItemList(task: Task){
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change",()=>{
    task.completed = checkbox.checked;
    // console.log(tasks);
    saveTasks();
    
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed;
  label.append(checkbox, task.title);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("icon-button", "delete");
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteButton.addEventListener("click", ()=>{
    item.remove();
    tasks.splice(tasks.indexOf(task), 1);
    saveTasks();
  });

  const buttonContainer = document.createElement("div");
  buttonContainer.append(deleteButton);
  item.append(deleteButton);
  item.append(label, buttonContainer);
  list?.append(item);
}

function saveTasks(){
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem("TASKS")
  if(taskJson == null){
    return [];
  }
  return JSON.parse(taskJson);
}