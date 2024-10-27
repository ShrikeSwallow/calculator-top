import { operate } from "./operations.js";

const buttons = document.querySelectorAll("button");
// const numbers = buttons.querySelectorAll(".numberBtn");
// const operators = document.querySelectorAll(".functionBtn");
const displayText = document.querySelector("#display-text");

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
  displayText.textContent = "0";
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

//const render = () => {

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
    } else if (clicked.getAttribute("id") === "clearBtn") {
      reinitAll();
    } else if (clicked.getAttribute("id") === "backspaceBtn") {
      if (displayScreen.substring(0, displayScreen.length - 1) === "") {
        displayScreen = "0";
      } else {
        displayScreen = displayScreen.substring(0, displayScreen.length - 1);
      }
      displayText.textContent = `${displayScreen}`;
    }
  });
});

//};

//render();
