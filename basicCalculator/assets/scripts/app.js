let setEvents = () => {
  const defaultResult = 0;
  let currentResult = defaultResult;
  // array in which store operations
  let logEntries = [];
  // Get input from input field
  const getUserNumberInput = () => {
    return parseFloat(userInput.value);
  };
  // Generates and writes calculation log
  const outputLastOperation = (operator, resultBeforeCalc, inputNumber) => {
    const calcDescription = `${resultBeforeCalc} ${operator} ${inputNumber}`;
    outputResult(currentResult, calcDescription);
  };
  // Clear input field
  const clearInputValue = () => {
    userInput.value = null;
  };
  // Store values in an array
  const storeValues = (number) => {
    // if (!isNaN(number)) {
    logEntries.push(number);
    const lastValue = logEntries.shift();
    console.log(lastValue);
    lastOperation.innerText = lastValue;
    // }
  };
  // function to store object and reuse them
  const writeToLog = (
    operation,
    initialResult,
    enteredNumber,
    currentResult,
    mathOperator
  ) => {
    // we create an object to store multiple information about the entries
    const logEntry = {
      operation: operation,
      prevResult: initialResult,
      number: enteredNumber,
      result: currentResult,
      mathOperator: mathOperator,
      operationInfo() {
        return `${this.operation} operation give as result ${this.result} (${this.prevResult} ${this.mathOperator} ${this.number})`;
      },
    };
    // we push in the array the values
    storeValues(logEntry.operationInfo());
  };

  // Add
  const additionResult = () => {
    const enteredNumber = getUserNumberInput();
    // but whatever input you get from an html is a string
    // whatever is in the baptics is considered a string
    const calcDescription = `${currentResult} + ${enteredNumber}`;
    // parseInt / parseFloat / +
    // currentResult = currentResult + +userInput.value;
    // toString() if we have to convert value int a string
    const initialResult = currentResult;
    currentResult += enteredNumber;
    // output the sum // full Log ??
    if (!isNaN(enteredNumber)) {
      outputResult(currentResult, calcDescription);
      clearInputValue();
      writeToLog('ADD', initialResult, enteredNumber, currentResult, '+');
    } else {
      console.log('please enter a number');
    }
  };
  // Subtract
  const subtractionResult = () => {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult -= enteredNumber;
    if (!isNaN(enteredNumber)) {
      outputLastOperation('-', initialResult, enteredNumber);
      clearInputValue();
      writeToLog('SUBTRACT', initialResult, enteredNumber, currentResult, '-');
    } else {
      console.log('please enter a number');
    }
  };
  // Multiply
  const multiplicationResult = () => {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult *= enteredNumber;
    if (!isNaN(enteredNumber)) {
      outputLastOperation('*', initialResult, enteredNumber);
      clearInputValue();
      writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult, 'x');
    } else {
      console.log('please enter a number');
    }
  };
  // Divide
  const divisionResult = () => {
    const enteredNumber = getUserNumberInput();
    const initialResult = currentResult;
    currentResult /= enteredNumber;
    if (!isNaN(enteredNumber)) {
      outputLastOperation('/', initialResult, enteredNumber);
      clearInputValue();
      writeToLog('DIVIDE', initialResult, enteredNumber, currentResult, ':');
    } else {
      console.log('please enter a number');
    }
  };
  // with addEventListener you don't insert parenthesis with arguments to avoid
  // function is executed immediately
  addBtn.addEventListener('click', additionResult);
  subtractBtn.addEventListener('click', subtractionResult);
  multiplyBtn.addEventListener('click', multiplicationResult);
  divideBtn.addEventListener('click', divisionResult);
  clearBtn.addEventListener('click', clearInputValue);
};

window.addEventListener('load', setEvents());

// window.onload = setEvents();
