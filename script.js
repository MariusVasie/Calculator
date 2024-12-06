const valuesAndOperation = {
    firstValue: "",
    secondValue: "",
    operation: "",
    result: "",
    
    add() {
        this.result = Number(this.firstValue) + Number(this.secondValue);
        return this.result;
    },
    subtract() {
        this.result = Number(this.firstValue) - Number(this.secondValue);
        return this.result;
    },
    multiply() {
        this.result = Number(this.firstValue) * Number(this.secondValue);
        return this.result;
    },
    divide() {
        if (this.secondValue === '0') {
            alert("Division by zero is not allowed");
        }
        this.result = Number(this.firstValue) / Number(this.secondValue);
        return this.result;
    },
    operate(operator) {
        let operationResult;
        switch (operator) {
            case "+":
                return this.add();
                break;
                
            case "-":
                return this.subtract();
                break;
                
            case "*":
                return this.multiply();
                break;
                
            case "/":
                return this.divide();
                break;
                
            default:
                return null;
        }
        this.result = operationResult;
        return operationResult;
    }
};

const buttons = Array.from(document.querySelector(".buttons").children);
const display = document.querySelector("#display");

const myCalculator = function() {
    let firstNumber = '';
    let secondNumber = '';
    let operation = '';
    let value = '';
    const operators = ['/', '*', '-', '+'];

    document.addEventListener('keyup', e => {
        if (e.code == 'NumpadEnter') { 
            value = 'Enter';
            calculate(value);
        } else {
            value = e.key;
            calculate(value);
        }
      }
    );

    buttons.forEach(button => {
        button.addEventListener("click", e => {
            value = e.currentTarget.innerHTML;
            calculate(value);
        })
    })

    function calculate(value) {
        if (!isNaN(value)) {
            if (!firstNumber) {
                firstNumber = value;
                valuesAndOperation.firstValue = firstNumber;
                display.placeholder = firstNumber;
            } else if (operation && !(secondNumber.includes("."))) {
                secondNumber = value; 
                valuesAndOperation.secondValue = secondNumber;
                display.placeholder = secondNumber;
            } else if (firstNumber && !operation && firstNumber.includes(".") && firstNumber.length < 16) {
                firstNumber = firstNumber + value.toString();
                display.placeholder = firstNumber;
                valuesAndOperation.firstValue = firstNumber;
            } else if (operation && secondNumber && secondNumber.includes(".") && secondNumber.length < 16) {
                secondNumber = secondNumber + value.toString();
                display.placeholder = secondNumber;
                valuesAndOperation.secondValue = secondNumber;
            }
        } else if (operators.includes(value) && !secondNumber) { 
            operation = value;
            valuesAndOperation.operation = operation;
            display.placeholder = value;
        } else if ((value === "=" || value === "Enter") && firstNumber && secondNumber && operation) { 
            valuesAndOperation.result = valuesAndOperation.operate(valuesAndOperation.operation);
            display.placeholder = valuesAndOperation.result;
            firstNumber = valuesAndOperation.result;
            valuesAndOperation.firstValue = firstNumber;
            secondNumber = '';
            valuesAndOperation.secondValue = secondNumber;
            operation = '';
            valuesAndOperation.operation = operation;
        } else if (operation && operators.includes(value) && firstNumber && secondNumber) { 
            valuesAndOperation.result = valuesAndOperation.operate(valuesAndOperation.operation);
            display.placeholder = valuesAndOperation.result;
            firstNumber = valuesAndOperation.result;
            valuesAndOperation.firstValue = firstNumber;
            operation = value;
            valuesAndOperation.operation = operation;
            secondNumber = '';
            valuesAndOperation.secondValue = secondNumber;
        } else if (value === "C" || value === "Delete") { 
            firstNumber = '';
            valuesAndOperation.firstValue = firstNumber;
            secondNumber = '';
            valuesAndOperation.secondValue = secondNumber;
            operation = '';
            valuesAndOperation.operation = operation;
            display.placeholder = '0';
        } else if (value === "." && firstNumber && !secondNumber && !(firstNumber.includes("."))) {
            firstNumber = firstNumber + '.';
            display.placeholder = firstNumber;
            valuesAndOperation.firstValue = firstNumber;
        } else if (value === "." && operation && secondNumber && !(secondNumber.includes("."))) {
            secondNumber = secondNumber + '.';
            display.placeholder = secondNumber;
            valuesAndOperation.secondValue = secondNumber;
        } else if ((value === "←" || value === "Backspace") && firstNumber && !operation && !secondNumber) {
            if (firstNumber.length > 1) {
                firstNumber = firstNumber.slice(0, -1);
                display.placeholder = firstNumber;
                valuesAndOperation.firstValue = firstNumber;
            } else {
                display.placeholder = '0';
                firstNumber = '';
                valuesAndOperation.firstValue = firstNumber;
            }
        } else if ((value === "←" || value === "Backspace") && firstNumber && operation && secondNumber) {
            if (secondNumber.length > 1) {
                secondNumber = secondNumber.slice(0, -1);
                display.placeholder = secondNumber;
                valuesAndOperation.secondValue = secondNumber;
            } else {
                display.placeholder = '0';
                secondNumber = '';
                valuesAndOperation.secondValue = secondNumber;
            }
            
        }
    }

}
myCalculator();

