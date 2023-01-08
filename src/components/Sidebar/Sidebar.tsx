import { PropsWithChildren } from "react";
import { Overlay } from "../Overlay";

interface Props extends PropsWithChildren{
  showSidebar: boolean;
  toggleSidebar: Function;
}

export const Sidebar = (props: Props) => {

  const {showSidebar, toggleSidebar, children} = props;

  return (
    <>
      <div className={`absolute z-20 w-80 p-1 h-full rounded-r-lg bg-stone-700 transition-left duration-500 ${showSidebar ? "left-0" : "-left-full"}`}>
        {children}
      </div>
      <Overlay showOverlay={showSidebar} onClick={() => toggleSidebar()} />
    </>
  )
}