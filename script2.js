var timer = document.getElementById("timer");
var quizQuestion = document.getElementById("quiz-question");
var quizResponses = document.getElementById("quiz-responses");
var quizScore = document.getElementById("quiz-score");
var oldScores = JSON.parse(window.localStorage.getItem("savescores"));
var quizType = document.getElementById("quiztype");
var quizTime = 70;
var totalScore = 0;
var questionNum = 0;
var corrResp;
var questions;
 var tetet; console.log(tetet); console.log(tetet + "tetet"); console.log('test');
var html = [
    { q: "Which tag do you link bootstrap in?", r: ["header", "html", "lead", "head"], a: "3" },
    { q: "Which tag do you link the js file in?", r: ["body", "header", "head", "div"], a: "0" },
    { q: "How do you call the .container{} from the css file?", r: ["class='container'", "rel='container'", "href='container'", "scr='container'"], a: "0" },
    { q: "Which tag does not change the text font?", r: ["h1", "div", "h3", "h5"], a: "1" },
    { q: "Which one does not have an html end tag?", r: ["div", "button", "br", "li"], a: "2" },
    { q: "Is it possible to change the color of the bullet?", r: ["yes", "maybe", "depends", "no"], a: "0" },
    { q: "How do you comment in html?", r: ["//", "-m", "<-- -->", "<!-- -->"], a: "3" },
    { q: "What color is blue in bootstrap?", r: ["danger", "succes", "primary", "secoundary"], a: "2" },
    { q: "How do you get the tag below the current one to show up next to it in the html page (instead of being below it by default)?", r: ["float-right", "float-left", "float-none", "float-float"], a: "1" }
  ];

  var git = [
    { q: "What command do you use to get lastest?", r: ["git commit -m", "git pull", "git clone", "git push"], a: "1" },
    { q: "Which of the following commands can help you create atomic commits when you've forgotten to do so as you work?", r: ["git commit --amend", "git rebase", "git add -p", "git revert"], a: "2" },
    { q: "Which command allows you to fix up the commit message in your previous commit?", r: ["git commit --fix", "git commit --amend", "git reset --hard", "git cherry-pick"], a: "1" },
    { q: "Which git command allows you to move a commit from one branch to another?", r: ["git cherry-pick", "git reset", "git revert", "git commit --amend"], a: "0" },
    { q: "Which of the following best describes the operation of git revert?", r: ["Removes the last commit from your history", "Creates a new commit that is the inverse of the target commit", "Reverts the changes to the code base up to and including the target commit", "Replaces the commit message on the target commit"], a: "1" },
    { q: "In Git, HEAD refers to:", r: ["The point in time indicated by the file tree that is currently checked out", "The master copy of the repository", "A detached state that indicates you are not on the most recent commit", "The branch you are currently working on"], a: "0" },
    { q: "Which command could you use to create a second remote for your repository?", r: ["git remote --new", "git remote add", "git clone", "git push --new"], a: "1" },
    { q: "Git pull is a combination of which two git commands?", r: ["git clone, git unpack", "git clone, git checkout", "git fetch, git merge", "git update, git merge"], a: "2" }
  ];

  var javascript = [
    { q: "Which of the following is var temp; equal to?", r: ["null", "0", "NaN", "undefined", "null and undefined"], a: "3" },
    { q: "Which of the following prints to the console?", r: ["console.log();", "console.log()", "console.log(test);", "console.log('test');", "console.log(test); and console.log('test');"], a: "4" },
    { q: "Commonly used data types does not include:", r: ["strings", "boolean", "numbers", "alerts"], a: "3" },
    { q: "The condition of an if / else statement is enclosed within:", r: ["quotes", "curly brackets", "parentheses", "sqaure brackets"], a: "2" },
    { q: "Arrays in javascript can be used to store:", r: ["numbers and strings", "other arrays", "booleans", "all of the above"], a: "3" },
    { q: "String values must be enclosed within ___ when being assigned to variables.", r: ["quotes", "commas", "curly brackets", "parentheses"], a: "0" },
    { q: "Javascript is the same as java", r: ["yes", "no", "sometimes", "only when used in html"], a: "1" }
  ];


function initialSetup () {
    var queryString = new URLSearchParams(window.location.search).toString();
    var level = queryString.charAt(queryString.length-1);
    console.log("level", level);
    if (level == 1){
        questions = html;
        quizType.textContent = "Html"

    }
    else if (level == 2){
        questions = git;
        quizType.textContent = "Git"

    }
    else if (level == 3){
        questions = javascript;
        quizType.textContent = "Javascript"

    }
    showScore();
    var getReady = 3;
    console.log("old scores: ", oldScores);
    var prepInterval = setInterval(function() {
        timer.textContent = "Get ready to begin in: " + getReady + " seconds";
        getReady--;

        if (getReady < 0) {
            clearInterval(prepInterval);
            quizTimer();
            showQuestion();
        }
     }, 1000);
}

function quizTimer () {
    var quizInterval = setInterval(function () {
        timer.textContent = quizTime + " seconds remaining";
        quizTime--;

        if (quizTime <= 0){
            clearInterval(quizInterval);
            clearQuestion();
            saveScore();
        }
    }, 1000)
}

function showQuestion () {
    if (questionNum < questions.length){
        quizQuestion.textContent = questions[questionNum].q;
        for (var i = 0; i < questions[questionNum].r.length; i++) {
            var resp = document.createElement("div");
            
            resp.setAttribute("id", "respBtn");
            resp.setAttribute("respID", i);
            resp.style = "padding: 10px; border: 2px solid red";
            //resp.style.border += "2px solid red";
            //resp.className="btn btn-primary";
            resp.textContent = questions[questionNum].r[i];
            quizResponses.appendChild(resp);
            corrResp = questions[questionNum].a;
        }//class="btn btn-primary"
        questionNum++;
    }
    else {
        quizQuestion.textContent = "Well that's embarrassing, I've run out of questions before you ran out of time. Try one of the harder levels next time!";
        quizTime = 1;
    }
    
}

quizResponses.addEventListener("click", function (e) {
    console.log("click event: ", e.target.getAttribute("respID"))
    if (e.target.getAttribute("respID") == corrResp){
        totalScore = totalScore + quizTime;
    }
    else {
        quizTime -= 10;
    }
    clearQuestion();
    showScore();
    showQuestion();
})

function clearQuestion () {
    quizQuestion.textContent = "";
    while (quizResponses.firstChild){
        quizResponses.removeChild(quizResponses.firstChild);
    }
    
}

function showScore () {
    quizScore.textContent = totalScore;
}

function saveScore () {
    var userInitials = prompt("Wow, your score was " + totalScore + ". Enter your initials to save your score.");
    if (userInitials !== null) {
        if (oldScores === null){
            oldScores = [
                {
                    initials: userInitials, 
                    score: totalScore
                }
            ];
        }
       
        else {
            oldScores.push({
                    initials: userInitials, 
                    score: totalScore
                });
            console.log("Scores", oldScores);
            oldScores.sort(function(a,b){
                return(b.score - a.score);
            })
        }
        console.log( oldScores.push())
        localStorage.setItem('savescores', JSON.stringify(oldScores));// here gitjedi
        window.location.href = "index.html";
    }
    else if(userInitials === null){
        userInitials = "";
        oldScores.push({
            initials: userInitials, 
            score: totalScore
        });
    console.log("Scores", oldScores);
    oldScores.sort(function(a,b){
        return(b.score - a.score);
    })
        //console.log( oldScores.push())
        localStorage.setItem('savescores', JSON.stringify(oldScores));// here gitjedi
        window.location.href = "index.html";
     }
   
 }


initialSetup();