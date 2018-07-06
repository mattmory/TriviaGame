/* declaration of globla variables */
//var currentScore = 0;
//var totalCorrect = 0;
//var totalWrong = 0;
//var remainingHints = 5;
//var currentQuestion;

var triviaGame = {

    init: function () {
        this.currentScore = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.remainingHints = 0;
        this.remainingQuestions = 0;
        this.theQuestions = [];
        this.currentQuestion;
        this.loadQuestions();
        

    },

    // Function to load the next question
    nextQuestion: function () {
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


        $(".fadeClass").fadeTo(2000, 0.0, function () {
            $("#question-span").text(questionText);
            $("#answer-one").text(answerTexts[0].answer);
            $("#answer-two").text(answerTexts[1].answer);
            $("#answer-three").text(answerTexts[2].answer);
            $("#answer-four").text(answerTexts[3].answer);
            $(".fadeClass").fadeTo(2000, 1.0);
        });
        console.log("Out");
        //$(".fadeClass").fadeTo(2000, 1.0);
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
$(".fadeClass").css({ opacity: 0.0 });


$(document).ready(function () {


    $("#start-button").on("click", function (e) {
        $("#start-button-row").hide();
        theGame.nextQuestion();
    });
});

