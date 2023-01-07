import { PropsWithChildren, useEffect, useState } from "react"
import { Point } from "../models/Point";

interface Props extends PropsWithChildren {
  allowMove: boolean;
}

export const Movable = (props: Props) => {
  let shouldResetTranslate = false;
  const {allowMove} = props;
  useEffect(() => {
    
    if(!allowMove && !shouldResetTranslate) {
      shouldResetTranslate = true;
      setTranslate({x: 0, y: 0});
    }

    if(allowMove) {
      shouldResetTranslate = false;
    }

  }, [allowMove]);

  const [isPointerDown, setIsPointerDown] = useState(false);
  const [isPointerUp, setIsPointerUp] = useState(false);
  const [translate, setTranslate] = useState<Point>({x: 0, y: 0});

  const handlePointerDown = (e: any) => {   
    setIsPointerDown(true);
    setIsPointerUp(false);
  }

  const handlePointerUp = (e: any) => {
    setIsPointerUp(true);
    setIsPointerDown(false);
  }

  const handlePointerMove = (e: any) => {
    if(!isPointerDown || !allowMove) return;   

    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY
    })
  }

  const handleMouseLeave = () => {
    setIsPointerDown(false);
    setIsPointerUp(true);
  }

  return (
    <div 
      className={`movable m-0 w-fit h-fit ${allowMove ? "cursor-move" : ""}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
      }}
    >
      {props.children}
    </div>
  )
}