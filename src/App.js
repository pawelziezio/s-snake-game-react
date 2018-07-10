import React, { Component } from 'react';
import './App.css';
import { GridCell } from './Grid-cell';

class App extends Component {

  	constructor(props) {
    	super(props);
    	this.state = {
      	snake: [],
      	food: [],
      	bombsArray: [],
      	// 0 = not started, 1 = in progress, 2= finished
      	status: 0,
      	//initial heading 1 - N, 2 - E, 3 - S, 4 - w
      	direction: 1,
      	cellsX: 20,
      	cellsY: 20,
      	clickable: true
    	};
  	};

  	render() {

		const cells = [];

		for (let x = 0; x < this.state.cellsX; x++){
			for(let y = 0; y < this.state.cellsY; y++){
				const foodCell = this.state.food[0] === x && this.state.food[1] === y;
				let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === y);
				snakeCell = !!snakeCell.length;

				cells.push(
					<GridCell
						foodCell={foodCell}
						snakeCell={snakeCell}
						key={x + " " + y}
					/>
				)
			}
		}

    	return (
      		<div className="snake__app">
				<div className="game__grid">
					{cells}
        		</div>
      		</div>
    	);
  	}

}

export default App;
