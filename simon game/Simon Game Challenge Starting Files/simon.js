buttonColors = ["green", "red", "blue", "yellow"]

var gamePattern = []

var userClickedPattern = [];

var startGame = false;
var level=0;

$(document).keypress(function(){
	if (!startGame){
		$("#level-title").text("Level " + level) ;
		nextSequence();
		startGame = true;
	}
});

$(".btn").click(function(){
	var userChosenColor=$(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkPush(userClickedPattern.length-1);

});

function checkPush(currentLevel){
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      console.log("wrong");

	playSound("wrong");
	$("body").addClass("game-over");
	setTimeout(function(){
		$("body").removeClass("game-over");
	},200);
	$("#level-title").text("You Lose, Try again!");
   	gameOver()
   }


	
}





function nextSequence(){
	userClickedPattern = [];
	level++;
	$("#level-title").text("Level " + level);
	var randomNum = Math.floor(Math.random()*4);
	var randomChosenColor = buttonColors[randomNum];

	gamePattern.push(randomChosenColor);

 	$("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
 	var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
 	playSound(randomChosenColor);
}


function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor){
	$("#" + currentColor).addClass("pressed");
	setTimeout(function() {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
 };

 function gameOver(){
 	level = 0;
 	gamePattern=[];
 	startGame=false;
 }