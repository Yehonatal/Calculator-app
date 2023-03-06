// Theme Picker
let body = document.querySelector("body");
let themeSwitches = document.querySelectorAll("input");

themeSwitches.forEach((themeSwitch) => {
    themeSwitch.addEventListener("change", () => {
        if (themeSwitch.checked) {
            themeSwitch.checked = false;
            let className = body.getAttribute("class");
            body.classList.replace(className, themeSwitch.id);
        }
    });
});

// Create a class to handle everything
class Calculator {
    // Create a constructor method which takes in prev and curr value
    constructor(prevValueToDisplay, currValueToDisplay) {
        this.prevValueToDisplay = prevValueToDisplay;
        this.currValueToDisplay = currValueToDisplay;

        //  Create a curr, prev and operand instance variable
        this.clear();
    }

    clear() {
        // values to hold the curr, prev and operation variables
        this.prevValueToDisplay.classList.remove("error");
        this.currValueToDisplay.classList.remove("error_style");
        this.currOperand = "0";
        this.prevOperand = "Made with Love";
        this.operation = undefined;
    }

    delete() {
        // delete the last element of the curr variable by
        // converting it into a string then slicing the last element
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(value) {
        if (value == "." && this.currOperand.includes(".")) return;

        this.currOperand = this.currOperand.toString() + value.toString();
    }

    choseOperations(ope) {
        if (this.currOperand == "") return;
        if (this.currOperand != "") this.compute();

        this.operation = ope;
        this.prevOperand = this.currOperand;
        this.currOperand = "0";
    }

    compute() {
        let result;

        const prev = parseFloat(this.prevOperand);
        const curr = parseFloat(this.currOperand);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case "+":
                result = prev + curr;
                break;
            case "÷":
                if (curr == 0) {
                    this.prevValueToDisplay.classList.add("error");
                    this.currValueToDisplay.classList.add("error_style");
                    this.currValueToDisplay.innerText = `ZeroDivisionError!`;
                } else {
                    result = prev / curr;
                }
                break;
            case "*":
                result = prev * curr;
                break;
            case "-":
                result = prev - curr;
                break;
            default:
                return;
        }

        this.currOperand = result;
        this.operation = undefined;
        this.prevOperand = "Made with Love";
    }

    getNumbersToScreens(number) {
        const stringNum = number.toString();

        // create 2 half one of the int other for the decimal point but convert the first int into an int back
        const intDigit = parseFloat(stringNum.split(".")[0]);
        const decimalDigit = stringNum.split(".")[1];

        // create a variable for int to display
        let intDisplay;

        // if the int digit half is null then set the int display to empty string else format it

        if (isNaN(intDigit)) {
            intDisplay = "";
        } else {
            intDisplay = intDigit.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if (decimalDigit != null) {
            return `${intDisplay}.${decimalDigit}`;
        } else {
            return intDisplay;
        }
    }

    update() {
        this.currValueToDisplay.innerText = this.getNumbersToScreens(
            this.currOperand
        );

        if (this.operation != null) {
            this.prevValueToDisplay.innerText = `${this.getNumbersToScreens(
                this.prevOperand
            )} ${this.operation}`;
        } else {
            this.prevValueToDisplay.innerText = "Made with Love";
        }
    }
}

// Display
const prevValueDisplay = document.querySelector("[data-prev]");
const currValueDisplay = document.querySelector("[data-curr]");

// Buttons
const numberButton = document.querySelectorAll("[data-num]");
const operationButton = document.querySelectorAll("[data-operation]");

const delButton = document.querySelector("[data-del]");
const acButton = document.querySelector("[data-reset]");
const equalButton = document.querySelector("[data-equal]");

const calculator = new Calculator(prevValueDisplay, currValueDisplay);

numberButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.appendNumber(btn.innerText);
        calculator.update();
    });
});

operationButton.forEach((btn) => {
    btn.addEventListener("click", () => {
        calculator.choseOperations(btn.innerText);
        calculator.update();
    });
});

equalButton.addEventListener("click", () => {
    calculator.compute();
    calculator.update();
});

delButton.addEventListener("click", () => {
    calculator.delete();
    calculator.update();
});

acButton.addEventListener("click", () => {
    calculator.clear();
    calculator.update();
});
