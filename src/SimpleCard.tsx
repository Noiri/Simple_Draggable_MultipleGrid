import React, { FC } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//for view of drag handler.
import DragHandleIcon from "@material-ui/icons/DragHandle";
import { SvgIcon } from "@material-ui/core";

//dnd types
import { ConnectDropTarget, ConnectDragSource } from "react-dnd";

//css
import "./main.css";

import { Shadows } from "@material-ui/core/styles/shadows";

const handleStyle = {
  backgroundColor: "green",
  width: "1rem",
  height: "1rem",
  display: "inline-block",
  marginRight: "0.75rem",
  cursor: "move",
};

/*
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      elevation1: { BoxShadow: "6px 6px #668AD8" },
    },
  },
});
*/

//const elev: string[] = Array.from(Array(25).keys()).map((c) => "none");

/*
const shadowArray: Shadows = [
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
  "none",
];

const theme = createMuiTheme({
  shadows: shadowArray,
});

*/

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
