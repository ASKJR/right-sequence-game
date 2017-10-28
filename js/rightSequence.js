var roundNumber = 1;
var numberOfSquares = 9;
var correctSequence = [];
var clickNumber = 0;
var playerScore = 0;
var gameHasStarted = false;
var hints = 3;
var ranking = [];

$(function() {
	$('#startGameBtn').click(function(){
		gameInit();
		gameRandomSequence(roundNumber);
	});

	$('#rankingBtn').click(function(){
		displayRankingModal(rankingToHtml());
		//alert(ranking.toString());
	});

	//Players moves
	$('div.square').click(function(event){
		if (gameHasStarted) {
			squareId = this.id;
			beepSound(squareId-1);
			setTimeout(function(squareId){
	  			clickNumber++;
				if (squareId != correctSequence[clickNumber-1]) {
					gameOver();
				}
				else if (clickNumber == correctSequence.length) {
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
	paintSquares(getSquareIds(),false);
	gameHasStarted = true;
	setHintNumber(hints);
	hideStartBtn();
	hideRankingBtn();
	hideBottomMenuLine();
}

/**
 * paintSquares
 * @param  Array Int 
 * @return void
 */
function paintSquares(arraySquareIds,IsGameOver)
{
	for (var i = 0; i < arraySquareIds.length; i++) {
		if (!IsGameOver) {
			$('#' + arraySquareIds[i]).css('background-color',getRandomColor());
		}
		else {
			$('#' + arraySquareIds[i]).css('background-color','#000000');	
		}
	}
}

function hideStartBtn()
{
	$('#startGameBtn').hide();
}

function hideRankingBtn()
{
	$('#rankingBtn').hide();
}

function showStartBtn()
{
	$('#startGameBtn').show();	
}

function showRankingBtn()
{
	$('#rankingBtn').show();
}

function setHintNumber(number)
{
	$('#hintLink').text(number)
}

function hideBottomMenuLine()
{
	$('#bottomMenuLine').hide();
}

function showBottomMenuLine()
{
	$('#bottomMenuLine').show();	
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
	ranking.push(playerScore);
	ranking.sort();
	roundNumber = 1;
	numberOfSquares = 9;
	correctSequence = [];
	clickNumber = 0;
	playerScore = 0;
	gameHasStarted = false;
	hints = 3;
	setPlayerScore();
	setHintNumber(hints);
	showStartBtn();
	showRankingBtn();
	showBottomMenuLine();
	paintSquares(getSquareIds(),true);
	clearHintText();
	displayGameOverModal();
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
	swal({
  		title: 'Game Over :(',
		text: 'Try again :)',
		imageUrl: 'https://goo.gl/KMfQRV',
		imageWidth: 300,
		imageHeight: 300,
		imageAlt: 'game over image',
		animation: false,
		customClass: 'animated fadeInDown'
	})
}

function displayRankingModal(htmlRanking)
{
	swal({
		imageUrl: 'https://goo.gl/zQjGX3',
		imageWidth: 200,
		imageHeight: 200,
		imageAlt: 'game over image',
		animation: false,
		customClass: 'animated bounceInUp',
  		html: htmlRanking
	})
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

function rankingToHtml()
{
	var rankingHtml = "";
	var rankingPosition = 0;
	
	for (var i = ranking.length - 1; i >= 0; i--) {
		rankingPosition++;
		rankingHtml +="#" + rankingPosition + ". <b>" + ranking[i] + "pts</b>"+"<br>";
	}

	return rankingHtml;
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