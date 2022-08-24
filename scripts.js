const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButtons = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    delete() {
        this.currentOperant = this.currentOperant.toString().slice(0, -1);
    }

    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperant = parseFloat(this.currentOperant);

        if (isNaN(_previousOperand) ||  isNaN(_currentOperant)) return;

        switch (this.operation) {
            case "+":
                result = _previousOperand + _currentOperant;
                break;
            case "-":
                result = _previousOperand - _currentOperant;
                break;
            case "÷":
                result = _previousOperand / _currentOperant;
                break;
            case "*":
                result = _previousOperand * _currentOperant;
                break;  
            default:
                return;  
        }
        this.currentOperant = result;
        this.operation = undefined;
        this.previousOperand = "";
    }

    chooseOperation(operation) {
        if (this.currentOperant === "") return;

        if (this.previousOperand != '') {
            this.calculate()
        };

        this.operation = operation;

        this.previousOperand = this.currentOperant;
        this.currentOperant = "";
    }

    appendNumber(number){
        if (this.currentOperant.includes(".") && number === ".") return;

        this.currentOperant = `${this.currentOperant}${number.toString()}`;
    }

    clear() {
        this.currentOperant = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperant);
    }
}

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for(const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText);
        calculator.updateDisplay();
    });
}

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
}); 

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay();
});

deleteButtons.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});