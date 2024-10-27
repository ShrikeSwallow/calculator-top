import { operate } from "./operations.js";

const buttons = document.querySelectorAll("button");
// const numbers = buttons.querySelectorAll(".numberBtn");
// const operators = document.querySelectorAll(".functionBtn");
const displayText = document.querySelector("#display-text");

let numberOne = null;
let numberTwo = null;
let operator = "";

let displayScreen = "0";

const checkFloatPoint = () => {
  if (displayScreen.includes(".")) {
    return;
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

const render = () => {
  displayText.textContent = "0";
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const clicked = event.currentTarget;
      if (clicked.getAttribute("class") === "numberBtn") {
        if (clicked.textContent === ".") {
          checkFloatPoint();
        } else {
          concNumber(clicked.textContent);
        }
        displayText.textContent = `${displayScreen}`;
      } else {
        console.log(clicked.textContent);
      }
    });
  });
};

render();
