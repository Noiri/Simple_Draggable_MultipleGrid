import { FC, useState, useCallback } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import { AddButton } from "./AddButton";

import "./main.css";

import { Init_data } from "../etc/Init_data";

export const Container: FC = () => {
  const [cards, setCards] = useState(Init_data);

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      //swap
      const x = dragIndex;
      const y = hoverIndex;
      setCards(
        update(update(cards, { $splice: [[x, 1, cards[y]]] }), {
          $splice: [[y, 1, cards[x]]],
        })
      );
    },
    [cards]
  );

  const [hoverIndex, setHoverIndex] = useState(-1);
  const renderCard = (card: { id: number; text: string }, index: number) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        moveCard={moveCard}
        hoverIndex={hoverIndex}
        setHoverIndex={setHoverIndex}
      />
    );
  };

  return (
    <div className="files-container">
      {cards.map((card, i) => renderCard(card, i))}
      <AddButton cards={cards} setCards={setCards} />
    </div>
  );
};
