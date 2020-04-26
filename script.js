var highScores = document.getElementById("high-scores");
var oldScores = JSON.parse(window.localStorage.getItem("savescores"));
var clear = document.getElementById("ClearHighscore");
var temp = 1;
function displayscores () {
    if (typeof(Storage) !== undefined) {

    }
    else {
        highScores.textContent = "Sorry, I can't save high scores for you in this browser!"
    }
    console.log("Old Scores: ", oldScores);
    
    if (oldScores === null) {
        //highScores.textContent = ""
    }
    else {
        var olist = document.createElement("p") ;
        olist.id ="test";
        olist.style = "list-style-type:none;";
        
        highScores.appendChild(olist);
        //console.log(olist);
        
        for (var i = 0; i < oldScores.length; i++){
            
            console.log("showing score: " + oldScores[i].initials + ": " + oldScores[i].score)
            if (i < 10) {
                
                var newScore = document.createElement("li");
                newScore.textContent = temp + "#  <-----> "+ oldScores[i].initials + ": " + oldScores[i].score;
                temp++;
                olist.appendChild(newScore);
                
                //console.log(newScore);
                //console.log(olist);
            }
            else {
                break;
            }
            
        }
    }
}
clear.addEventListener("click", function () {
    console.log("dostuff");

    localStorage.clear();
    highScores.textContent = "";
})
displayscores();