import { useEffect, useState } from "react"
import { Display } from "./Display"
import { Header } from "./Header"
import { Panel } from "./Panel"

export interface CalculatorHistoryEntry {
  expression: string;
  result: string | number;
}

export const Calculator = () => {
  const [expression, setExpression] = useState('0');
  const [history, setHistory] = useState<CalculatorHistoryEntry[]>([]);
  const [latestExpression, setLatestExpression] = useState<CalculatorHistoryEntry>({expression: "", result: ""});

  const addToHistory = (entry: CalculatorHistoryEntry) => {
    setHistory(history => {
      history.push(entry);
      return history;
    })

    setLatestExpression(entry);
  }

  return (
    <div className="box-border flex flex-col bg-stone-900 px-1 h-screen">
      <Header title="Calculator"/>
      <Display latestExpression={latestExpression}>{expression}</Display>
      <Panel 
        currentExpression={expression} 
        setExpression={setExpression} 
        addToHistory={addToHistory}
        setLatestExpression={setLatestExpression}
      />
    </div>
  )
}