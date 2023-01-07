import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  theme: "dark" | "light" | "simple";
  className?: string;
  onClick: Function;
}

const classNameByType = {
  dark: "bg-stone-800 hover:bg-stone-700",
  light: "bg-stone-700 hover:bg-stone-800",
  simple: ""
}

export const Button = (props: Props) => {

  const { theme: type, onClick, className } = props;
  const classes = `${classNameByType[type]} ${className? className : ""}`;

  return (
    <button onClick={() => onClick()} className={`p-3 text-white rounded-md ${classes}`}>{props.children}</button>
  )
}