function drawCanvas() {
	canvas = document.getElementById('micanvas');
	canvas.addEventListener("click", play, false);
	gameBoard=new GameBoard();
	player=0;
	
	sideSize = canvas.width = canvas.height = window.innerWidth / 3;
	cellSize=canvas.width/3;
	
	if (canvas.getContext) {
		
		ctx = canvas.getContext("2d");

		for (i = 1; i < 3; i++) {
			ctx.lineWidth = 2;

			//Verticales
			ctx.beginPath();
			ctx.moveTo(i * cellSize, 0);
			ctx.lineTo(i * cellSize, sideSize);
			ctx.stroke();
			ctx.closePath();

			//Horizontales
			ctx.beginPath();
			ctx.moveTo(0, i * cellSize);
			ctx.lineTo(sideSize, i * cellSize);
			ctx.stroke();
			ctx.closePath();
		}
	}
}

function play(e) {
	
	var cell = getClickedCell(e);
	
	var cellExists=false;
	
	if(!gameBoard[(10*cell.x)+cell.y]){
		gameBoard[(10*cell.x)+cell.y]=cell;
		if (player == 0) {
			new PlayerAFigure(cell);
			cell.player = player = 1;
		} else {
			new PlayerBFigure(cell);
			cell.player = player = 0;
		}
		evaluateWinner();
	}
}

function evaluateWinner(){
	if(gameBoard.length()>4){
		alert("Eval winner");
	}
}

function getClickedCell(e){
	
	var x;
	var y;
	if (e.pageX || e.pageY) {
		x = e.pageX;
		y = e.pageY;
	} else {
		x = e.clientX + document.body.scrollLeft
				+ document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop
				+ document.documentElement.scrollTop;
	}

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;
	
	var cell = new Cell(Math.floor(x/cellSize), Math.floor(y/cellSize));
	
	return cell;
}

function Cell(x, y){
	this.x=x;
	this.y=y;
	this.player=player;
}

function GameBoard(){
	this.length = function(){
		var count = -1;
		for (var k in this) {
		    if (this.hasOwnProperty(k)) {
		       ++count;
		    }
		}
		return count;
	}
}

function PlayerAFigure(cell){
	
	ctx.beginPath();
	ctx.arc(cellSize/2+cell.x*cellSize,cellSize/2+cell.y*cellSize,cellSize/2,0,Math.PI+(Math.PI*3)/2,false);
	ctx.fill();
	ctx.closePath();
	
}
function PlayerBFigure(cell){
	
	ctx.beginPath();
	ctx.arc(cellSize/2+cell.x*cellSize,cellSize/2+cell.y*cellSize,cellSize/2,0,Math.PI+(Math.PI*3)/2,false);
	ctx.stroke();
	ctx.closePath();
	
}