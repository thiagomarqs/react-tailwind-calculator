import { Button } from "./Button";
import { ReactComponent as HistoryIcon } from "../assets/icons/history.svg";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";

type Props = {
  title: string
}

export const Header = (props: Props) => {
  const { title } = props;

  return (
    <div className="flex justify-between py-3">
      <div className="flex justify-between items-center p-0">
        <Button className="py-1 px-0 mx-2"><MenuIcon/></Button>
        <h1 className="text-2xl text-white font-semibold">{title}</h1>
      </div>
      <Button><HistoryIcon/></Button>
    </div>
  )
}