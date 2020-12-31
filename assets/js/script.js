// array with questionObjects
questionObjects = [
    {
        question: "Commonly used data types do NOT include:",
        choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        answer: "3. alerts"
    },
    {
        question: "The condition in and if/else statement is enclosed with ___.",
        choices: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in Javascript can be used to store ___.",
        choices: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ___ when being assigned to variables.",
        choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        answer: "1. commas"
    },
    {
        question: "A very useful tool used during development and debugging for porinting content to the debugger is:",
        choices: ["1. Javascript", "2. terminal/bash", "3. for loops", "4. console.log"],
        answer: "4. console.log"
    },
]

//link to objects from page
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

    // once the button is clicked begin playQuiz function
    startQuizBtn.addEventListener("click", function() {
        playQuiz();
    });
}

//function to clear quiz content
function clearContent() {
    mainEl.innerHTML="";
}

//function to reset score
function reset() {
    score = 0
    timeLeft = 0
}

//function to play quiz
function playQuiz() {

    //start the timer
    timeLeft = 75;
    timerStart();

    //present with questions
    presentQuestion();
}

//function to present questions
function presentQuestion() {

    //clears HTML content
    clearContent();

    for (i = 0; i < questionObjects.length; i++) {

        //add question
        var currentQ = document.createElement("h2");
        currentQ.setAttribute("question", questionObjects[i].question);
        currentQ.textContent = questionObjects[i].question;
        mainEl.appendChild(currentQ);

        //add container for answers
        var choicesContainer = document.createElement("ol");
        choicesContainer.setAttribute("id", "choicesContainer");
        mainEl.appendChild(choicesContainer);

        //add answers 
        for (j = 0; j < 4; j++) {
            var choice = document.createElement("li");
            choice.textContent = questionObjects[i].choices[j];
            choicesContainer.appendChild(choice);
        }

        //score after clicking
        choicesContainer.addEventListener("click", function() {
            scoreChoice()

        });
        
        return;
    }
}

function scoreChoice() {
   var selectedChoice = event.target;
    console.log(questionObjects[i].answer)

   if (selectedChoice.innerHTML === questionObjects[i].answer) {
       console.log("Correct answer!")
       var choiceResponse = document.createElement("h3");
       choiceResponse.textContent = "Correct!"
       choicesContainer.appendChild(choiceResponse);

   }
   else {
       console.log("Wrong answer!");
       timeLeft -=10;
       
       var choiceResponse = document.createElement("h3");
       choiceResponse.textContent = "Wrong!"
       choicesContainer.appendChild(choiceResponse);
   }


}

//function to start timer
function timerStart() {

    setInterval(function() {
        if (timeLeft > 1) {
            gameTimerEl.textContent = timeLeft
            timeLeft--
        }
        else if (timeLeft === 1) {
            gameTimerEl.textContent = timeLeft
            timeLeft--
        }
        else {
            gameTimerEl.textContent = 0
        }

    }, 1000);
}



