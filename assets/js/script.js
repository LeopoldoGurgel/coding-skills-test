function quizz() {

//html elements shorthand
var highscoreEl = document.getElementById("highscore");
var timerEl = document.getElementById("timer");
var questionBoxEl = document.getElementById("question-box");
var questionEl = document.getElementById("question");
var startButton = document.getElementById("start");
var highscoreLS = localStorage.getItem("highscore") || 0; // this or zero
// means that if there is no previous record of highscores, the value is 0
var currentQuestionIndex = 0; //this will keep track of the current question


// This creates the countdown function
// I want the start button to show if the timer is not running
// And the questions tho show when the timer start
var timeLeft = 60;
function countdown() {
    

    var timeCount = setInterval(function() {
        timerEl.textContent = "Seconds left: " + timeLeft + " sec.";
        timeLeft--; 

        if (timeLeft > 0) {
            startButton.setAttribute("class", "hide");
            questionBoxEl.setAttribute("class", " ");
        }

        if (timeLeft == 0) {
            clearInterval(timeCount);
            timerEl.textContent = "Time's up!"
            startButton.setAttribute("class", " ");
            questionBoxEl.setAttribute("class", "");
            localStorage.setItem("highscore", highscoreLS);
        }

        if(currentQuestionIndex == questions.length) {
            clearInterval(timeCount);
            timerEl.textContent = "Finished!"
            startButton.setAttribute("class", " ");
            questionBoxEl.setAttribute("class", "");
            localStorage.setItem("highscore", highscoreLS);
        }

    }, 1000)
}

// this function toggles my highscore class between " " and "hide".
// hide is set to have a display: none;
// the function is attached to a click event listener on "View Highscore" text.

function showHS(){
    var hs = document.getElementById("hs");
    hs.textContent = ": " + highscoreLS + " right answers.";

    if (hs.getAttribute("class") == "hide"){
        hs.setAttribute("class", " ");
    }else{
        hs.setAttribute("class", "hide");
    }
}

highscoreEl.addEventListener("click", showHS);

var questions = [
    {question: "QUESTION: What does DOM stand for in Javascript?",
    options: ["Document Object Model", "Direct Object Method", "Document Order Model", "Data Output MEnagement"],
    answer: 0
    },
    {question: "QUESTION: Which method is used to attach an event listener to an HTML element in JavaScript?",
    options: ["listenTo()", "addEventHandler()", "addEventListener()", "attachEvent()"],
    answer: 2
    },
    {question: "QUESTION: What is the purpose of the querySelector() method in JavaScript?",
    options: ["To select the first element in an array", "To select elements by their class name", "To select an element by their tag name", "To select elements using CSS selectors"],
    answer: 3
    },
    {question: "QUESTION: Which of the following is not a primitive data type in JavaScript?",
    options: ["String", "Object", "Boolean", "Array"],
    answer: 3
    },
    {question: "QUESTION: What is the purpose of the localStorage object in the Web Storage API?",
    options: ["To store data in the form of cookies", "To store data temporarely during a session", "To store data locally in the browser", "To store data on the server"],
    answer: 2
    },
    {question: "QUESTION: Which method is used to remove an HTML element from the DOM using JavaScript?",
    options: ["removeElement()", "removeItem()", "removeChild()", "deleteElement()"],
    answer: 2
    }
]

var currentQuestionIndex = 0; //this will keep track of the current question

var right = 0;
var wrong = 0;

function startTest() {

    var questionEl = document.getElementById("question");
    var optionList = document.getElementById("option-list");


    //this will check if there are more incoming questions

    if(currentQuestionIndex < questions.length) {

        // this will render the question
        var thisQuestion = questions[currentQuestionIndex];
        questionEl.textContent = thisQuestion.question;

        optionList.innerHTML = ""; //Without this line, each time I clicked on an answer
        // the answers to the previous questions would remain on the page.

        //this will create a <li> for each option and append to the 
        // previously created <ol in HTML
        for(var i = 0; i < thisQuestion.options.length; i++){
            var optionLI = document.createElement("li");
            optionLI.textContent = thisQuestion.options[i];
            optionList.appendChild(optionLI);

            // this will move my question to the next one
            // as the user answers each question and count
            // right and wrong answers.
            function createClickHandler(index) {
                return function () {
                        if (index === thisQuestion.answer) {
                        ++right;
                    } else {
                        wrong++;
                    }
                    currentQuestionIndex++;
                    startTest(); // Move to the next question
                };
            }

            // Attach the event listener using the captured 'i'
            optionLI.addEventListener("click", createClickHandler(i));
            
        }

        // !!! BUUUUUUGGGG !!!
        // The highscore counter only goes up to five
        // even when all the six answers are correct

        // Eureka: inside createClickHandler on line 115
        // the currentQuestionIndex++ was the first thing inside the function.
        // I figured out the solution after a couple hours away from my computer;
        // Nope. It didn't work;

        // I tried this, but it didn't work as well.
        // optionLI.addEventListener("click", function(i){
        //     if (i === thisQuestion.answer) {
        //         right++;
        //     } else {
        //         wrong++;
        //     }
        //     currentQuestionIndex++;
        //     startTest(); // Move to the next question
        // });


        // SOOOOOOOLVED!!!!!

        // The bug was happening because the console.log's and the localStorage.setItem
        // were inside the conditional if(currentQuestionIndex < questions.length)
        // and not inside the else statement. So whenever currentQuestionIndex == questions.length
        // no console would be called and the highscore wouldn't be 

            if (right > highscoreLS) {
                highscoreLS = right;
                localStorage.setItem("highscore", highscoreLS);
            }

            
        console.log(right);
        console.log(wrong);
        console.log(highscoreLS);

    }else {

        // this reset the count for right and wrong answers as soon
        // as there are no questions left in questions.length
        
        if (right > highscoreLS) {
            highscoreLS = right;
            localStorage.setItem("highscore", highscoreLS);
        }
        console.log(right);
        console.log(wrong);
        console.log(highscoreLS);
        localStorage.setItem("highscore", highscoreLS);
        questionEl.textContent = "Your Test is over. You scored " + right + "/6.";
        right = 0;
        wrong = 0;
    }

}



// Im adding event listeners to start the timer and run the questions.

startButton.addEventListener("click", startTest);
startButton.addEventListener("click", countdown);

};

quizz();