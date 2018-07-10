import React from 'react';

function GridCell(props) {
  	const classes = `grid__cell
    	${props.foodCell ? "grid__cell-food" : ""}
    	${props.foodCell ? "grid__cell-food" : ""}
    	${props.bombCell ? "grid__cell-snake" : ""}
    `;

    return (
        <div className={classes} />
  );
}

export { GridCell };