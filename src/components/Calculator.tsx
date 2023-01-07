import { useState } from "react";
import { CalculatorHistoryEntry } from "../models/CalculatorHistoryEntry";
import { Display } from "./Display";
import { Header } from "./Header";
import { History } from "./History/History";
import { Panel } from "./Panel";

export const Calculator = () => {
  const [expression, setExpression] = useState('0');
  const [history, setHistory] = useState<CalculatorHistoryEntry[]>([]);
  const [latestExpression, setLatestExpression] = useState<CalculatorHistoryEntry>({ expression: "", result: "" });
  const [showHistory, setShowHistory] = useState(false);

  const addToHistory = (entry: CalculatorHistoryEntry) => {
    setHistory(history => {
      const newHistory = [...history];
      newHistory.push(entry);
      return newHistory;
    })

    setLatestExpression(entry);
  }

  const toggleHistory = () => setShowHistory(current => !current);

  const clearHistory = () => setHistory([]);

  return (
    <div className="absolute w-screen h-screen overflow-hidden lg:flex ">
      <History
        history={history}
        clearHistory={clearHistory}
        showHistory={showHistory}
        toggleHistory={toggleHistory}
        setExpression={setExpression}
        setLatestExpression={setLatestExpression}
      />
      <div className="p-1.5 box-border w-full h-full flex flex-col bg-stone-900">
        <Header
          title="Calculator"
          toggleHistory={toggleHistory}
        />
        <Display latestExpression={latestExpression}>{expression}</Display>
        <Panel
          currentExpression={expression}
          setExpression={setExpression}
          addToHistory={addToHistory}
          setLatestExpression={setLatestExpression}
        />
      </div>
    </div>
  )
}