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
  constructor(prevValueDisplay, currValueDisplay) {
    this.prevValueDisplay = prevValueDisplay;
    this.currValueDisplay = currValueDisplay;

    //  Create a curr, prev and operation instance variable
    this.clear();
  }

  clear() {
    // values to hold the curr, prev and operation variables
    this.currOperand = "0";
    this.prevOperand = "Made with Love";
    this.operation = undefined;
  }

  delete() {
    // delete the last element of the curr variable by
    // converting it into a string then slicing the last element
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    // Catcher to make sure there is no more then 1 Period's
    // done thought check if currOperand include a period if so return
    if (number === "." && this.currOperand.includes(".")) return;

    // if not append number to currOperand but append only works on strings
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  choseOperation(operation) {
    //  check if the currOperand is null if so return if not compute
    if (this.currOperand === "") return;
    if (this.currOperand !== "") this.compute();

    // If the currOperand is not null the assign the operation
    // change the value of the currOperand to prevOperand
    // change the currOperand to 0 to get the next number
    this.operation = operation;
    this.prevOperand = this.currOperand;
    this.currOperand = "0";
  }

  compute() {
    // create a variable for the result
    let result;

    // change the curr and prev operands to number form from string
    const prev = parseFloat(this.prevOperand);
    const curr = parseFloat(this.currOperand);

    // Error handling if there is no value or if there isNaN the return
    if (isNaN(prev) || isNaN(curr)) return;

    // switch case for the operation
    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "÷":
        result = prev / curr;
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

    // display the result in the curr value position
    // change the operation and prev to undefined and null
    this.currOperand = result;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisNumber(number) {
    // Convert the number to a string for processing

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

  updateDisplay() {
    // assign the return of the getDisNumber function to curr display position
    this.currValueDisplay.innerText = this.getDisNumber(this.currOperand);

    // Display the prev value and the operation along side it if operation is not NULL
    if (this.operation != null) {
      this.prevValueDisplay.innerText = `${this.getDisNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      // otherwise sets the value to an empty string
      this.prevValueDisplay.innerText = "Made with Love";
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

// Create and Object for the class Calculator
// which has a constructor which takes in the position of the prev and curr
// display positions
const calculator = new Calculator(prevValueDisplay, currValueDisplay);

// For Numbers
numberButton.forEach((button) => {
  // create event listeners and pass the value's innerText to appendNumber method
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// For Operations
operationButton.forEach((button) => {
  // create event listeners and pass the value's innerText to choseOperation method
  button.addEventListener("click", () => {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// For Equal
equalButton.addEventListener("click", () => {
  // call the compute method
  calculator.compute();
  calculator.updateDisplay();
});

// For the Clear
acButton.addEventListener("click", () => {
  // call the reset method
  calculator.clear();
  calculator.updateDisplay();
});

// For the Delete Last Digit
delButton.addEventListener("click", () => {
  // call the delete method so it can delete the last digit of the currOperand
  calculator.delete();
  calculator.updateDisplay();
});

// Bound Material for the challenge
// Check for keypress events
document.addEventListener("keypress", (key) => {
  calculator.appendNumber(key.key);
  calculator.updateDisplay();
});
