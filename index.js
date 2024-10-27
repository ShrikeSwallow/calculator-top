const buttons = document.querySelectorAll("button");
const displayText = document.querySelector("#display-text");
const operators = ["+", "-", "*", "/", "%", "√"];

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
        if (operator === "√") {
          //let resultStrLength = Math.round(squareRoot(numberOne)).toString().length;
          displayText.textContent = `${squareRoot(numberOne).toPrecision(10)}`;
          reinitAll();
        }
      }
      displayScreen = "";
    }

    if (clicked.getAttribute("id") === "operateBtn") {
      if (numberOne && operator !== "") {
        numberTwo = convertDisplayToNumber(displayScreen);

        operate(numberOne, numberTwo, operator);
        reinitAll();
      } else {
        return;
      }
    }
  });
});

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
      if ((divide(a, b) % 1).toString.length > 6) {
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
