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
export const operate = (numberOne, numberTwo, operator) => {
  switch (operator) {
    case "+":
      add(numberOne, numberTwo);
    case "-":
      subtract(numberOne, numberTwo);
    case "*":
      multiply(numberOne, numberTwo);
    case "/":
      divide(numberOne, numberTwo);
    case "%":
      percentage(numberOne, numberTwo);
    case "√":
      squareRoot(numberOne);
  }
};
