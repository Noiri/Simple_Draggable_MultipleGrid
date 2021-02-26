import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core/";

//for view of drag handler.
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { SvgIcon } from "@material-ui/core";

//dnd types
import { ConnectDropTarget, ConnectDragSource } from "react-dnd";

//css
import "./main.css";

export const useStyles = makeStyles({
  root: {
    minWidth: 230,
    minHeight: 400,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type Props = {
  text: string;
  drop: ConnectDropTarget;
  drag: ConnectDragSource;
  opacity: number;
  isHover: boolean;
};

export const SimpleCard: FC<Props> = ({
  text,
  drop,
  drag,
  opacity,
  isHover,
}) => {
  const classes = useStyles();

  return (
    <div ref={drop} style={{ opacity }}>
      <Card className={classes.root} raised={isHover}>
        <CardActions>
          <div ref={drag} style={{ cursor: "move" }}>
            <SvgIcon component={DragHandleIcon} />
          </div>
          <Button color="primary" size="small">
            Edit
          </Button>
          <Button color="secondary" size="small">
            Remove
          </Button>
        </CardActions>
        <CardContent>
          <Typography variant="h5" component="h2">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};
