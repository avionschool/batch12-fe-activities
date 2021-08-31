// element assignments
const timer = document.getElementById('time')
const quote = document.getElementById('quote')
const amPm = document.getElementById('meridiem')
const username = document.getElementById('name')
const focusArea = document.getElementById('focus-area')
const addToDo = document.getElementById('todo-input')
const mainFocus = document.getElementById('focus-today')
const resetBtn = document.getElementById('reset-btn')
const todoLists = document.getElementById('todo-list')
const todoBtn = document.getElementById('todo-btn')
const closeTodo = document.querySelector('.close-todo')
const todoArea = document.querySelector('.todo-area')
const label = document.querySelector('.focus-label')

// variables
let meridiem
let greeting
let names = [
    'Fritz',
    'Kim',
    'Francis',
    'Jerico',
    'Pau'
]
let momentumObj = {
    'name': '',
    'focus': '',
    'quote': '',
    'todo': []
}

_init()

// execute all function 
function _init () {
    _initLocalStorage()
    _initClock()
    setElemText(amPm, meridiem)
    setDefaultData()
    fetchRandomQuote()
    _initActionListeners()
}

// performs real time clock
function _initClock () {
    let today = new Date()
    let currentName = randomizer(names)
    let hour = today.getHours()
    let minute = String(today.getMinutes()).padStart(2, '0')

    meridiem = 'Good Morning'
    if (hour > 12) {
        hour -= 12
        meridiem = hour < 6 ? 'Good Afternoon' : 'Good Evening'
    } else if (hour == 0) {
        hour = 12
    } 

    let time = hour + ':' + minute

    greeting = greetPerson(meridiem, currentName)
    
    setElemText(timer, time)
    setTimeout(_initClock, 1000)
}

// returns a random elem from an array
function randomizer (list) {
    let random = Math.floor(Math.random() * list.length)
    return list[random]
}

// set a text of an element
function setElemText (elem, text) {
    elem.innerHTML = elem.value = elem.innerText = text
}

// returns a greeting
function greetPerson (meridiem, person) {
    return `${meridiem}, ${person}.`
}

function _initLocalStorage () {
    if (!localStorage.hasOwnProperty('momentum')) {
        return setLocalStorage(momentumObj)
    }
}

// set the users name upon keypress enter
function setUserName (e) {
    let person = username.value

    if (person.length > 10) {
        e.preventDefault()
    }

    if (e.which == 13 && person != '') {
        e.preventDefault()

        let localObj = getLocalStorage()

        localObj = {
            ...localObj,
            name: person
        }
        
        setLocalStorage(localObj)
        showFocusArea()
    }
}

// displays the focus for today section
function showFocusArea () {
    username.style.borderBottom = '0'
    document.activeElement.blur()
    focusArea.classList.remove('hidden')
}

// fetch random quote using api / request
async function fetchRandomQuote () {
    let response = await fetch('https://complimentr.com/api')
    let data = await response.json()

    let ownQuote
    if (localStorage.hasOwnProperty('momentum')) {
        const localData = JSON.parse(localStorage.getItem('momentum'))
        ownQuote = localData.quote ? localData.quote : data.compliment
    } else {
        ownQuote = data.compliment
    }

    console.log(ownQuote)

    setElemText(quote, ownQuote)
}

// clicking on quote will highlight/select all text
function selectQuote () {
    let pElem = document.getElementsByClassName('quote')
    selectAllText(pElem)
}

// performs highlight/selection of text
function selectAllText (elem) {
    let selection = window.getSelection()
    let range = document.createRange()

    range.selectNodeContents(elem[0])
    selection.removeAllRanges()
    selection.addRange(range)
}

// set custom quote upeon keypress enter
function setCustomQuote (e) {
    if (e.which == 13) {
        e.preventDefault()

        let localObj = getLocalStorage()

        if (quote.innerText) {
            showSnackbar('This quote has been set as your favorite.', '#FFFFFF4D')
        } else {
            fetchRandomQuote()
        }
        
        localObj = {
            ...localObj,
            quote: quote.innerText
        }
        setLocalStorage(localObj)
        document.activeElement.blur()
    }
}

// display a toaster / alert message
function showSnackbar (message, color = '#ff0000') {
    let snackbar = document.getElementById('snackbar')

    snackbar.className = 'show'
    snackbar.style.backgroundColor = color

    setElemText(snackbar, message)
    setTimeout(function () {
        snackbar.className = snackbar.className.replace('show', '')
    }, 5000)
}

// add todo list in the ul
function addTodoList (e) {

    if (e.target.value.length > 20) {
        e.preventDefault()
    }

    if (e.which == 13) {
        let storageData = getLocalStorage()
        
        if (e.target.value == '') {
            showSnackbar('TODO list is required.')
        } else {
            todoLists.appendChild(todoListItem(e.target.value))
            let localObj = getLocalStorage()
            let deleteBtn = document.querySelectorAll('.delete-btn')
            let doneBtn = document.querySelectorAll('.done-btn')
            let todo = document.querySelectorAll('.todo')

            loadActionListeners(
                doneBtn,
                deleteBtn,
                todo.length - 1,
                todo,
                localObj
            )

            storageData.todo.push({
                text: e.target.value,
                status: 'not-done'
            })

            setLocalStorage(storageData)
        }
        e.target.value = ''
        // deleteEventListener()
    }
}

// create a li element that contains todo details
function todoListItem (elemText) {
    let list = document.createElement('li')
    let text = document.createElement('span')
    let span = document.createElement('span')
    let faIcons = `
        <i class="fa fa-check done-btn" aria-hidden="true"></i>
        <i class="fa fa-trash delete-btn" aria-hidden="true"></i>`

    span.innerHTML = faIcons
    text.innerHTML = elemText
    list.appendChild(text)
    list.appendChild(span)
    list.classList.add('todo')

    return list
}

// set focus for today upon keypress enter
function setMainFocus (e) {
    let storageData = getLocalStorage()
    if (e.which == 13) {
        if (e.target.value) {
            storageData = {
                ...storageData,
                focus: e.target.value
            }
            setLocalStorage(storageData)

            label.classList.add('fadeout')
            setTimeout(function () {
                setElemText(label, 'Your main focus for today is')
            }, 699)

            setTimeout(function () {
                mainFocus.classList.remove('focus-padding')
            }, 1000)

            resetBtn.classList.remove('hidden')
            todoBtn.classList.remove('hidden')
            
            mainFocus.style.borderBottom = '0'
            mainFocus.blur()
        } else {
            showSnackbar('Main focus should not be empty.')
        }
    }
}

// set data to their corresponding elements
function setDefaultData () {
    const localObj = getLocalStorage()

    let name

    if (localStorage.hasOwnProperty('momentum')) {
        if (localObj.name) {
            name = localObj.name
            username.style.border = '0'
            focusArea.classList.remove('hidden')
        } else {
            name = randomizer(names)
        }
    
        if (localObj.focus) {
            label.style.fontStyle = 'italic'
            mainFocus.style.border = '0'
            mainFocus.classList.remove('focus-padding')
            setElemText(mainFocus, localObj.focus)
            setElemText(label, 'Your main focus for today is')
        }

        if (localObj.todo.length) {
            localObj.todo.forEach((value, index) => {
                todoLists.appendChild(todoListItem(value.text))
                let todo = document.querySelectorAll('.todo > span:nth-child(1)')
                if (localObj.todo[index].status == 'done') {
                    todo[index].classList.add('done')
                }
            })
        }

        if (localObj.name && localObj.focus) {
            resetBtn.classList.remove('hidden')
            resetBtn.classList.add('fadein')
            todoBtn.classList.remove('hidden')
            todoBtn.classList.add('fadein')
        }
    } else {
        name = randomizer(names)
    }

    setElemText(username, name)
}

function loadTodoList (localObj) {
    localObj.todo.forEach((value, index) => {
        todoLists.appendChild(todoListItem(value.text))
        let todo = document.querySelectorAll('.todo > span:nth-child(1)')
        if (localObj.todo[index].status == 'done') {
            todo[index].classList.add('done')
        }
    })
}

// get the momentum's key data in the local storage
function getLocalStorage () {
    return JSON.parse(localStorage.getItem('momentum'))
}

// set the momentum's key data
function setLocalStorage (object) {
    return localStorage.setItem('momentum', JSON.stringify(object))
}

// reset moment to current state
function resetMomentum () {
    setLocalStorage(momentumObj)
    location.reload()
}

// add line through to todo list text and store todo data in local storage
let checkSelectedItem = (index) => {
    let todo = document.querySelectorAll('.todo > span:nth-child(1)')
    let localObj = getLocalStorage()
    const status = todo[index].classList.contains('done') ? 'not-done' : 'done'

    todo[index].classList.toggle('done')

    localObj.todo[index] = {
        text: localObj.todo[index].text,
        status: status
    }

    setLocalStorage(localObj)
}

// remove selected todo list
function deleteSelectedItem (index, localObj) {
    setTimeout(function () {
        localObj = getLocalStorage()
        localObj.todo.splice(index, 1)
        localStorage.setItem('momentum', JSON.stringify(localObj))
        todoLists.innerHTML = ''
        loadTodoList(localObj)
        _initActionListeners()
    }, 500)
}

// add click event listeners to all actions
function _initActionListeners () {
    let localObj = getLocalStorage()
    let deleteBtn = document.querySelectorAll('.delete-btn')
    let doneBtn = document.querySelectorAll('.done-btn')
    let todo = document.querySelectorAll('.todo')

    localObj.todo.forEach((value, index) => {
        loadActionListeners(
            doneBtn,
            deleteBtn,
            index,
            todo,
            localObj
        )
    })
}

// add event listener to newly added todo item list
function loadActionListeners (doneBtn, deleteBtn, index, todo, localObj) {
    doneBtn[index].addEventListener('click', function () {
        checkSelectedItem(index)
    })
    deleteBtn[index].addEventListener('click', function () {
        todo[index].classList.add('fadeout')
        deleteSelectedItem(index, localObj)
    })
}

// shows todo list container
function showTodoList () {
    todoBtn.classList.add('fadeout')
    setTimeout(function () {
        todoBtn.classList.add('hidden')
        todoArea.classList.remove('hidden')
    }, 500)
}

// hide todo list container
function closeTodoList () {
    todoArea.classList.add('hidden')
    todoBtn.classList.remove('hidden')
    todoBtn.classList.remove('fadeout')
}

// event listeners for elements
username.addEventListener('keypress', setUserName)
quote.addEventListener('click', selectQuote)
quote.addEventListener('keypress', setCustomQuote)
addToDo.addEventListener('keypress', addTodoList)
mainFocus.addEventListener('keypress', setMainFocus)
resetBtn.addEventListener('click', resetMomentum)
todoBtn.addEventListener('click', showTodoList)
closeTodo.addEventListener('click', closeTodoList)
