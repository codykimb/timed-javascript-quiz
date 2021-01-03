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
var responseEl = document.querySelector("#question-response")
var timerTextEl = document.querySelector("#timer")

// global variables
var score = 0
var timeLeft = 0
var qNumber = 0

var highScoresList = []

if (localStorage.getItem("highScores") !== null ) {

    highScoresList = JSON.parse(localStorage.getItem("highScores"))
    
    console.log(highScoresList)

}

//timer is hidden
timerTextEl.setAttribute("style", "visibility: hidden;");
gameTimerEl.setAttribute("style", "visibility: hidden;");

//call welcomeScreen function
welcomeScreen();

//function for welcome sreen
function welcomeScreen() {

    clearResponses();
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

//function to clear response content
function clearResponses() {
    responseEl.innerHTML="";
}


//function to reset score
function reset() {
    score = 0
    timeLeft = 0
}

//function to play quiz
function playQuiz() {

    //start the timer and make it visible
    timeLeft = 75;
    timerStart();
    timerTextEl.setAttribute("style", "visibility: visible;");
    gameTimerEl.setAttribute("style", "visibility: visible;");

    //present with questions
    presentQuestion();
}

//function to present questions
function presentQuestion() {

    if (qNumber < questionObjects.length) {
        
        //clears HTML content
        clearContent();

        //add question
        var currentQ = document.createElement("h2");
        currentQ.setAttribute("question", questionObjects[qNumber].question);
        currentQ.textContent = questionObjects[qNumber].question;
        mainEl.appendChild(currentQ);

        //add container for answers
        var choicesContainer = document.createElement("ol");
        choicesContainer.setAttribute("id", "choicesContainer");
        mainEl.appendChild(choicesContainer);

        //add answers 
        for (i = 0; i < 4; i++) {
            var choice = document.createElement("li");
            choice.textContent = questionObjects[qNumber].choices[i];
            choicesContainer.appendChild(choice);
        }

        //score after clicking
        choicesContainer.addEventListener("click", function() {
            
            scoreChoice();

            qNumber++;

            presentQuestion();

            }); 
    }

    else {
        gameTimerEl.textContent = score;
        endGame();
    }
}

function scoreChoice() {
   var selectedChoice = event.target;
    console.log(questionObjects[qNumber].answer)

   if (selectedChoice.innerHTML === questionObjects[qNumber].answer) {
       console.log("Correct answer!")
       var choiceResponse = document.createElement("h3");
       choiceResponse.textContent = "Correct!"
       responseEl.appendChild(choiceResponse);
   }
   else {
       console.log("Wrong answer!");
       timeLeft -=10;
       
       var choiceResponse = document.createElement("h3");
       choiceResponse.textContent = "Wrong!"
       responseEl.appendChild(choiceResponse);
   }
}

//function to start timer
function timerStart() {

    var currentTime = setInterval(function() {
        if (timeLeft > 1) {
            gameTimerEl.textContent = timeLeft
            timeLeft--
        }
        else if (timeLeft === 1) {
            gameTimerEl.textContent = timeLeft
            timeLeft--
        }
        else if (gameTimerEl.textContent = score) {
            clearInterval(currentTime);
        }
        else {
            clearInterval(currentTime);
            gameTimerEl.textContent = 0
            endGame();
        }

        console.log(timeLeft)

    }, 1000);
}

//function to end game

function endGame() {

    //hide timer
    gameTimerEl.setAttribute("style", "visibility: hidden;");
    timerTextEl.setAttribute("style", "visibility: hidden;");

    //clear html content
    clearContent();

    var heading = document.createElement("h2");
    heading.textContent = "All done!";

    score = timeLeft

    var submitContainer = document.createElement("div");

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is " + score;

    var initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for","userInitials");
    initialsLabel.textContent = "Enter Initials: ";

    var initialsInput = document.createElement("input");
    initialsInput.setAttribute("id","userInitials");
    initialsInput.setAttribute("name","userInitials");
    initialsInput.setAttribute("minlength","2");
    initialsInput.setAttribute("maxlength","3");
    initialsInput.setAttribute("size","3");

    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("id", "submitBtn");
    submitBtn.textContent = "Submit"

    mainEl.appendChild(heading);
    mainEl.appendChild(finalScore);
    mainEl.appendChild(submitContainer);
    submitContainer.appendChild(initialsLabel);
    submitContainer.appendChild(initialsInput);
    submitContainer.appendChild(submitBtn);
    
    // create object for score
    var quizScore = { initials: "input", score: score };
    
    // add input and score to quizScore object
    submitBtn.addEventListener("click", function(){
        
        quizScore.initials = document.getElementById("userInitials").value.toUpperCase();
        quizScore.score = score;
        console.log(quizScore)

        highScoresList.push(quizScore)

        console.log(highScoresList)

        localStorage.setItem("highScores", JSON.stringify(highScoresList))

        highScores()
    })
}

function highScores() {
    
    clearResponses();
    clearContent();
    
    gameTimerEl.setAttribute("style", "visibility: hidden;");
    timerTextEl.setAttribute("style", "visibility: hidden;");

    //create heading and append
    var heading = document.createElement("h2");
    heading.setAttribute("id", "main-heading");
    heading.textContent = "High Scores:";

    mainEl.appendChild(heading);

    // create list for scores and append
    var scoreList = document.createElement("ol");
    scoreList.setAttribute("id", "scoreList");
    mainEl.appendChild(scoreList)
    
    var storedScores = (localStorage.getItem("highScores"));

    if (!storedScores) {
        var displayScore = document.createElement("p");
            displayScore.textContent = "No scores yet...";
            mainEl.appendChild(displayScore);
        
        var goBackBtn = document.createElement("button")
            goBackBtn.textContent = "Go Back";
            mainEl.appendChild(goBackBtn);
            goBackBtn.addEventListener("click", function() {
                welcomeScreen()
            } );
    }  
    else {

        //sort scores
        highScoresList.sort((a, b) => (a.score < b.score) ? 1 : -1);

        //add scores to list
        for (var i = 0; i < highScoresList.length; i++) {
            var displayScore = document.createElement("li");
            
                console.log(highScoresList[i])
                // console.log(JSON.parse(highScoresList));
                
                displayScore.textContent = highScoresList[i].initials + " - " + highScoresList[i].score;
                displayScore.setAttribute("id", "scoreList");
                scoreList.appendChild(displayScore);
        }

        var goBackBtn = document.createElement("button")
            goBackBtn.textContent = "Go Back";
            mainEl.appendChild(goBackBtn);
            goBackBtn.addEventListener("click", function() {
                welcomeScreen()

            } );

        var clearBtn = document.createElement("button")
            clearBtn.textContent = "Clear High Scores";
            mainEl.appendChild(clearBtn);
            clearBtn.addEventListener("click", function() {
                localStorage.clear()
                highScores()

            } );
    }
}

highscoreEl.addEventListener("click", highScores)


