let field = document.getElementById('field')
let numbers = document.getElementsByClassName('number')
let history = []
let expression = ''

for (var i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function () {
        field.value = expression += this.innerText
    })
}

function clear () {
    field.value = 0
    expression = ''
}

function calculate () {
    let formula = ''
    let result
    try {
        for (let i = 0; i < expression.length; i++) {
            if (isNaN(expression[i])) {
                if (expression[i] == '×') {
                    formula += '*'
                } else if (expression[i] == '÷') {
                    formula += '/'
                } else if (expression[i] == '−') {
                    formula += '-'
                } else {
                    formula += '+'
                }
            } else {
                formula += parseInt(expression[i])
            }
        }
        
        result = eval(formula)
    }
    catch (e) {
        result = 'Malformed expression'
    }

    if (history.length > 2) {
        history.shift()
    } 
    
    if (!isNaN(result)) {
        history.push({
            expression: expression,
            result: result
        })
    }


    historyGenerator(history)

    field.value = result != undefined ? result : 0
    expression = result > 0 ? result : ''
}

function historyGenerator (history) {
    let panel = document.getElementById('history-panel')

    panel.innerHTML = ''

    history.forEach(function (value, index) {
        let container = document.createElement('div')
        container.setAttribute('class', 'history-container')

        let results = resultGenerator(history, index)

        container.appendChild(results.numberExp)
        container.appendChild(results.equals)
        container.appendChild(results.resultExp)

        panel.appendChild(container)
    })
}

function resultGenerator (history, i) {
    let numberExp = document.createElement('div')
    let equals = document.createElement('div')
    let resultExp = document.createElement('div')

    numberExp.setAttribute('class', 'items')
    equals.setAttribute('class', 'equal items')
    resultExp.setAttribute('class', 'items')

    numberExp.innerText = history[i].expression
    equals.innerHTML = '&equals;'
    resultExp.innerText = history[i].result

    return {
        numberExp, equals, resultExp
    }
}

function backspace () {
    if (field.value != '0') {
        field.value = expression = field.value.slice(0, -1)
    
        if (field.value === '') {
            field.value = expression = 0
        }
    }
}

document.getElementById('clear-btn').addEventListener('click', clear)
document.getElementById('equals-btn').addEventListener('click', calculate)
document.getElementById('backspace').addEventListener('click', backspace)