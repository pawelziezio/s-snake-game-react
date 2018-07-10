import React, { Component } from 'react';
import './App.css';
import { GridCell } from './Grid-cell';

class App extends Component {

  	constructor(props) {
    	super(props);
    	this.state = {
      	snake: [[10,10]],
      	apple: [0,0],
      	bombs: [],
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
				let appleCell = this.state.apple[0] === x && this.state.apple[1] === y;
				let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === y);
				snakeCell = !!snakeCell.length;
				let bombCell;

				cells.push(
					<GridCell
						appleCell={appleCell}
						snakeCell={snakeCell}
						bombCell={bombCell}
						key={x + " " + y}
					/>
				)
			}
		}

		let overlay;
    	if (this.state.status === 0) {
      		overlay = (
        		<div className="game__board-overlay">
          			<button onClick={this.startGame}>START NEW GAME!</button>
        		</div>
      		);
    	} else if (this.state.status === 2) {
      		overlay = (
        		<div className="gamer__board-overlay">
          			<div className="mb-1"><b>GAME OVER!</b></div>
          			<div className="mb-1">Your score: {this.state.snake.length} </div>
          			<button onClick={this.startGame}>Start a new game</button>
        		</div>
      		);
    	}

    	return (
      		<div className="snake__app">
			  	{overlay}
				<div className="game__grid">
					{cells}
        		</div>
      		</div>
    	);
  	}

}

export default App;
