import { CalculatorHistoryEntry } from "../../models/CalculatorHistoryEntry";
import { Button } from "../Button";
import { HistoryItem } from "./HistoryItem";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { v4 as uuid } from 'uuid';
import { Overlay } from "../Overlay";

interface Props {
  showHistory: boolean;
  history: CalculatorHistoryEntry[];
  clearHistory: any;
  toggleHistory: () => void;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  setLatestExpression: React.Dispatch<React.SetStateAction<CalculatorHistoryEntry>>;
}

export const History = (props: Props) => {

  const { 
    showHistory, 
    history, 
    clearHistory, 
    toggleHistory, 
    setExpression,
    setLatestExpression
  } = props;

  return (
    <>
      <div className={`absolute z-20 w-screen rounded-lg m-0 left-0 h-2/3 py-2 px-1 bg-stone-900 transition-top duration-300 lg:static lg:top-0 lg:opacity-100 lg:h-screen lg:w-full lg:rounded-none lg:order-last lg:max-w-sm lg:transition-none ${showHistory ? "opacity-100 top-1/3" : "opacity-0 top-full"}`}>
        <div className="h-full">
          {history.length == 0 && <p className="px-2 text-white">There's no history yet.</p>}
          {history.length > 0 &&
            <div className="h-full grid grid-rows-2 grid-cols-1">
              <div className="row-span-2 overflow-y-scroll">
                {history.map(entry => <HistoryItem key={uuid()} entry={entry} setExpression={setExpression} setLatestExpression={setLatestExpression}/>)}
              </div>
              <div className="bottom-0 w-full py-4 text-right text-white">
                <Button theme={"simple"} onClick={clearHistory} className={"p-1"}><Trash/></Button>
              </div>
            </div>
          }
        </div>
      </div>
      <Overlay showOverlay={showHistory} onClick={toggleHistory} />
    </>
  )
}