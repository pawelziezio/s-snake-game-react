import React from 'react';

function GridCell(props) {
  	const classes = `grid__cell
    	${props.snakeCell ? "grid__cell-snake" : ""}
    	${props.appleCell ? "grid__cell-apple" : ""}
    	${props.bombCell ? "grid__cell-bomb" : ""}
    `;

    return (
        <div className={classes} />
  );
}

export { GridCell };