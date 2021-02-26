import { FC, useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

import { SimpleCard } from "./SimpleCard";

const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
};

const handleStyle = {
  backgroundColor: "green",
  width: "1rem",
  height: "1rem",
  display: "inline-block",
  marginRight: "0.75rem",
  cursor: "move",
};

export interface CardProps {
  id: any;
  text: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  hoverIndex: number;
  setHoverIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}
export const Card: FC<CardProps> = ({
  id,
  text,
  index,
  moveCard,
  hoverIndex,
  setHoverIndex,
}) => {
  const refx = useRef<HTMLDivElement>(null);
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {};
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      /*if (!refx.current) {
        return;
      }
      */
      //const dragIndex = item.index;
      //const hoverIndex = index;

      setHoverIndex(index);

      // Don't replace items with themselves
      //if (dragIndex === hoverIndex) {
      //  return;
      //}
    },
    //ここがとてもキモです．
    drop(item: DragItem, monitor: DropTargetMonitor) {
      console.log("from = ", item!.index);
      console.log("to = ", index);
      setHoverIndex(-1); //HoverIndexをリセットする.
      moveCard(item!.index, index);
    },
  });

  const [{ opacity }, drag, preview] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor: any) => ({
      endDrop: monitor.didDrop(),
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  });

  console.log(text, hoverIndex);

  return (
    <div ref={preview}>
      <SimpleCard
        text={text}
        drop={drop}
        drag={drag}
        opacity={opacity}
        isHover={hoverIndex === index}
      />
    </div>
  );
};
