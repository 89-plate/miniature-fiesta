const display = document.getElementById('display');

let currentValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function updateDisplay() {
  display.textContent = currentValue;
}

function inputDigit(digit) {
  if (waitingForSecondOperand) {
    currentValue = digit;
    waitingForSecondOperand = false;
  } else {
    currentValue = currentValue === '0' ? digit : currentValue + digit;
  }

  updateDisplay();
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    currentValue = '0.';
    waitingForSecondOperand = false;
    updateDisplay();
    return;
  }

  if (!currentValue.includes('.')) {
    currentValue += '.';
    updateDisplay();
  }
}

function clearCalculator() {
  currentValue = '0';
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

function deleteLastDigit() {
  if (waitingForSecondOperand) {
    return;
  }

  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
  updateDisplay();
}

function performCalculation(secondOperand) {
  if (firstOperand === null || operator === null) {
    return Number(secondOperand);
  }

  const first = Number(firstOperand);
  const second = Number(secondOperand);

  switch (operator) {
    case '+':
      return first + second;
    case '-':
      return first - second;
    case '*':
      return first * second;
    case '/':
      return second === 0 ? 'Error' : first / second;
    default:
      return second;
  }
}

function handleOperator(nextOperator) {
  const inputValue = Number(currentValue);

  if (firstOperand === null) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation(currentValue);
    currentValue = String(result);
    firstOperand = result;
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
  updateDisplay();
}

function handleEquals() {
  if (operator === null || waitingForSecondOperand) {
    return;
  }

  const result = performCalculation(currentValue);
  currentValue = String(result);
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = false;
  updateDisplay();
}

document.querySelectorAll('[data-action="number"]').forEach((button) => {
  button.addEventListener('click', () => {
    inputDigit(button.dataset.value);
  });
});

document.querySelector('[data-action="decimal"]').addEventListener('click', inputDecimal);
document.querySelector('[data-action="clear"]').addEventListener('click', clearCalculator);
document.querySelector('[data-action="delete"]').addEventListener('click', deleteLastDigit);
document.querySelector('[data-action="equals"]').addEventListener('click', handleEquals);

document.querySelectorAll('[data-action="operator"]').forEach((button) => {
  button.addEventListener('click', () => {
    handleOperator(button.dataset.value);
  });
});

updateDisplay();
