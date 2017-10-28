//==================================
//GAME      : Right Sequence
//DEVELOPER : Alberto Kato
//CONTACT   : albertokatojr [at] gmail [dot] com
//CREATED_AT: Oct-28-2017
//LIBS      : JQuery
//==================================

//==================================
//GLOBAL VARIABLES
//==================================
var roundNumber = 1;
var numberOfSquares = 9;
var correctSequence = [];
var clickNumber = 0;
var playerScore = 0;
var gameHasStarted = false;
var hints = 3;
var ranking = [];

//==================================
//ONCLICK EVENTS
//==================================
$(function() {
	$('#startGameBtn').click(function(){
		gameInit();
		gameRandomSequence(roundNumber);
	});

	$('#rankingBtn').click(function(){
		displayRankingModal(rankingToHtml());
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
					setTextElements([{'id':'playerScore','text':playerScore},{'id':'hintText','text':''}])
					gameRandomSequence(roundNumber);
				}	
			}.bind(this, squareId), 2000);
		}
	});
	
	$('#hintLink').click(function(){
		if (gameHasStarted && hints > 0) {
			hints--;
			setTextElements([{'id':'hintLink','text':hints},{'id':'hintText','text':'Hint: '+correctSequence.toString()}]);
			displayHintModal(correctSequence.toString());
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
	setTextElements([{'id':'hintLink','text':hints}]);
	hideElementsById(['startGameBtn','rankingBtn','bottomMenuLine']);
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

/**
 * hideElementsById
 * @param  String Array elementIdsArray
 * @return Void                 
 */
function hideElementsById(elementIdsArray)
{
	if (!elementIdsArray)	{
		return;
	}
	for (var i = 0; i < elementIdsArray.length; i++) {
		$('#'+elementIdsArray[i]).hide();
	}
	
}

/**
 * showElementsById
 * @param  String Array elementIdsArray
 * @return Void
 */
function showElementsById(elementIdsArray)
{
	if (!elementIdsArray)	{
		return;
	}
	for (var i = 0; i < elementIdsArray.length; i++) {
		$('#'+elementIdsArray[i]).show();
	}
}

/**
 * setTextElements
 * @param Array Object:{id,text} arrayElementText
 * @return Void
 */
function setTextElements(arrayElementText)
{
	if (!arrayElementText) {
		return;
	}
	for (var i = 0; i < arrayElementText.length; i++) {
		$('#'+arrayElementText[i].id).text(arrayElementText[i].text);
	}
}

//==================================
//GAME LOGIC
//==================================
/**
 * gameRandomSequence
 * @param  {[Int]} roundNumber
 * @return {[Void]}
 */
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

/**
 * gameOver
 * @return Void
 */
function gameOver()
{
	ranking.push(playerScore);
	ranking.sort();
	setGlobalVariablesToDefaultValue();
	setTextElements([{'id':'playerScore','text':playerScore},{'id':'hintLink','text':hints},{'id':'hintText','text':''}]);
	showElementsById(['startGameBtn','rankingBtn','bottomMenuLine']);
	paintSquares(getSquareIds(),true);
	displayGameOverModal();
}

/**
 * setGlobalVariablesToDefaultValue required to start a new game 
 */
function setGlobalVariablesToDefaultValue() {
	roundNumber = 1;
	numberOfSquares = 9;
	correctSequence = [];
	clickNumber = 0;
	playerScore = 0;
	gameHasStarted = false;
	hints = 3;
	clickAllowed = false;
}
//==================================
//MESSAGE MODALS
//==================================
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
//==================================
//UTILS
//==================================

/**
 * randomIndex
 * @param  {[Int]} maxNumberOfElements
 * @return {[Int]}
 */
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

/**
 * rankingToHtml builds ranking in HTML
 * @return {[HTML]}
 */
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

/**
 * beepSound
 * @param  {[Int]} index 
 * @return {[Audio]}       [returns a sound]
 */
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