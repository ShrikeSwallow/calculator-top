import { add, subtract, multiply, divide } from "./operations.js";

let numberOne = null;
let numberTwo = null;
let operator = "";

const operate = (numberOne, numberTwo, operator) => {
  switch (operator) {
    case "+":
      add(numberOne, numberTwo);
    case "-":
      subtract(numberOne, numberTwo);
    case "*":
      multiply(numberOne, numberTwo);
    case "/":
      divide(numberOne, numberTwo);
  }
};
