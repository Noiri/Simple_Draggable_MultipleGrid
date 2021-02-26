import React, { FC, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

export const useStyles = makeStyles({
  root: {
    minWidth: 200,
    minHeight: 400,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type Props = {
  cards: {
    id: number;
    text: string;
  }[];
  setCards: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        text: string;
      }[]
    >
  >;
};

export const AddButton: FC<Props> = ({ cards, setCards }) => {
  const classes = useStyles();

  const addNewMemo = useCallback(() => {
    setCards([
      ...cards,
      { id: cards.length + 1, text: `id: ${cards.length + 1}` },
    ]);
  }, [cards]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Button color="primary" size="small" onClick={addNewMemo}>
          Add Memo
        </Button>
      </CardContent>
    </Card>
  );
};
