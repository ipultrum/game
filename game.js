var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;

var level = 0;

var gameOver = false;

$(document).on("keypress", function(){
    if (started === false){
        nextSequence()};
        started = true;
        $("#level-title").text("Level " + level);
        hideButton();
    });

$(".startButton").on("click", function(){
    if (started === false){
        nextSequence()};
        started = true;
        $("#level-title").text("Level " + level);
        hideButton();
    });
    

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
};

$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
    var audio = new Audio ("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("succes");
        
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);

        }

    } else {
        console.log("wrong");
        var audio = new Audio ("./sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        showButton();
    }

}

function startOver() {
    level = 0; 
    gamePattern = [];
    started = false;
    console.log("gameover");
} 

function hideButton() {
    $(".startButton").addClass("hide");
}

function showButton (){
    $(".startButton").removeClass("hide");
}




