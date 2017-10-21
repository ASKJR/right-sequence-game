
$(function() {
	$('#startGameBtn').click(function(){
		gameInit();
	});
});




//==================================
//GAME INIT
//==================================

/**
 * gameInit : Prepares everything to start up the game  
 * @return Void
 */
function gameInit()
{
	paintSquares(getSquareIds());
}

/**
 * getSquareIds 
 * @return Array Int
 */
function getSquareIds()
{
	var squareIds = [];
	$('div.square').each(function(){
		squareIds.push(this.id);
	});

	return squareIds;
}


/**
 * paintSquares
 * @param  Array Int 
 * @return void
 */
function paintSquares(arraySquareIds)
{
	for (var i = 0; i < arraySquareIds.length; i++) {
		$('#' + arraySquareIds[i]).css('background-color',getRandomColor());
	}
}

/**
 * getRandomColor: credit https://stackoverflow.com/questions/1484506/random-color-generator
 * @return String color in Hex.
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}








