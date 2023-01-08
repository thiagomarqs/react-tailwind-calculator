import { CalculatorHistoryEntry } from "../../models/CalculatorHistoryEntry"
import { ListItem } from "../Base/ListItem";

interface Props {
  entry: CalculatorHistoryEntry;
  setExpression: React.Dispatch<React.SetStateAction<string>>;
  setLatestExpression: React.Dispatch<React.SetStateAction<CalculatorHistoryEntry>>
}

export const HistoryItem = (props: Props) => {
  const {entry, setExpression, setLatestExpression} = props;
  const {expression, result} = entry;
  const onClick = () => {
    setExpression(`${result}`);
    setLatestExpression(entry);
  }

  return (
    <div onClick={onClick} className="group rounded-lg text-end text-white my-2 py-2 px-3 hover:bg-stone-800">
      <ListItem>
        <div className="text-gray-400 tracking-widest">{expression} =</div>
        <div className="text-gray-50 font-bold text-xl">{result}</div>
      </ListItem>
    </div>
  )
}