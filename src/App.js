import React, { Component } from 'react';
import './App.css';
import { GridCell } from './Grid-cell';
import { collisionTest } from './Functions';

class App extends Component {

  	constructor(props) {
    	super(props);
    	this.state = {
      	snake: [],
      	apple: [],
      	bombs: [],
      	// 0 = not started, 1 = in progress, 2= finished
      	status: 0,
      	//initial heading 1 - N, 2 - E, 3 - S, 4 - w
      	direction: 1,
      	cellsX: 20,
      	cellsY: 20,
      	clickable: true
    	};

		this.startGame = this.startGame.bind(this);
		this.moveSnake = this.moveSnake.bind(this);
		this.setDirection = this.setDirection.bind(this);
		this.showApple = this.showApple.bind(this);

  	}


	startGame() {

		this.moveSnakeInterval = setInterval(this.moveSnake, 400);
		this.showApple();

		this.setState({
      		status: 1,
      		snake: [[10,10],[11,10],[12,10],[13,10]],
    	});
	}


	setDirection(e){
		switch(e.keyCode) {
			case 37:
				if(this.state.direction !== 2) this.setState({direction: 4});
				break;
			case 38:
				if(this.state.direction !== 3) this.setState({direction: 1});
				break;
			case 39:
				if(this.state.direction !== 4) this.setState({direction: 2});
				break;
			case 40:
				if(this.state.direction !== 1) this.setState({direction: 3});
				break;
			default:
				break;
		}
    }


	showApple() {
    	const x = Math.floor(Math.random() * this.state.cellsX);
    	const y = Math.floor(Math.random() * this.state.cellsY);
    	this.setState({ apple: [x, y] });
  	}


	moveSnake() {
		const newSnake = [];
		// set in the new "head" of the snake
		switch (this.state.direction) {
			// down
			case 4:
				newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] - 1];
				break;
				// up
			case 1:
				newSnake[0] = [this.state.snake[0][0]-1, this.state.snake[0][1] ];
				break;
				// right
			case 2:
				newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1] + 1];
				break;
				// left
			case 3:
				newSnake[0] = [this.state.snake[0][0] +1, this.state.snake[0][1]];
				break;
			default:
        		newSnake[0] = [this.state.snake[0][0], this.state.snake[0][1]];
				break;
		}

		if( collisionTest(this.state.apple[0],this.state.apple[1],newSnake) ){
			newSnake.push( ...this.state.snake);
			this.showApple();
		}else{
			newSnake.push( ...this.state.snake);
			newSnake.pop();
		}

    	this.setState({ snake: newSnake });
	};

	componentDidMount(){
		document.addEventListener('keydown',this.setDirection);
	}

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
      		<div className = "snake__game">
				<header className = "snake__game-header">
					<h1>SNAKE</h1>
					<div>
						<span>score:</span>
						<span className="snake__game-score">{this.state.snake.length}</span>
					</div>
				</header>
			  	{overlay}

				<div className="game__grid">
					{cells}
        		</div>
      		</div>
    	);
  	}

}

export default App;
