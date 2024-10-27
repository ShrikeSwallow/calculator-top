const buttons = document.querySelectorAll("button");
const displayText = document.querySelector("#display-text");
const calculator = document.querySelector(".calculator");
const operators = ["+", "-", "*", "/", "%", "s"];
const visibleInputs = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const hiddenInputs = ["Delete", "Backspace", "Enter"];

let numberOne = null;
let numberTwo = null;
let operator = "";
let displayScreen = "";
displayText.textContent = "0";

const reinitAll = () => {
  numberOne = null;
  numberTwo = null;
  operator = "";
  displayScreen = "";
};

document.body.addEventListener("keyup", (event) => {
  const pressed = event.key;
  if (visibleInputs.includes(pressed) && displayScreen.length < 10) {
    if (pressed === ".") {
      checkFloatPoint();
    } else {
      concNumber(pressed);
    }
    displayText.textContent = `${displayScreen}`;
  }

  if (pressed === hiddenInputs[0]) {
    reinitAll();
    displayText.textContent = "0";
  }

  if (pressed === hiddenInputs[1]) {
    if (displayScreen.substring(0, displayScreen.length - 1) === "") {
      displayScreen = "0";
    } else {
      displayScreen = displayScreen.substring(0, displayScreen.length - 1);
    }
    displayText.textContent = `${displayScreen}`;
  }

  if (operators.includes(pressed)) {
    if (!numberOne) {
      numberOne = convertDisplayToNumber(displayScreen);
      operator = pressed;
      displayScreen = "";
      if (operator === "s") {
        if ((squareRoot(numberOne) % 1).toString().length > 6) {
          displayText.textContent = `${squareRoot(numberOne).toPrecision(10)}`;
        } else {
          displayText.textContent = `${squareRoot(numberOne)}`;
        }
        reinitAll();
        displayScreen = displayText.textContent;
      }
    } else if (numberOne && displayScreen !== "") {
      numberTwo = convertDisplayToNumber(displayScreen);
      operate(numberOne, numberTwo, operator);
      operator = pressed;
      numberOne = convertDisplayToNumber(displayText.textContent);
      numberTwo = null;
      displayScreen = "";
    }
  }

  if (pressed === hiddenInputs[2]) {
    if (numberOne && operator !== "") {
      numberTwo = convertDisplayToNumber(displayScreen);
      operate(numberOne, numberTwo, operator);
      reinitAll();
      displayScreen = displayText.textContent;
    } else {
      return;
    }
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const clicked = event.currentTarget;
    if (
      clicked.getAttribute("class") === "numberBtn" &&
      displayScreen.length < 10
    ) {
      if (clicked.textContent === ".") {
        checkFloatPoint();
      } else {
        concNumber(clicked.textContent);
      }
      displayText.textContent = `${displayScreen}`;
    }

    if (clicked.getAttribute("id") === "clearBtn") {
      reinitAll();
      displayText.textContent = "0";
    }

    if (clicked.getAttribute("id") === "backspaceBtn") {
      if (displayScreen.substring(0, displayScreen.length - 1) === "") {
        displayScreen = "0";
      } else {
        displayScreen = displayScreen.substring(0, displayScreen.length - 1);
      }
      displayText.textContent = `${displayScreen}`;
    }

    if (operators.includes(clicked.textContent)) {
      if (!numberOne) {
        numberOne = convertDisplayToNumber(displayScreen);
        operator = clicked.textContent;
        displayScreen = "";
        if (operator === "s") {
          if ((squareRoot(numberOne) % 1).toString().length > 6) {
            displayText.textContent = `${squareRoot(numberOne).toPrecision(
              10
            )}`;
          } else {
            displayText.textContent = `${squareRoot(numberOne)}`;
          }
          reinitAll();
          displayScreen = displayText.textContent;
        }
      } else if (numberOne && displayScreen !== "") {
        numberTwo = convertDisplayToNumber(displayScreen);
        operate(numberOne, numberTwo, operator);
        operator = clicked.textContent;
        numberOne = convertDisplayToNumber(displayText.textContent);
        numberTwo = null;
        displayScreen = "";
      }
    }

    if (clicked.getAttribute("id") === "operateBtn") {
      if (numberOne && operator !== "") {
        numberTwo = convertDisplayToNumber(displayScreen);
        operate(numberOne, numberTwo, operator);
        reinitAll();
        displayScreen = displayText.textContent;
      } else {
        return;
      }
    }
  });
});

//ALL MATH FUNCTION DEFINITIONS

const checkFloatPoint = () => {
  if (displayScreen.includes(".")) {
    return;
  } else if (!displayScreen) {
    displayScreen = "0.";
  } else {
    displayScreen += ".";
  }
};

const concNumber = (number) => {
  if (displayScreen === "0") {
    displayScreen = number;
  } else {
    displayScreen += number;
  }
};

const convertDisplayToNumber = (number) => {
  if (number.includes(".")) {
    return Number.parseFloat(number);
  } else {
    return Number.parseInt(number);
  }
};

const operate = (a, b, operator) => {
  switch (operator) {
    case "+":
      displayText.textContent = `${add(a, b)}`;
      break;
    case "-":
      displayText.textContent = `${subtract(a, b)}`;
      break;
    case "*":
      displayText.textContent = `${multiply(a, b)}`;
      break;
    case "/":
      if ((divide(a, b) % 1).toString().length > 6) {
        displayText.textContent = `${divide(a, b).toPrecision(10)}`;
      } else {
        displayText.textContent = `${divide(a, b)}`;
      }
      break;
    case "%":
      displayText.textContent = `${percentage(a, b)}`;
      break;
  }
};

const add = (a, b) => {
  return a + b;
};

const subtract = (a, b) => {
  return a - b;
};

const multiply = (a, b) => {
  return a * b;
};

const divide = (a, b) => {
  if (b === 0) {
    return "Don't be silly";
  } else return a / b;
};

const percentage = (a, b) => {
  return (a * b) / 100;
};

const squareRoot = (a) => {
  return Math.sqrt(a);
};
