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
  constructor(prevValueDisplay, currValueDisplay) {
    this.prevValueDisplay = prevValueDisplay;
    this.currValueDisplay = currValueDisplay;
    this.clear();
  }

  clear() {
    // Clear's the curr and prev values from the display
    this.currOperand = "0";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    // Catcher to make there no more then 1 Period's
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }

  choseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.currOperand !== "") this.compute();

    this.operation = operation;
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
    this.currOperand = result;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisNumber(number) {
    const stringNum = number.toString();
    const intDigit = parseFloat(stringNum.split(".")[0]);
    const decimalDigit = stringNum.split(".")[1];

    let intDisplay;

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
    this.currValueDisplay.innerText = this.getDisNumber(this.currOperand);

    if (this.operation != null) {
      this.prevValueDisplay.innerText = `${this.getDisNumber(
        this.prevOperand
      )} ${this.operation}`;
    } else {
      this.prevValueDisplay.innerText = "";
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

// Start using the class
const calculator = new Calculator(prevValueDisplay, currValueDisplay);

// For Numbers
numberButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

// For Operations
operationButton.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.choseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

// For Equal
equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

// For the Clear
acButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

// For the Delete Last Digit
delButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

// Check for keypress events
document.addEventListener("keypress", (key) => {
  calculator.appendNumber(key.key);
  calculator.updateDisplay();
});
