import { ReactElement } from "react";
import { ListItem } from "../Base/ListItem";
import { SidebarItemModel } from "../props/SidebarItemProps";

interface Props extends SidebarItemModel {
  icon: ReactElement;
  onClick: () => void;
}

export const SidebarItem = (props: Props) => {

  const { icon, onClick, title } = props;

  return (
    <div onClick={onClick}>
      <ListItem customHoverClass="hover:bg-stone-600">
        <div className="flex items-center">
          <span className="mr-3">{icon}</span>
          <span>{title}</span>
        </div>
      </ListItem>
    </div>
  )
}