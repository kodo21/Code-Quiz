# Code-Quiz

#style.css

only effects the body and the .container class in the html files.

#index.html

The html files are basic with some bootstrap and two css components.

The most important thing in index.html is the links for the different quizes.

#index2.html

The questions are created based off of the code.

The header is already there in the html. The seconds are counted down by the script2.js and the wrong or right answer 

is added after the first answer is selected.

#script.js

This script is used mainly to display the highscores with the json.parse method and clear the highscores.

#script2.js

Based off what quiz is slected in index.html will determine the quiz type.

On line 48 function initialSetup () will check to see which quiz was selected and 
then choose the appropriate questions/answers from that.

The function on line 48 also calls the fuction function quizTimer () on line 82 
which will start a countdown to start the quiz.

When the getReady variable is zero the function showQuestion () on line 95 will be called.
In this fucntion the questions with the reponses / choice of answers will be displayed 
and the correct answer will be set to variable called corrResp which is a number 
correlated to the index of the correct answer.

quizResponses.addEventListener() on line 119 will check for the wrong or right answer.
Add points if it is the right answer based on time left and display correct answer.
Minus time if the wrong answer and display wrong answer.
Will also clear the questions and reponses/answers.

function clearQuestion () on line 134 will take away the previous question/reponses/answers.

function showScore () on line 142 will display the current score of the quiz.

function saveScore () on line 146 will record the score and initials if given 
and save it to the oldscores variable using json.parse and stringify. 
Also passing through the window to index.html.
The score will be displayed by the number in rank followed by quiz type followed by initials if any then lastly number of the score achieved.

