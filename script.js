const valuesAndOperation = {
    firstValue: "",
    secondValue: "",
    operation: "",
    result: "",
    
    add() {
        this.result = Number(this.firstValue) + Number(this.secondValue);
        console.log(`The result is ${this.result}`);
        return this.result;
    },
    subtract() {
        this.result = Number(this.firstValue) - Number(this.secondValue);
        console.log(`The result is ${this.result}`);
        return this.result;
    },
    multiply() {
        this.result = Number(this.firstValue) * Number(this.secondValue);
        console.log(`The result is ${this.result}`);
        return this.result;
    },
    divide() {
        if (this.secondValue === 0) {
            alert("Division by zero is not allowed");
        }
        this.result = Number(this.firstValue) / Number(this.secondValue);
        console.log(`The result is ${this.result}`);
        return this.result;
    },
    operate(operator) {
        let operationResult;
        switch (operator) {
            case "add":
                console.log('Add operation');
                return this.add();
                break;
                
            case "subtract":
                console.log('Subtract operation');
                return this.subtract();
                break;
                
            case "multiply":
                console.log('Multiply operation');
                return this.multiply();
                break;
                
            case "divide":
                console.log('Divide operation');
                return this.divide();
                break;
                
            default:
                console.log('Not a valid operation');
                return null;
        }
        this.result = operationResult;
        return operationResult;
    }
};

const buttons = Array.from(document.querySelector(".buttons").children);
const display = document.querySelector("#display");

const displayClickedButton = function() {
    let firstNumber = '';
    let secondNumber = '';
    let operation = '';
    let hasDecimal = false; // variable to use for decimal condition
    const operators = ['/', '*', '-', '+'];
    buttons.forEach(button => {
        button.addEventListener("click", e => {
            const value = e.currentTarget.innerHTML;
            console.log(value);
            if (!isNaN(value)) {
                if (!firstNumber) {
                    firstNumber = value;
                    valuesAndOperation.firstValue = firstNumber;
                    display.placeholder = firstNumber;
                    console.log(`First number: ${firstNumber}`);
                } else if (operation && !(secondNumber.includes("."))) {
                    secondNumber = value; 
                    valuesAndOperation.secondValue = secondNumber;
                    display.placeholder = secondNumber;
                    console.log(`Second number: ${secondNumber}`);
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
                operation = e.currentTarget.id;
                valuesAndOperation.operation = operation;
                display.placeholder = value;
                console.log(`Operation: ${operation}`);
            } else if (value === "=" && firstNumber && secondNumber && operation) { 
                valuesAndOperation.result = valuesAndOperation.operate(valuesAndOperation.operation);
                display.placeholder = valuesAndOperation.result;
                firstNumber = '';
                secondNumber = '';
                operation = '';
            } else if (operation && operators.includes(value) && firstNumber && secondNumber) { 
                valuesAndOperation.result = valuesAndOperation.operate(valuesAndOperation.operation);
                display.placeholder = valuesAndOperation.result;
                firstNumber = valuesAndOperation.result;
                valuesAndOperation.firstValue = firstNumber;
                operation = e.currentTarget.id;
                valuesAndOperation.operation = operation;
                secondNumber = '';
                valuesAndOperation.secondValue = secondNumber;
            } else if (value === "C") { 
                firstNumber = '';
                valuesAndOperation.firstValue = firstNumber;
                secondNumber = '';
                valuesAndOperation.secondValue = secondNumber;
                operation = '';
                valuesAndOperation.operation = operation;
                display.placeholder = '0';
            } else if (value === "." && firstNumber && !secondNumber) {
                firstNumber = firstNumber + '.';
                display.placeholder = firstNumber;
                valuesAndOperation.firstValue = firstNumber;
            } else if (value === "." && operation && secondNumber) {
                secondNumber = secondNumber + '.';
                display.placeholder = secondNumber;
                valuesAndOperation.secondValue = secondNumber;
            }
        })
    })
}
displayClickedButton();

