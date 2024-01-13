let calculatorInput = {
    num1: undefined,
    num2: undefined,
    operator: undefined,
    equals: false
}

let displayNumber;
let isOperatorLastClick = false;

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
    let result = undefined;
    if (operator === '+') {
        result = add(num1, num2);
    }
    else if (operator === '-') {
        result = subtract(num1, num2);
    }
    else if (operator === '*') {
        result = multiply(num1, num2);
    }
    else if (operator === '/') {
        result = divide(num1, num2);
    }

    return result;
}

function roundResult(number) {
    if (number == 'ERR') return 'ERR';
    return Math.round(number * 100000000000) / 100000000000
}

function showFormula() {
    if (calculatorInput.operator !== undefined) {
        formula.textContent = calculatorInput.num1 + ' ' + calculatorInput.operator
    }
    if (calculatorInput.num2 !== undefined) {
        formula.textContent += ' ' + calculatorInput.num2;
    }
    if (calculatorInput.equals) {
        formula.textContent += ' =';
    }
}

function handleNumberClick(event) {
    // If the last operation is an equal click. Reset everything and start again.
    if (calculatorInput.equals) {
        handleClearClick();
    }

    if ((display.textContent === "0") || isOperatorLastClick === true) {
        display.textContent = event.target.textContent;
    }
    else {
        // Only append up to 14 digits.
        if (display.textContent.length < 14) {
            display.textContent += event.target.textContent;
        }
    }
    displayNumber = parseFloat(display.textContent);
    isOperatorLastClick = false;
    calculatorInput.equals = false;
}

function handleOperatorClick(event) {
    // If ERR, don't allow to proceed.
    if (display.textContent === "ERR") return;

    if (calculatorInput.num1 == undefined) {
        calculatorInput.num1 = parseFloat(displayNumber);
        calculatorInput.operator = event.target.textContent;
        showFormula();
    }
    else if (calculatorInput.equals) {
        // Do an operation again with the current displayNumber as num1.
        calculatorInput.num1 = displayNumber;
        calculatorInput.operator = event.target.textContent;
        calculatorInput.num2 = undefined;
        calculatorInput.equals = false;
        showFormula();
    }
    else if (isOperatorLastClick) {
        calculatorInput.operator = event.target.textContent;
        showFormula();
    }
    else {
        // This is like pressing the equal sign if there are previous numbers.
        handleEqualsClick();
        // But the current num1 and operator should be the current result and the clicked operator.
        calculatorInput.num1 = displayNumber;
        calculatorInput.operator = event.target.textContent;
        calculatorInput.num2 = undefined;
        calculatorInput.equals = false;
        showFormula();
    }

    isOperatorLastClick = true;
    calculatorInput.equals = false;
}

function handleEqualsClick(event) {
    // For cases of consecutive click to Equals. Don't compute again.
    //console.log(calculatorInput.operator);
    if (calculatorInput.equals === true) return;
    if (calculatorInput.operator == undefined) return;

    calculatorInput.num2 = parseFloat(displayNumber);
    displayNumber = roundResult(operate(calculatorInput.operator, calculatorInput.num1, calculatorInput.num2));
    display.textContent = displayNumber;
    calculatorInput.equals = true;
    isOperatorLastClick = false;

    showFormula();
}

function handleClearClick(event) {
    calculatorInput.num1 = undefined;
    calculatorInput.num2 = undefined;
    calculatorInput.operator = undefined;
    display.textContent = '0';
    formula.textContent = '';
    calculatorInput.equals = false;
    displayNumber = 0;
}

function handleDotClick(event) {
    // If ERR, don't allow to proceed.
    if (display.textContent === "ERR") return;

    // If last operation was operate and dot was clicked, set to zero.
    if (calculatorInput.equals) {
        handleClearClick();
    }

    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
    calculatorInput.equals = false;
}

function handleDeleteClick(event) {
    // If ERR, delete everything.
    if (display.textContent === "ERR") {
        display.textContent = "0";
    };

    // If the last operation was equals, clear everything. Otherwise, existing operation will be used and triggered.
    if (calculatorInput.equals) {
        handleClearClick();
    }

    display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    
    // If there's no more string, show zero.
    if (display.textContent === '') {
        display.textContent = 0;
    }

    displayNumber = parseFloat(display.textContent);
    calculatorInput.equals = false;
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

let dotButton = document.querySelector('#dot-decimal');
dotButton.addEventListener('click', handleDotClick);

let deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', handleDeleteClick);

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/^\d+(\.\d+)?$/.test(key)) {
        handleNumberClick({ target: { textContent: key } });
        event.preventDefault();
    }
    else if (/[\+\-\*\/]/.test(key)) {
        handleOperatorClick({ target: { textContent: key } });
        event.preventDefault();
    }
    else if (key == '=' || key == 'Enter') {
        handleEqualsClick({ target: { textContent: key } });
        event.preventDefault();
    }
    else if (key == '.') {
        handleDotClick({ target: { textContent: key } });
        event.preventDefault();
    }
    else if (key == 'Delete' || key == 'Backspace') {
        handleDeleteClick({ target: { textContent: key } });
        event.preventDefault();
    }
    else if (key == 'Escape') {
        handleClearClick({ target: { textContent: key } });
        event.preventDefault();
    }
})
