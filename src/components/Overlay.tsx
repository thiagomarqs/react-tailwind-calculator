interface Props {
  showOverlay: boolean;
  onClick: () => void;
}

export const Overlay = (props: Props) => {
  const {onClick, showOverlay} = props;
  
  return(
    <div onClick={onClick} className={`absolute z-10 bg-black w-screen h-screen transition-all duration-500 ${showOverlay ? "opacity-20" : "opacity-0 hidden"}`} />
  )
}