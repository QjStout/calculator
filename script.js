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

