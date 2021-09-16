////////////////// 
//Greeting
/////////////////
// Greeting Variables
let input = document.getElementById('userInput');
let greeting = document.getElementById('greeting');
let name = document.getElementById('nameForm');
let goalForm = document.getElementById('goalForm');
let goal = document.getElementById('goal');
let btn = document.querySelector('.btn');

// Greeting Event Listner that display input user when enter key is pressed
input.addEventListener("keypress", (e) => {
  if (input.value.length > 0 && e.keyCode === 13) {
    // console.log(`hello ${input.value}`);
    name.style.display = "none";
    greeting.style.display = "block";
    greeting.innerHTML = `Hello, ${input.value}!`;
    goalForm.style.display = 'block';
    input.value = "";
    btn.classList.add('show');
  }
});

// Goal Variables
let goalInput = document.getElementById('goalInput');

// Goal Event Listner that display the main goal when enter key is pressed
goalInput.addEventListener("keypress", (e) => {
  if (goalInput.value.length > 0 && e.keyCode === 13) {
    console.log('hello');
    goalForm.style.display = 'none';
    goal.style.display = 'block';
    goal.innerHTML = `Main focus for today : <br><br> ${goalInput.value}`;
    goalInput.value = '';
  }
}); 

////////////////// 
//Todo List
/////////////////
// Variables
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector('.footer button');


inputBox.onkeyup = () => {
  let userData = inputBox.value; //getting user entered value
  if (userData.trim() != 0) {
    addBtn.classList.add('active'); //active add btn
  } else {
    addBtn.classList.remove('active'); //unactive add btn
  }
}

showTasks(); // calling showtasks function

//when user press the enter key to add new list
inputBox.addEventListener("keypress", (e) => {
  let userData = inputBox.value;    
  if (userData.length > 0 && e.keyCode === 13) {
    let getLocalStorage = localStorage.getItem("New Todo"); //local storage
    //if localStorage is null
    if (getLocalStorage === null) {
      listArr = []; // blank array
    } else {
      listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
    }
    listArr.push(userData); //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); // calling showtasks function
    addBtn.classList.remove('active'); //unactive add btn
  }
}); 

//when user click the add button
addBtn.onclick = () => {
  let userData = inputBox.value;    
  let getLocalStorage = localStorage.getItem("New Todo"); //local storage
  //if localStorage is null
  if (getLocalStorage === null) {
    listArr = []; // blank array
  } else {
    listArr = JSON.parse(getLocalStorage); //transforming json string into a js object
  }
  listArr.push(userData); //pushing or adding user data
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); // calling showtasks function
  addBtn.classList.remove('active'); //unactive add btn
}

// function to add task list inside ul
function showTasks() {
  let getLocalStorage = localStorage.getItem("New Todo"); //getting local storage
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  const pendingNumb = document.querySelector('.pendingNumb');
  if (listArr.length > 0) { //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active clear button
  } else {
    deleteAllBtn.classList.remove("active"); //unactive clear button
  }
  pendingNumb.textContent = listArr.length; //padding the length value in pending
  let newLiTag = '';
  listArr.forEach((element, index) => {
    newLiTag += `<li><b>${element}</b><span onclick="deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul 
  inputBox.value = ''; //once added input field will be blank
}

//delete task function 
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("New Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1); //delete or remove the index li
  //after remove the li again update the local storage 
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTasks();
}

// delete all tasks function 
deleteAllBtn.onclick = () => {
  listArr = []; //empty array
  //after delete all task again update the local storage
  localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
  showTasks(); //calling showTasks function
}

////////////////// 
//Modal 
/////////////////
//Modal Variables
const todoBtn = document.querySelector('.todo-btn');
const closeBtn = document.querySelector('.close');
const modal_container = document.querySelector('.modal-container');

//open the modal when clicked
todoBtn.addEventListener('click', () => {
  modal_container.classList.add('show');
});

//close the modal when clicked
closeBtn.addEventListener('click', () => {
  modal_container.classList.remove('show');
});

