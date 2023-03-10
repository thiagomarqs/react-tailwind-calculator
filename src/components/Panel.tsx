import { useEffect } from 'react';
import { ReactComponent as BackspaceIcon } from '../assets/icons/backspace.svg';
import { CalculatorHistoryEntry } from "../models/CalculatorHistoryEntry";
import { Button } from "./Button";

interface Props {
  addToExpression: (value: number | string) => void;
  currentExpression: string;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  setLatestExpression: React.Dispatch<React.SetStateAction<CalculatorHistoryEntry>>;
  addToHistory: Function;
}

export const Panel = (props: Props) => {

  const { 
    addToExpression,
    currentExpression, 
    setExpression,
    setLatestExpression,
    addToHistory
  } = props;

  const allowedKeys = ["+", "-", "/", "*", "%", "Enter", "=", ",", "."];

  useEffect(() => {
    addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  })

  const tryIfNumber = (onClick: (number: number) => any, fallbackonClick?: () => any) => {
    const number = Number(currentExpression);

    // if it's a valid number.
    if(!isNaN(number)) return onClick(number);

    // at this point, it can only be an invalid number.
    // if a fallback onClick was provided, execute it.
    if(fallbackonClick) {
      try {
        fallbackonClick();
      }
      catch(e) {
        return;
      }
    }

    return;
  }

  const tryOrElseResult = (onClick: (number: number) => any) => tryIfNumber(onClick, result);

  const clear = () => {
    setLatestExpression({expression: "", result: ""});
    setExpression("0");
  }

  const backspace = () => {
    const sliced = `${currentExpression}`.substring(0, currentExpression.length - 1);
    const newExpression = sliced.length > 0 ? sliced : "0";

    setExpression(newExpression);
  }

  const percentage = () => tryOrElseResult(number => setExpression(eval(`${number}/100`)));

  const fractionByX = () => tryOrElseResult(number => {
    if(currentExpression != "0") setExpression(eval(`1/${number}`));
  });

  const square = () => tryOrElseResult(number => setExpression(eval(`${number}*${number}`)));

  const squareRoot = () => tryOrElseResult(number => setExpression(`${Math.sqrt(number)}`));

  const divide = () => tryOrElseResult(() => addToExpression("/"));

  const multiply = () => tryOrElseResult(() => addToExpression("*"));

  const subtract = () => tryOrElseResult(() => addToExpression("-"));

  const sum = () => tryOrElseResult(() => addToExpression("+"));

  const invertSign = () => tryOrElseResult(number => setExpression(`${number * -1}`));

  const addDecimal = () => tryOrElseResult(number => {
    const hasDecimalAlready = `${number}`.indexOf('.') !== -1;

    if(hasDecimalAlready) return;

    const numberWithDecimal = `${number}.`;

    setExpression(numberWithDecimal);
  });

  const getFinalResult = () => eval(currentExpression);

  const result = () =>  {
    const finalResult = getFinalResult();

    addToHistory({
      expression: currentExpression,
      result: finalResult
    });

    setExpression(finalResult);
  }

  const performOperation = (operation: string) => {  
    const operationsByKey: {[operation: string] : Function} = {
      "+": sum,
      "-": subtract,
      "/": divide,
      "*": multiply,
      "%": percentage,
      "Enter": result,
      "=": result,
      ",": addDecimal,
      ".": addDecimal
    }
    return operationsByKey[operation]();
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;

    if(key == "Backspace") return backspace();
    
    if(allowedKeys.includes(key)) return performOperation(key);

    if(isNaN(Number(key))) return;

    addToExpression(key);
  }

  return (
    <div className="h-full grid gap-1 grid-rows-6 grid-cols-4 text-xl text-bold">
      <Button theme="dark" onClick={percentage}>%</Button>
      <Button theme="dark" onClick={clear}>CE</Button>
      <Button theme="dark" onClick={clear}>C</Button>
      <Button theme="simple" onClick={() => backspace()} className={"bg-stone-800 hover:bg-stone-700 text-center"}><BackspaceIcon style={{margin: "0 auto"}}/></Button>
      <Button theme="dark" onClick={fractionByX}>1/x</Button>
      <Button theme="dark" onClick={square}>x??</Button>
      <Button theme="dark" onClick={squareRoot}>???x</Button>
      <Button theme="dark" onClick={divide}>??</Button>
      <Button theme="light" onClick={() => addToExpression(7)}>7</Button>
      <Button theme="light" onClick={() => addToExpression(8)}>8</Button>
      <Button theme="light" onClick={() => addToExpression(9)}>9</Button>
      <Button theme="dark" onClick={multiply}>??</Button>
      <Button theme="light" onClick={() => addToExpression(4)}>4</Button>
      <Button theme="light" onClick={() => addToExpression(5)}>5</Button>
      <Button theme="light" onClick={() => addToExpression(6)}>6</Button>
      <Button theme="dark" onClick={subtract}>-</Button>
      <Button theme="light" onClick={() => addToExpression(1)}>1</Button>
      <Button theme="light" onClick={() => addToExpression(2)}>2</Button>
      <Button theme="light" onClick={() => addToExpression(3)}>3</Button>
      <Button theme="dark" onClick={sum}>+</Button>
      <Button theme="light" onClick={invertSign}>+/-</Button>
      <Button theme="light" onClick={() => addToExpression(0)}>0</Button>
      <Button theme="light" onClick={addDecimal}>,</Button>
      <Button theme="simple" onClick={result} className="bg-emerald-300 text-neutral-900 hover:bg-emerald-200">=</Button>
    </div>
  )
}