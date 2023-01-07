import { PropsWithChildren } from "react"
import { CalculatorHistoryEntry } from "../models/CalculatorHistoryEntry";

interface Props extends PropsWithChildren {
  latestExpression: CalculatorHistoryEntry;
}

export const Display = (props: Props) => {
  const {latestExpression} = props;
  const {expression} = latestExpression;

  return (
    <div className="text-white px-3 py-5 flex flex-col justify-between">
      <p className="text-end text-md text-bolder text-stone-600 mb-2">{expression ? `${expression} =` : "⠀"}</p>
      <p className="text-end text-5xl text-bolder md:text-7xl">{props.children}</p>
    </div>
  )
}