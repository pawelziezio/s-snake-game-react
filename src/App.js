import React, { Component } from 'react';
import './App.css';
import { GridCell } from './Grid-cell';
import { collisionTest, randomPositionXY, leadingZero } from './Functions';
import Results from './Results';

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
		speed: 400,
      	results: []
    	};

		this.startGame = this.startGame.bind(this);
		this.moveSnake = this.moveSnake.bind(this);
		this.setDirection = this.setDirection.bind(this);
		this.showApple = this.showApple.bind(this);
		this.gameover = this.gameover.bind(this);
		this.addBomb = this.addBomb.bind(this);

  	}


	startGame() {
		this.setState({
      		status: 1,
      		snake: [[10,10]],
			bombs:[],
			speed: 400,
			direction: 1
    	});

		this.moveSnakeTimeoue = setTimeout(this.moveSnake, this.state.speed);
		this.addBombInterval = setInterval(this.addBomb, 30000);
		this.showApple();
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

		if(
			collisionTest(x, y, this.state.snake) ||
			collisionTest(x, y,this.state.bombs)
		){
			this.showApple();
		}else{
    		this.setState({ apple: [x, y] });
		}
  	}


	addBomb(){
		let newBomb = randomPositionXY(this.state.cellsX, this.state.cellsY);
		if(
			collisionTest(newBomb[0],newBomb[1],[this.state.apple]) ||
			collisionTest(newBomb[0],newBomb[1],this.state.snake) ||
			collisionTest(newBomb[0],newBomb[1],this.state.bombs)
		){
			this.addBomb();
		}else{
			let newBombsArray = [...this.state.bombs];
			newBombsArray.push(newBomb);
			this.setState({bombs: newBombsArray});
		}
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

			if(newSnake.length % 5 === 0) {
				let speed = this.state.speed / 1.25;
				this.setState({ speed })}
		}else{
			newSnake.push( ...this.state.snake);
			newSnake.pop();
		}

		if(	newSnake[0][0] < 0 ||
            newSnake[0][0] >= this.state.cellsX ||
            newSnake[0][1] < 0 ||
            newSnake[0][1] >=this.state.cellsY ||
            collisionTest(newSnake[0][0],newSnake[0][1],this.state.snake) ||
            collisionTest(newSnake[0][0],newSnake[0][1],this.state.bombs) ){
            // location.reload()

            this.gameover();
			return false;
        }

    	this.setState({ snake: newSnake });
		this.moveSnakeTimeout = setTimeout(this.moveSnake, this.state.speed);
	};


	gameover(){
		if (this.moveSnakeTimeout) clearTimeout(this.moveSnakeTimeout);
		if (this.addBombInterval) clearTimeout(this.addBombInterval);
		this.setState({ status : 2 });

		const currentDate = new Date();
		let score = this.state.snake.length;

        const currentDateText = leadingZero(currentDate.getDate()) +
            "." + leadingZero(currentDate.getMonth()+1) +
            "." + currentDate.getFullYear();

        const currentHourText = leadingZero(currentDate.getHours()) +
            ':' + leadingZero(currentDate.getMinutes()) +
            ':' + leadingZero(currentDate.getSeconds());

		const lastResult = [];
		lastResult.push(score, currentDateText, currentHourText);

		if( this.state.results.length > 0  ){

			let results = [...this.state.results]
			results.push(lastResult);
			results.sort( (a, b) => b[0] - a[0] );

			if(results.length > 10){
				results.pop();
			}

			localStorage.results = JSON.stringify(results);
			this.setState({ results });
		}else{
			localStorage.results = JSON.stringify([lastResult]);
			this.setState({ results: [lastResult] });
		}
	}


	componentDidMount(){
		document.addEventListener('keydown',this.setDirection);

		if(localStorage.results){
			this.setState({ results: JSON.parse(localStorage.results)})
		}
	}


  	render() {

		const cells = [];

		for (let x = 0; x < this.state.cellsX; x++){
			for(let y = 0; y < this.state.cellsY; y++){
				let appleCell = this.state.apple[0] === x && this.state.apple[1] === y;
				let snakeCell = this.state.snake.filter(c => c[0] === x && c[1] === y);
				snakeCell = !!snakeCell.length;
				let bombCell = this.state.bombs.filter(c => c[0] === x && c[1] === y);
				bombCell = !!bombCell.length;;

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
          			<button className="game__board-start-button"onClick={this.startGame}>START <br/> NEW GAME!</button>
        		</div>
      		);
    	} else if (this.state.status === 2) {
      		overlay = (
        		<div className="game__board-overlay">
          			<div className="game__board-info">GAME OVER!</div>
          			<div className="game__board-score">Your score: {this.state.snake.length} </div>
					<Results results={this.state.results}/>
          			<button className="game__board-gameover-button" onClick={this.startGame}>Start a new game!</button>
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
