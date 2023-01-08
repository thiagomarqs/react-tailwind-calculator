import { useState } from "react";
import { CalculatorHistoryEntry } from "../models/CalculatorHistoryEntry";
import { Display } from "./Display";
import { Header } from "./Header";
import { History } from "./History/History";
import { Movable } from "./Movable";
import { Panel } from "./Panel";

export const Calculator = () => {
  const [expression, setExpression] = useState('0');
  const [history, setHistory] = useState<CalculatorHistoryEntry[]>([]);
  const [latestExpression, setLatestExpression] = useState<CalculatorHistoryEntry>({ expression: "", result: "" });
  const [showHistory, setShowHistory] = useState(false);
  const [isPinned, setPinned] = useState(false);

  const addToExpression = (value: any) => {
    let newExpression;

    if(expression == '0' && isNaN(value)) {
      newExpression = '0';
    }
    
    else {
      newExpression = expression == '0' ? `${value}` : expression + `${value}`;
    }

    if(newExpression.length <= 16) setExpression(newExpression);
  }

  const addToHistory = (entry: CalculatorHistoryEntry) => {
    setHistory(history => {
      const newHistory = [...history];
      newHistory.unshift(entry);
      return newHistory;
    })

    setLatestExpression(entry);
  }

  const toggleHistory = () => setShowHistory(current => !current);

  const clearHistory = () => setHistory([]);

  const togglePin = () => {
    if(isPinned) restoreCalculatorOriginalDimensions();

    setPinned(current => !current);
  }

  const restoreCalculatorOriginalDimensions = () => {
    const calculator = document.getElementById("calculator") as HTMLDivElement;
    calculator.style.width = "";
    calculator.style.height = "";
  }

  return (
    <Movable allowMove={isPinned}>
      <div 
        id="calculator" 
        className={"absolute overflow-hidden m-0 h-max min-w-max" + " " + `${isPinned ? "w-72 drop-shadow-[0px_20px_20px_rgba(0,0,0,0.5)] rounded-md border border-teal-600 resize" : "w-screen h-screen resize-none lg:flex"}`}
      >
        {
        !isPinned && 
          <History
            history={history}
            clearHistory={clearHistory}
            showHistory={showHistory}
            toggleHistory={toggleHistory}
            setExpression={setExpression}
            setLatestExpression={setLatestExpression}
          />
        }
        
        <div className="p-1.5 box-border w-full h-full flex flex-col bg-stone-900">
          <Header
            title="Calculator"
            toggleHistory={toggleHistory}
            isPinned={isPinned}
            togglePin={togglePin}
          />
          <Display latestExpression={latestExpression}>{expression}</Display>
          <Panel
            addToExpression={addToExpression}
            currentExpression={expression}
            setExpression={setExpression}
            addToHistory={addToHistory}
            setLatestExpression={setLatestExpression}
          />
        </div>
      </div>
    </Movable>
  )
}