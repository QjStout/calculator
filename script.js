const display = new Proxy({}, databindingHandler());

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
            return Number(target[property]);
        }
    };
    
    function updateDisplay(value) {
        document.querySelector('#display').innerText = value;
    }
}