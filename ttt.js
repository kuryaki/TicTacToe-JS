function drawCanvas() {
	canvas = document.getElementById('micanvas');
	canvas.addEventListener("click", play, false);
	cellsArray=new Array();
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
	
	//This code could be moved to a function... dont know how yet
	cellExists = cellsArray.some(function (myCell){
			return myCell.x === cell.x && myCell.y === cell.y;
	});
	
	if(!cellExists){
		cellsArray.push(cell);
		
		if(player==0){
			new EmptyCircle(cell);
			player=1;
		}else{
			new FilledCircle(cell);
			player=0;
		}
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
}

function FilledCircle(cell){
	
	ctx.beginPath();
	ctx.arc(cellSize/2+cell.x*cellSize,cellSize/2+cell.y*cellSize,cellSize/2,0,Math.PI+(Math.PI*3)/2,false);
	ctx.fill();
	ctx.closePath();
	
}
function EmptyCircle(cell){
	
	ctx.beginPath();
	ctx.arc(cellSize/2+cell.x*cellSize,cellSize/2+cell.y*cellSize,cellSize/2,0,Math.PI+(Math.PI*3)/2,false);
	ctx.stroke();
	ctx.closePath();
	
}