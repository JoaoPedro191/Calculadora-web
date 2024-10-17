const ignoreDigits = ["C", "CE", "="];
const arithmeticOperators = ["+", "-", "x", "/"];

const calculatorPanel = document.querySelector(".calculator-header");
calculatorPanel.textContent = 0;

document.querySelectorAll(".calculator-digit").forEach((element) => {
  element.addEventListener("click", () => {
    digitPressed(element);
  });
});

const digitPressed = (element) => {
  const digit = element.textContent;
  if (!ignoreDigits.includes(digit)) {
    calculatorPanel.innerHTML = panelUpdate(digit);
  }
  handleColorOfDigit(element);
  if (ignoreDigits.includes(digit)) {
    handleOperations(digit);
  }
};

const handleColorOfDigit = (element) => {
  const isOperator = verifyDigitIfIsArithmeticOperator(element.textContent);
  let showDefaultBackground = null;

  if (isOperator || ignoreDigits.includes(element.textContent)) {
    element.style.backgroundColor = "#7C7B7B";
    showDefaultBackground = "#928686";
  } else {
    element.style.backgroundColor = "#d4d4d4";
    showDefaultBackground = "white";
  }
  setInterval(() => {
    element.style.backgroundColor = showDefaultBackground;
  }, 400);
};

const handleOperations = (digit) => {
  if (digit.endsWith("C")) {
    cleanPanel();
    return;
  }
  if (digit.startsWith("CE")) {
    removeLastCaracter();
    return;
  }
  if (digit.startsWith("=")) {
    calc();
  }
};

const panelUpdate = (digit) => {
  let content = calculatorPanel.textContent;
  const isOperator = verifyDigitIfIsArithmeticOperator(digit);
  if (!isOperator && content === "0") {
    return digit;
  }
  if (isOperator && verifyDigitIfIsArithmeticOperator(content.slice(-1))) {
    content = content.replace(content.slice(-1), digit);
  }
  const formatResult =
    isOperator && content.includes(digit) ? content : content + digit;
  return formatResult;
};

const verifyDigitIfIsArithmeticOperator = (digit) => {
  let digitIsArithmeticOperator = false;
  if (arithmeticOperators.includes(digit)) {
    digitIsArithmeticOperator = true;
  }
  return digitIsArithmeticOperator;
};

const cleanPanel = () => {
  if (calculatorPanel.textContent) {
    calculatorPanel.innerHTML = 0;
  }
};

const removeLastCaracter = () => {
  if (calculatorPanel.textContent) {
    const panelContent = calculatorPanel.textContent.substring(
      0,
      calculatorPanel.textContent.length - 1
    );
    calculatorPanel.innerHTML = !panelContent ? 0 : panelContent;
  }
};

const calc = () => {
  let expression = calculatorPanel.textContent;
  if (expression.includes("x")) {
    expression = expression.replace(/x/g, "*");
  }
  calculatorPanel.innerHTML = eval(expression);
};
