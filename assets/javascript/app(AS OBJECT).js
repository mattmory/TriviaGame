var currentSeconds;

var triviaGame = {

    init: function () {
        this.currentScore = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.remainingHints = 0;
        this.remainingQuestions = 0;
        this.theQuestions = [];
        this.currentQuestion;
        this.secondCounter;
        this.updateCounter;
        this.loadQuestions();
        

    },

    // Function to load the next question
    nextQuestion: function () {
        clearInterval(this.secondCounter);
        // Step 1: Pick the Question
        var nextQuestionIndex = Math.floor(Math.random() * this.remainingQuestions);
        this.currentQuestion = this.theQuestions[nextQuestionIndex];

        // Step 2: Fade the question out, set the question and answers
        var questionText = this.currentQuestion.quest;
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
        this.theQuestions.splice(nextQuestionIndex, 1);
        this.remainingQuestions--;

        this.readyForAnswer = true;

        //Start the timer.
        remainingSeconds = 30;
        this.secondCounter = setInterval(this.updateCounter, 1000);

    },

    updateCounter: function () {
        if (remainingSeconds <= 0) {
            clearInterval(this.secondCounter);
            this.questionDone(false);
        }
        /* update the progress bar */
        $("#progbar").attr("style", "width: " + Math.floor((100 * remainingSeconds) / 30) + "%");
        $("#progbar").attr("aria-valuenow", Math.floor((100 * remainingSeconds) / 30));
        remainingSeconds--;
    },

    // Takes in a boolean, true if the answer is right, false if wrong. Controls the screens and sets up the next question.
    questionDone: function (isCorrect) {
        clearInterval(this.secondCounter);
        $("#gameQuestion").hide();
        $("#gameDisposition").show();

        if (isCorrect) {
            this.currentScore+= 5*remainingSeconds;
            this.totalCorrect++;
            $("#disposition-span").text("You are correct!");
        }
        else {
            this.totalWrong++;
            $("#disposition-span").text("The correct answer was " + this.currentQuestion.answer + ".");
        }

        // After two seconds, fade the disposition container to 0.

        if (this.remainingQuestions >= 1) {
            $(".fadeClass").fadeTo(1500, 0.0, function () { });
            var that = this;
            setTimeout(function () {
                $("#gameDisposition").hide();
                that.nextQuestion();
            }, 2000);
        }

        else {
            $("#gameDispostion").hide();
            $("#gameEnd").show();
            $("#gameover-span").text("The game is over. You got " + this.totalCorrect + " correct for a total score of " + this.currentScore +".");
        }
    },

    // Cross out a wrong answer
    useHint: function () {

    },

    loadQuestions: function () {
        this.theQuestions = [
            { quest: "The number is one?", answer: "One", wrongs: ["Four", "Two", "Three"] },
            { quest: "The number is two?", answer: "Two", wrongs: ["One", "Four", "Three"] },
            { quest: "The number is three?", answer: "Three", wrongs: ["Four", "Five", "Six"] },
            { quest: "The number is four?", answer: "Four", wrongs: ["One", "Two", "Three"] },
            { quest: "The number is five?", answer: "Five", wrongs: ["Six", "Seven", "Eight"] },
            { quest: "The number is six?", answer: "Six", wrongs: ["One", "Two", "Three"] }];
        this.remainingQuestions = this.theQuestions.length;
    }
}


// Start the bang //
// Create and Initialize the Game.
var theGame = Object.create(triviaGame);
theGame.init();

/* Hide the non-start containers */
$("#gameEnd").hide();
$("#gameDisposition").hide();
$("#gameQuestion").hide();


$(document).ready(function () {
    $("#start-button").on("click", function (e) {
        $("#gameQuestion").show();
        $("#gameStart").hide();
        theGame.nextQuestion();
    }),

        $(".answer").on("click", function (e) {
            if ($(this).text() === theGame.currentQuestion.answer) {
                theGame.questionDone(true);
            }
            else {
                theGame.questionDone(false);
            }
        });
});

