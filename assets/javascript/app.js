// 1
// ask user a question
// give user several possible answers
// correct answer

// 2
// ask user a question
// give user several possible answers
// correct answer

// 3
// ask user a question
// give user several possible answers
// correct answer

// arr or obj

// when a user click start clear the html and show new content 
// add question and options
// check if user slects correct answer
// if they are correct
	//++ correct
	// show a message
	// clear the content again
	// currentRound++
	//  check if there are any question left
		// show the next question and options 
	// game over 
		// show finall stats 
// if the answer was incorrect or users run out of thime
	// ++ incorrect
	// show a message, shoew correct answer
	// clear content 
	// currentRound++
	//  check if there are any question left
		// show the next question and options 
	// game over 
		// show finall stats 


// ==========================================================================
// VARIABLES
// ==========================================================================

var quizData = [
	{
		question: "Who won the 1994 FIFA World Cup?",
		options: ["Italy", "Brazil", "Germany", "Argentina"],
		answer: 1

	},

	{
		question: "Which of these star soccer players has never played for Real Madrid?",
		options: ["David Beckham", "Zinedine Zidane", "Ronaldo", "Lionel Messi"],
		answer: 3

	},

	{
		question: "What are the home colors of the FC Barcelona soccer uniform?",
		options: ["Black and White", "Yellow and Blue", "Blue and Red", "All Blue"],
		answer: 2

	},

	// {
	// 	question: "Anfield is the home of which English Premier League club?",
	// 	options: ["Manchester United", "West Ham United", "Manchester City", "Liverpool"],
	// 	answer: 3

	// },

	// {
	// 	question: "According to the official FIFA rulebook, how long can a goalkeeper hold onto the ball for?",
	// 	options: ["5 seconds", "3 Seconds", "10 seconds", "30 seconds"],
	// 	answer: 0

	// },

	// {
	// 	question: "Which of these players has never played for Manchester United?",
	// 	options: ["Eric Cantona", "Bobby Charlton", "Ryan Giggs", "Bobby Moore"],
	// 	answer: 3

	// },

	// {
	// 	question: "Who won the 2014 FIFA World Cup?",
	// 	options: ["Germany","Brazil","France", "Argentina"],
	// 	answer: 0

	// },

	// {
	// 	question: "Who won the 2017 UEFA Champions League?",
	// 	options: ["Bercelona", "Real Madrid", "Juventus", "Manchester United"],
	// 	answer: 1

	// },

	// {
	// 	question: "Who won the 2016 best soccer player in the world?",
	// 	options: ["Lionel Messi", "Hazard", "Cristiano Ronaldo", "Neymar"],
	// 	answer: 2

	// },

	// {
	// 	question: "Where was the 2014 Fifa World Cup?",
	// 	options: ["Spain", "South Africa", "Germany", "Brazil"],
	// 	answer: 3

	// }
 ];

var correct = 0 ;
var incorrect = 0;
var unanswered = 0;
var currentRound = 0;
var counter = 15;
var userChoice;
var intervalId;
var counterWrap;


// ==========================================================================
// FUNCTIONS
// ==========================================================================

// countdown function
function countdown() {
	clearInterval(intervalId);
	intervalId = setInterval(decrement, 1000);
	function decrement() {
		counter--;
		$("#time").text("Time remaining: "+ counter);
	
		if (counter === 0) {
			console.log("Incorrect");
			$("#main-content").empty();
			clearInterval(intervalId);
			var showMwssage = $("<h2>");
			showMwssage.text("You got wrong, the correct answer is: " + quizData[currentRound].options[quizData[currentRound].answer]);
			$("#main-content").append(showMwssage);
			unanswered++;
			counter = 15;
			// Set a time out for 2 seconds and increment the current round and call the newQuestion function again
			var setTimeOut = setTimeout(function(){
	            currentRound++; 
	            newQuestion();
	  		}, 2000); 
		}
	}
}


// New question function
function newQuestion() {
	console.log("this worked")
	// Check if we have more questions or not
	if (currentRound < quizData.length) {
		$("#main-content").empty();
		$("#time").text("Time remaining: "+ counter);
		// Call countdown function 
		countdown();

		var questionWrap = $("<h2>");
		console.log("Hello!");
		var currentQuestion = quizData[currentRound];
		questionWrap.text(currentQuestion.question);
		$("#main-content").append(questionWrap);
		for (var i =0; i < currentQuestion.options.length; i++){
			var buttonWrap = $("<button>");
			buttonWrap.text(currentQuestion.options[i]);
			buttonWrap.val(i);
			buttonWrap.addClass("btn btn-defult btn-lg btn-block answers-btn");
			$("#main-content").append(buttonWrap);
		}
	} else {
		console.log("Game over");
		finalPage();
		
	}
}

// Wins function
function wins() {
	$("#main-content").empty();
	var showMwssage = $("<h2>");
	showMwssage.text("You got it right, your answer was: " + quizData[currentRound].options[userChoice]);
	$("#main-content").append(showMwssage);
	correct++;
	counter = 15;
}

// Lossws function

function losses() {
	$("#main-content").empty();
	var showMwssage = $("<h2>");
	showMwssage.text("You got it wrong, the correct answer is: " + quizData[currentRound].options[quizData[currentRound].answer]);
	$("#main-content").append(showMwssage);
	incorrect++;
	counter = 15;
}



// Set a time out for 2 seconds and increment the current round and call the newQuestion function again
function waitTime() {
	var setTimeOut = setTimeout(function(){
        currentRound++; 
        newQuestion();
  	}, 2000);

}

// Final page function
function finalPage() {
	$("#main-content").empty();
	$("#time").addClass("hide");
	var correctAnswers = $("<h2>");
	correctAnswers.text("Correct answers = " + correct);
	$("#main-content").append(correctAnswers);
	var incorrectAnswers = $("<h2>");
	incorrectAnswers.text("Incorrect answers = " + incorrect);
	$("#main-content").append(incorrectAnswers);
	var unansweredQuestions = $("<h2>");
	unansweredQuestions.text("Unanswered = " + unanswered);
	$("#main-content").append(unansweredQuestions);
	var resetGame = $("<button>");
	resetGame.addClass("btn btn-defult btn-lg btn-block reset-btn");
	resetGame.text("Play Again");
	$("#main-content").append(resetGame);

}

// Reset the game function
function reset() {
	correct = 0 ;
	incorrect = 0;
	unanswered = 0;
	currentRound = 0;
	counter = 15;
	newQuestion();
}


// ==========================================================================
// MAIN PROCESS
// ==========================================================================

$(document).ready(function(){
	// Start the game
$("#start-game").on('click', function(){
	$("#time").removeClass("hide");
	newQuestion();
});

// Check the users answers
$("#main-content").on('click', '.answers-btn', function(){
	console.log($(this).val());
	userChoice = parseInt($(this).val());
	console.log(userChoice);
	if (userChoice === quizData[currentRound].answer) {
		console.log("Correct");
		clearInterval(intervalId);
		wins();
		// Set a time out for 2 seconds and increment the current round and call the newQuestion function again
		waitTime();
	} else {
		console.log("Incorrect");
		clearInterval(intervalId);
		losses();
		// Set a time out for 2 seconds and increment the current round and call the newQuestion function again
		waitTime();
	}
});

// Reset the game
$("#main-content").on('click', '.reset-btn', function(){
	$("#time").removeClass("hide");
	reset();
});
})






