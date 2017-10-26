var roundNumber = 1;
var numberOfSquares = 9;
var correctSequence = [];
var clickNumber = 0;
var playerScore = 0;
var gameHasStarted = false;
var hints = 3;

$(function() {
	$('#startGameBtn').click(function(){
		gameInit();
		gameRandomSequence(roundNumber);
	});

	//Players moves
	$('div.square').click(function(){
		if (gameHasStarted) {
			squareId = this.id;
			beepSound(squareId-1);
			setTimeout(function(squareId){
	  			clickNumber++;
				if (squareId != correctSequence[clickNumber-1]) {
					roundNumber = 1;
					correctSequence = [];
					playerScore = 0;
					clickNumber = 0;
					setPlayerScore();
					gameOver();
				}
				if (clickNumber == correctSequence.length) {
					roundNumber++;
					clickNumber = 0;
					correctSequence = [];
					incrementScore();
					setPlayerScore();
					gameRandomSequence(roundNumber);
					clearHintText();
				}	
			}.bind(this, squareId), 2000);
		}
	});
	
	$('#hintLink').click(function(){
		if (gameHasStarted && hints > 0) {
			hints--;
			setHintNumber(hints);
			displayHintModal(correctSequence.toString());
			displayHintText(correctSequence.toString());
		}
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
	gameHasStarted = true;
	setHintNumber(hints);
	hideStartBtn();
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

function hideStartBtn()
{
	$('#startGameBtn').hide();
}

function setHintNumber(number)
{
	$('#hintLink').text(number)
}

//==================================
//GAME LOGIC
//==================================
function gameRandomSequence(roundNumber)
{
	squareIds = getSquareIds();
	for (var i = 0; i < roundNumber; i++) {	
    	setTimeout(function() { 
    		return function() { 
    			index = randomIndex(numberOfSquares);
    			squareId = squareIds[index];
    			beepSound(index);
    			correctSequence.push(squareId);
    			$('#' + squareId).effect("shake" ,{times:4}, 2000); 
    		}; 
    	}(i), 3000*i);
	}
}

function incrementRoundNumber()
{
	roundNumber++;
}

function incrementScore() 
{
	playerScore++;
}

function setPlayerScore()
{
	$('#playerScore').text(playerScore);
}

function gameOver()
{
	alert('Você perdeu :(');
	window.location.reload();
	//displayGameOverModal();
	
}

function displayHintModal(hintSequence)
{
	swal({
  		title: 'HINT!',
		text: hintSequence,
		imageUrl: 'img/gameHint.png',
		imageWidth: 250,
		imageHeight: 250,
		imageAlt: 'board layout',
		animation: false,
		customClass: 'animated tada'
	})
}

function displayGameOverModal()
{
	// swal({
 //  		title: 'Game Over!',
	// 	text: 'Try again...',
	// 	imageUrl: 'img/gameHint.png',
	// 	imageWidth: 250,
	// 	imageHeight: 250,
	// 	imageAlt: 'board layout',
	// 	animation: false,
	// 	customClass: 'animated tada'
	// }).then(function () {
 // 		window.location.reload();
	// })

}

function displayHintText(hintSequence)
{
	$('#hintText').text('Hint: ' + hintSequence);
}

function clearHintText()
{
	$('#hintText').text('');	
}

//==================================
//UTILS
//==================================
function randomIndex(maxNumberOfElements)
{
	return Math.floor(Math.random() * maxNumberOfElements);
}

/**
 * getRandomColor: credit https://stackoverflow.com/questions/1484506/random-color-generator
 * @return String color in Hex.
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[randomIndex(16)];
  }
  return color;
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

function beepSound(index)
{
	var baseUrl = "http://www.soundjay.com/button/";
	var audio = [
		"beep-01a.mp3", 
		"beep-02.mp3", 
		"beep-03.mp3", 
		"beep-04.mp3", 
		"beep-05.mp3", 
		"beep-06.mp3", 
		"beep-07.mp3", 
		"beep-08b.mp3", 
		"beep-09.mp3"
	];
	new Audio(baseUrl + audio[index]).play();
}