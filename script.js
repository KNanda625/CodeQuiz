// select HTML tags and store references to these elements in variables
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');


// creating functions that will create quiz and show results
function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {

    function showQuestions(questions, quizContainer) {
        
        // store the output and answer choices
        var output = [];
        var answers;

        // for each question
        for(var i=0; i<questions.length; i++) {
            
            // reset the list of answers
            answers = [];

            // for each available answer to this question...
            for(letter in questions [i].answers) {

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+ i +' "value=" '+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );

            // finally combine output list into one string of htm and put it on the page
            quizContainer.innerHTML = output.join('');
        }

    };
   
    function showResults(questions, quizContainer, resultsContainer) {

        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;

        // for each question...
        for(var i=0; i<questions.length; i++) {

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+ i +']:checked')||{}).value;

            // if answer is correct
            if(userAnswer === questions[i].correctAnswer) {
                // add to the number of correct answers
                numCorrect++;

                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    };

    // show the questions
    showQuestions(questions, quizContainer);

    // when submit button is clicked, show results
    submitButton.onclick = function() {
        showResults(questions, quizContainer, resultsContainer);
    }
};

// countdown timer
function MyTimer(callback, val) {
    val = val || 60; 
    var timer=setInterval(function() { 
        callback(val);
        if(val-- <= 0) { 
            clearInterval(timer); 
        } 
    }, 1000);
}
new MyTimer(function(val) {
    var timerMsg = "00:" + (val >= 10 ? val : "0" + val);
    document.getElementById("timer").textContent = timerMsg; 
});



// use object literals to respresent indiv questions
// use array to hold all questions that make up quiz
var myQuestions = [
	{
		question: "Commonly used data types DO NOT include:",
		answers: {
			a: 'strings',
			b: 'alerts',
            c: 'booleans',
            d: 'numbers',
		},
		correctAnswer: 'b'
    },
    
	{
		question: "The condition in an if / else statement is enclosed within ____.",
		answers: {
			a: 'parentheses',
			b: 'curly brackets',
            c: 'square brackets',
            d: 'quotes',
		},
		correctAnswer: 'a'
    },

    {
		question: "Arrays in JavaScript can be used to store ____.",
		answers: {
			a: 'booleans',
			b: 'other arrays',
            c: 'numbers and strings',
            d: 'all of the above',
		},
		correctAnswer: 'd'
    },

    {
		question: "String values must be enclosed within ____ when being assigned to variables.",
		answers: {
			a: 'curly brackets',
			b: 'commas',
            c: 'parentheses',
            d: 'quotes',
		},
		correctAnswer: 'd'
    },

    {
		question: "A very useful tool used during development and debugging for printing content to the debugger is:",
		answers: {
			a: 'for loops',
			b: 'JavaScript',
            c: 'console.log',
            d: 'terminal / bash',
		},
		correctAnswer: 'c'
    },
];

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);