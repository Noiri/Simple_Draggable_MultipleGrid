import { FC } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { SimpleCard } from "./SimpleCard";

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
  const [_, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {};
    },
    hover(item: DragItem, monitor: DropTargetMonitor) {
      setHoverIndex(index);
    },
    drop(item: DragItem, monitor: DropTargetMonitor) {
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
