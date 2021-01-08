import React from "react";
import Col from "./col.jsx";

var Row = (props) => {
  var arr = [];
  // if (props.hasOwnProperty('handlePlacerMouseEnter')) {
  for (let i = 0; i < props.col; i++) {
    arr[i] = (
      <Col
        x={props.row}
        y={i}
        handlePlacerMouseEnter={props.handlePlacerMouseEnter}
        handlePlacerMouseLeave={props.handlePlacerMouseLeave}
        handlePlaceDisc={props.handlePlaceDisc}
      />
    );
  }
  // }
  if (props.hasOwnProperty("rowAsArr")) {
    for (let i = 0; i < props.col; i++) {
      arr[i] = (
        <Col
          x={props.row}
          y={i}
          handlePlacerMouseEnter={props.handlePlacerMouseEnter}
          handlePlacerMouseLeave={props.handlePlacerMouseLeave}
          handlePlaceDisc={props.handlePlaceDisc}
          valueFromState={props.rowAsArr[i]}
        />
      );
    }
  } else {
    for (let i = 0; i < props.col; i++) {
      arr[i] = (
        <Col
          x={props.row}
          y={i}
          handlePlacerMouseEnter={props.handlePlacerMouseEnter}
          handlePlacerMouseLeave={props.handlePlacerMouseLeave}
          handlePlaceDisc={props.handlePlaceDisc}
        />
      );
    }
  }
  return <div className={props.type}>{arr}</div>;
};

export default Row;
