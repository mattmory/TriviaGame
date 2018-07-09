/* declaration of globla variables */

var currentScore = 0;
var totalCorrect = 0;
var totalWrong = 0;
var remainingHints = 0;
var remainingQuestions = 0;
var theQuestions = [];
var currentQuestion;
var readyForAnswer = false;
var secondCounter;
var remainingSeconds = 0;


// Function to load the next question
function nextQuestion() {
    clearInterval(secondCounter);
    // Step 1: Pick the Question
    var nextQuestionIndex = Math.floor(Math.random() * remainingQuestions);
    currentQuestion = theQuestions[nextQuestionIndex];

    // Step 2: Fade the question out, set the question and answers
    var questionText = currentQuestion.quest;
    var answerTexts = [];
    // Build an object array of all the answers, then sort by a decimal
    answerTexts[0] = { answer: this.currentQuestion.answer, srtValue: (Math.random() * 1000) };
    answerTexts[1] = { answer: this.currentQuestion.wrongs[0], srtValue: (Math.random() * 1000) };
    answerTexts[2] = { answer: this.currentQuestion.wrongs[1], srtValue: (Math.random() * 1000) };
    answerTexts[3] = { answer: this.currentQuestion.wrongs[2], srtValue: (Math.random() * 1000) };
    answerTexts.sort((a, b) => parseFloat(a.srtValue) - parseFloat(b.srtValue));


    $("#gameQuestion").show();

    // Fade out the Div to populate the question and answers  
    $("#question-span").text(questionText);
    $("#answer-one").text(answerTexts[0].answer);
    $("#answer-two").text(answerTexts[1].answer);
    $("#answer-three").text(answerTexts[2].answer);
    $("#answer-four").text(answerTexts[3].answer);
    $("#disposition-span").text("");
    $(".fadeClass").fadeTo(1500, 1.0, function () {

    });
    setTimeout(function () { }, 2000);


    // remove the question from the array and decrease the remaining question count
    theQuestions.splice(nextQuestionIndex, 1);
    remainingQuestions--;
    readyForAnswer = true;

    //Start The Timer
    remainingSeconds = 30;
    secondCounter = setInterval(updateCounter, 1000);

}

// This is the meat of it all.
function updateCounter() {
    if (remainingSeconds <= 0) {
        clearInterval(secondCounter);
        questionDone(false);
    }

    /* update the progress bar */
    $("#progbar").attr("style", "width: " + Math.floor((100 * remainingSeconds) / 30) + "%");
    $("#progbar").attr("aria-valuenow", Math.floor((100 * remainingSeconds) / 30));
    remainingSeconds--;
}

// Takes in a boolean, true if the answer is right, false if wrong. Controls the screens and sets up the next question.
function questionDone(isCorrect) {
    clearInterval(secondCounter); // Stop the counter
    $("#gameQuestion").hide();
    $("#gameDisposition").show();

    if (isCorrect) {
        currentScore+= 5*remainingSeconds;
        totalCorrect++;
        $("#disposition-span").text("You are correct!");
    }
    else {
        totalWrong++;
        $("#disposition-span").text("The correct answer was " + currentQuestion.answer + ".");
    }

    // After two seconds, fade the disposition container to 0.

    if (remainingQuestions >= 1) {
        $(".fadeClass").fadeTo(1500, 0.0, function () { });

        setTimeout(function () {
            $("#gameDisposition").hide();
            nextQuestion();
        }, 2000);
    }

    else {
        $("#gameDispostion").hide();
        $("#gameEnd").show();
        $("#gameover-span").text("The game is over. You got " + totalCorrect + " correct for a total score of " + currentScore +".");
    }
}

// Cross out a wrong answer
function useHint() {

}

function loadQuestions() {
    theQuestions = [
        { quest: "The number is one?", answer: "One", wrongs: ["Four", "Two", "Three"] },
        { quest: "The number is two?", answer: "Two", wrongs: ["One", "Four", "Three"] },
        { quest: "The number is three?", answer: "Three", wrongs: ["Four", "Five", "Six"] },
        { quest: "The number is four?", answer: "Four", wrongs: ["One", "Two", "Three"] },
        { quest: "The number is five?", answer: "Five", wrongs: ["Six", "Seven", "Eight"] },
        { quest: "The number is six?", answer: "Six", wrongs: ["One", "Two", "Three"] }];
    remainingQuestions = theQuestions.length;
}



// Start the bang //
// Create and Initialize the Game.
/* Hide the non-start containers */
$("#gameEnd").hide();
$("#gameDisposition").hide();
$("#gameQuestion").hide();

//Load the Questions
loadQuestions();

$(document).ready(function () {
    $("#start-button").on("click", function (e) {
        $("#gameQuestion").show();
        $("#gameStart").hide();
        nextQuestion();
    }),

        $(".answer").on("click", function (e) {
            if (readyForAnswer) {
                if ($(this).text() === currentQuestion.answer) {
                    readyForAnswer = false;
                    questionDone(true);
                }
                else {
                    readyForAnswer = false;
                    questionDone(false);
                }
            }
        });
});

