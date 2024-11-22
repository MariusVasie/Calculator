//Input
let number1, number2, operator;


//Operators
const add = function(a, b) {
	return a + b;
};
const subtract = function(a, b) {
	return a - b;
};
const multiply = function(a, b) {
    return a * b;
};
const divide = function(a, b) {
    return a / b;
  };

//Operate
const operate = function(operator, number1, number2) {
    switch (operator) {
        case add:
            console.log('Add operation');
            return add(number1, number2);
            break;
        case subtract:
            console.log('Subtract operation');
            return subtract(number1, number2);
            break;
        case multiply:
            console.log('Multiply operation');
            return multiply(number1, number2);
            break;
        case divide:
            console.log('Divide operation');
            return divide(number1, number2);
            break;
        default:
            console.log('Not a valid operation');
    }
}

//Button selection
const buttons = Array.from(document.querySelector(".buttons").children);
const display = document.querySelector("#display");


//Display clicked button
const displayClickedButton = function() {
    buttons.forEach(button => {
        button.addEventListener("click", e => {
            console.log(`Clicked on ${e.currentTarget.id}`)
            display.placeholder = e.currentTarget.innerHTML;
            console.log(display);
        })
    })
}
displayClickedButton();