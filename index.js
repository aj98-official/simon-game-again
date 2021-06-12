var color = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userPattern = [];

var started = false;
var level = 0;

$(document).keydown(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(event) {
  var userChosenColor = event.target.id;
  userPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePressed(userChosenColor);
  checkAnswer(userPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userPattern = [];
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart!");
    startOver();
  }

}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
  userPattern = [];
}

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var chosenColor = color[randomNumber];
  gamePattern.push(chosenColor);
  $("." + chosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(chosenColor);
  level++;
  $("#level-title").text("level " + level);
}


function playSound(color) {
  var audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function animatePressed(button) {
  $("#" + button).addClass("pressed");
  setTimeout(function() {
    $("#" + button).removeClass("pressed");
  }, 100);
}
