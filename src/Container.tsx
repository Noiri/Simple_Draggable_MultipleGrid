import { FC, useState, useCallback } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import { AddButton } from "./AddButton";

import "./main.css";

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

export const Container: FC = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      text: "id:1",
    },
    {
      id: 2,
      text: "id:2",
    },
    {
      id: 3,
      text: "id:3",
    },
    {
      id: 4,
      text: "id:4",
    },
    {
      id: 5,
      text: "id:5",
    },
    {
      id: 6,
      text: "id:6",
    },
    {
      id: 7,
      text: "id:7",
    },
  ]);

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
