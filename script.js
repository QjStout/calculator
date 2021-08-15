const display = new Proxy({}, databindingHandler());
display.data = '';
let _STORE = '';
let _OPERATOR = '';

attachEventListeners();

function operate(operator, a, b) {
    if(operator === '' || a === '' || b === '') {return undefined;}
    a = Number(a);
    b = Number(b);
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
        "undefined"
    ;
}

function databindingHandler() {
    return {
        set: (target, property, value) => {
            if (value === '') {
                target[property] = '0';
                updateDisplay(target[property]);
                return;
            }
            value = value.toString();
            length = value.length <= 10 ? value.length : 10;
            value = value.slice(0, length);

            target[property] = value;
            updateDisplay(target[property]);
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
    attachAllClearListener();
    attachClearEntryListener();
    attachOperatorListeners();
    attachEqualsListener();
    attachDecimalListener();
    attachKeyboardListener();
}

function attachKeyboardListener() {
    document.addEventListener('keydown', keyDownHandler);

    function keyDownHandler(e) {
        if (!isNaN(e.key)) { appendNumberToDisplay(e.key); }
        if (['+', '-', '*', '/'].includes(e.key)) { operateThis(e.key); }
        if(['Enter', '='].includes(e.key)) { execute(); }
        if(e.key === '.') { decimalHandler(); }
        if(e.key === 'Escape') { clearAllCalcData(); }
        if(e.key === 'Backspace') { clearEntryHandler(); }
    }
}

function attachDecimalListener() {
    document.querySelector('#decimal')
        .addEventListener('click', decimalHandler);
}

function decimalHandler() {
    if (display.data.includes('.')) { return; }
    display.data = display.data.concat('.');
}

function attachEqualsListener() {
    document.querySelector("#equals")
        .addEventListener('click', execute);
}

function execute() {
    if(_OPERATOR === '' || _STORE === '' || display.data === '' || isNaN(display.data)) {return}
    let result = operate(_OPERATOR, _STORE, display.data);
    result = result || result === 0 ? result : display.data;
    clearAllCalcData();
    display.data = result;
}

function attachOperatorListeners() {
    const ops = document.querySelectorAll('.operators');
    ops.forEach(op => {
        op.addEventListener('click', operatorHandler);
    });
    
    function operatorHandler() {
        operateThis(this.innerText);
    }
}

function operateThis(op) {
    if (['+', '-', '*', '/'].includes(display.data)) { 
        _OPERATOR = op; 
        display.data = _OPERATOR;
        return; 
    }
    if(_OPERATOR !== '' && !isNaN(_STORE) && !isNaN(display.data)) {
        _STORE = operate(_OPERATOR, _STORE, display.data);
        _OPERATOR = op;
        display.data = _OPERATOR;
        return;
    }
    _OPERATOR = op;
    _STORE = display.data;
    display.data = _OPERATOR;
}

function attachClearEntryListener() {
    document.querySelector('#clear-entry')
        .addEventListener('click', clearEntryHandler);
}

function clearEntryHandler() {
    if(display.data.length === 1){ display.data = ''; return; }
    display.data = display.data.slice(0, display.data.length - 1);
}

function attachAllClearListener() {
    document.querySelector("#clear-all")
        .addEventListener('click', allClearHandler);
    
    function allClearHandler() {
        clearAllCalcData();
    }
}

function clearAllCalcData() {
    display.data = '';
    _STORE = '';
    _OPERATOR = '';
}

function attachNumberListeners() {
    const numbers = document.querySelectorAll(".numbers");

    numbers.forEach(number => {
        number.addEventListener("click", numberHandler);
    });

    function numberHandler() {
        appendNumberToDisplay(this.innerText);
    }
}

function appendNumberToDisplay(number) {
    if (display.data === '0' || isNaN(display.data)) { display.data = number; return; }
    display.data = display.data.concat(number);
}
