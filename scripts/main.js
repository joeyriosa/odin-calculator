let number1;
let number2;
let operation;

let display = document.querySelector('#display');

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
    console.log(event.target.textContent);
    display.textContent = event.target.textContent;
}

let numberButtons = document.querySelectorAll('.btn-number');
numberButtons.forEach(function(button) {
    button.addEventListener('click', handleNumberClick);
});
