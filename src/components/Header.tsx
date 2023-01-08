import { Button } from "./Button";
import { ReactComponent as HistoryIcon } from "../assets/icons/history.svg";
import { ReactComponent as MenuIcon } from "../assets/icons/menu.svg";
import { ReactComponent as ResizeIcon } from "../assets/icons/resize.svg";

type Props = {
  title: string
  toggleHistory: Function
  toggleSidebar: Function
  isPinned: boolean
  togglePin: Function
}

export const Header = (props: Props) => {
  const { title, toggleHistory, toggleSidebar, isPinned, togglePin } = props;

  return (
    <div className="flex justify-between py-3">
      <div className="flex justify-between items-center p-0">
        {!isPinned && <Button theme="simple" className="py-1 px-0 mx-2" onClick={toggleSidebar}><MenuIcon/></Button>}
        {!isPinned && <h1 className="text-2xl text-white font-semibold">{title}</h1>}
        <Button theme={"simple"} name="Pin calculator" onClick={togglePin} className="p-2 mx-1 hover:bg-gray-800"><ResizeIcon/></Button>
      </div>
      {!isPinned && <Button theme={"simple"} onClick={toggleHistory} className="sm:hidden"><HistoryIcon/></Button>}
    </div>
  )
}