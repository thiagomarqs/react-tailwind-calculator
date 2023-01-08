import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  customHoverClass?: string;
}

export const ListItem = (props: Props) => {

  const {customHoverClass} = props;

  return (
    <div className={`group rounded-lg text-white my-2 py-2 px-3 ${customHoverClass ? customHoverClass: "hover:bg-stone-800"}`}>
      <div className="transition-scale duration-75 group-active:scale-95">
        {props.children}
      </div>
    </div>
  )
}