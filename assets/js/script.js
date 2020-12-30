//pull in objects from page
var highscoreEl = document.querySelector("#highscore")
var gameTimerEl = document.querySelector("#gameTimer")
var mainEl= document.querySelector("#container-content")

// global variables
var score = 0
var timeLeft = 0

//call welcomeScreen function
welcomeScreen();

//function for welcome sreen
function welcomeScreen() {

    clearContent();
    reset();

    //create main text
    var heading = document.createElement("h2");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "Coding Quiz Challenge!";

    //create instructions 
    var instructions = document.createElement("p");
    instructions.setAttribute("id", "instructions");
    instructions.textContent = "Try to answer the following code-related questions within the time limit. You will have 15 seconds for each question and you will be penalized by 10 seconds for each incorrect answer. Your Score = Time Left.";

    //create start button
    var startQuizBtn = document.createElement("button");
    startQuizBtn.setAttribute("id", "startQuizBtn");
    startQuizBtn.setAttribute("class", "btn");
    startQuizBtn.textContent = "Start Quiz";

    //append to the quiz container
    mainEl.appendChild(heading);
    mainEl.appendChild(instructions);
    mainEl.appendChild(startQuizBtn);

    //once the button is clicked begin playQuiz function
    // startQuiz.addEventListener("click", function() {
    //     playQuiz(questionObjects);
    // });
}

//function to clear quiz content
function clearContent() {
    mainEl.innerHTML="";
}

//function to reset score
function reset() {
    score = 0
    timeLeft = 75
}

//function to play quiz
function playQuiz() {

}


// array with questionObjects
questionObjects = [
    {
        question: "Commonly used data types do NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        question: "The condition in and if/else statement is enclosed with ___.",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        answer: "parenthesis"
    },
    {
        question: "Arrays in Javascript can be used to store ___.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "commas"
    },
    {
        question: "A very useful tool used during development and debugging for porinting content to the debugger is:",
        choices: ["Javascript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    },
]