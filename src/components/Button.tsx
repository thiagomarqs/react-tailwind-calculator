import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
  theme: "dark" | "light" | "simple";
  onClick: Function;
  className?: string;
  name?: string;
}

const classNameByType = {
  dark: "bg-stone-800 hover:bg-stone-700",
  light: "bg-stone-700 hover:bg-stone-800",
  simple: ""
}

export const Button = (props: Props) => {

  const { theme: type, onClick, className, name } = props;
  const classes = `${classNameByType[type]} ${className? className : ""}`;

  return (
    <button title={name ? name : ""} onClick={() => onClick()} className={`p-3 text-white rounded-md ${classes}`}>{props.children}</button>
  )
}