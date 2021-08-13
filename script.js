const display = new Proxy({}, databindingHandler());
display.data = 0;
attachEventListeners();

function operate(operator, a, b) {
    const operations = {
        '+' : add,
        '-' : subtract,
        '*' : multiply,
        '/' : divide
    }
    return operations[operator](a, b);
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b !== 0 ?
        a / b : 
        undefined
    ;
}

function databindingHandler() {
    return {
        set: (target, property, value) => {
            value = value.toString();
            length = value.length <= 10 ? value.length : 10;
            value = value.slice(0, length);

            target[property] = value;
            updateDisplay(value);
        },
        get: (target, property, receiver) => { 
            return target[property];
        }
    };
    
    function updateDisplay(value) {
        document.querySelector('#display').innerText = value;
    }
}

function attachEventListeners() {
    attachNumberListeners();
}

function attachNumberListeners() {
    const numbers = document.querySelectorAll(".numbers");

    numbers.forEach(number => {
        number.addEventListener("click", numberHandler);
    });

    function numberHandler() {
        appendNumberToDisplay(this.innerText);
    }

    function appendNumberToDisplay(number) {
        if (display.data === '0') { display.data = number; return; }
        display.data = display.data.concat(number);
    }
}
