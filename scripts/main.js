let calculatorInput = {
    num1: undefined,
    num2: undefined,
    operator: undefined
}

let displayNumber;
let isOperatorLastClick = false;
let isEqualsLastClick = false;

let display = document.querySelector('#display');
let formula = document.querySelector('#formula');

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(dividend, divisor) {
    if (divisor === 0) return "ERR";
    return dividend / divisor;
}

function operate(operator, num1, num2) {
    if (operator === '+') {
        return add(num1, num2);
    }
    else if (operator === '-') {
        return subtract(num1, num2);
    }
    else if (operator === '*') {
        return multiply(num1, num2);
    }
    else if (operator === '/') {
        return divide(num1, num2);
    }
}

function handleNumberClick(event) {
    //console.log(event.target.textContent);
    if ((calculatorInput.num1 === undefined && display.textContent === "0") || isOperatorLastClick === true) {
        display.textContent = event.target.textContent;
    }
    else {
        display.textContent += event.target.textContent;
    }
    displayNumber = parseFloat(display.textContent);
    isOperatorLastClick = false;
    isEqualsLastClick = false;
}

function handleOperatorClick(event) {
    if (calculatorInput.num1 == undefined) {
        formula.textContent = displayNumber + ' ' + event.target.textContent;
        calculatorInput.num1 = parseFloat(displayNumber);
        calculatorInput.operator = event.target.textContent;
        isOperatorLastClick = true;
        isEqualsLastClick = false;
    }
}

function handleEqualsClick(event) {
    // For cases of consecutive click to Equals. Don't compute again.
    if (isEqualsLastClick === true) return;

    calculatorInput.num2 = parseFloat(displayNumber);
    formula.textContent += ' ' + displayNumber + ' =';
    displayNumber = operate(calculatorInput.operator, calculatorInput.num1, calculatorInput.num2);
    display.textContent = displayNumber;
    isEqualsLastClick = true;
    isOperatorLastClick = false;
}

function handleClearClick(event) {
    calculatorInput.num1 = undefined;
    calculatorInput.num2 = undefined;
    calculatorInput.operator = undefined;
    display.textContent = '0';
    formula.textContent = '';
    isEqualsLastClick = false;
}

let numberButtons = document.querySelectorAll('.btn-number');
numberButtons.forEach(function(button) {
    button.addEventListener('click', handleNumberClick);
});

let operatorButtons = document.querySelectorAll('.btn-operator');
operatorButtons.forEach(function(button) {
    button.addEventListener('click', handleOperatorClick);
})

let equalButton = document.querySelector('#equal-operator');
equalButton.addEventListener('click', handleEqualsClick);

let clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', handleClearClick);
