import * as dom from "./DMMan.js";

//Event listener to make sure the document is loaded before any other event listeners are added.
document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete"){
        console.log("readyState: complete");
        initApp();
    }
});

//Function sets the event listeners for the buttons on screen.
const initApp = () =>
{
    const btnRoll = dom.getEl.gEID("btnRoll");
    const btnRestart = dom.getEl.gEID("btnRestart");
    const btnQuit = dom.getEl.gEID("btnQuit");
    dom.Event.listen(btnRoll, "click", function(){play();});
    dom.Event.listen(btnRestart, "click", function(){restart();});
    dom.Event.listen(btnQuit, "click", function(){quit();});
};

//Simple die object class to determine die value.
class Die {
    constructor(){
        this._value = 0;
    }
    //Getter for integer value of die object.
    get value(){
        return this._value;
    }
    //Produces random value 1-6 and sets the object's value to it.
    roll(){
        let result = Math.floor((Math.random() * 6) + 1);
        this._value = result;
    }
}

//Main function to play the game.
const play = () =>
{
    const dice = ["./images/dw/dieBlank.jpg","./images/dw/die1.jpg","./images/dw/die2.jpg","./images/dw/die3.jpg",
                "./images/dw/die4.jpg","./images/dw/die5.jpg","./images/dw/die6.jpg"];
    const playOneDie = new Die;
    const playTwoDie = new Die;
    playOneDie.roll();
    playTwoDie.roll();
    const oneVal = playOneDie.value;
    const twoVal = playTwoDie.value;
    rollResult(dice, oneVal, twoVal);
    declareWinner(oneVal, twoVal);
    determineWinner();
};

//Refreshes the page to play again.
const restart = () =>
{
    let confirm = dom.getEl.gEID("btnRoll").style.visibility !== "hidden"
        ? window.confirm("Are you sure you want to restart?")
        : window.confirm("Do you want to play again?");
    if(confirm){
        location.reload();
    }
};

//Closes the window.
const quit = () =>
{
    const confirm = window.confirm("Are you sure you want to quit?");
    if(confirm){
        window.close();
    }
};

const declareWinner = (play1, play2) =>
{
    let winner = play1 > play2 
        ? 'Player one scores!' : play1 === play2 
        ? 'It is a tie!' : 'Player two scores!';
    adjustScore(winner);
}

//Changes the image for each die.
const rollResult = (dice, oneVal, twoVal) =>
{
    const dieOne = dom.getEl.gEID("dieOne");
    const dieTwo = dom.getEl.gEID("dieTwo");
    dieOne.src = dice[oneVal];
    dieTwo.src = dice[twoVal];
};

//Changes the score for each player on the page,
//and declares the player who scored.
const adjustScore = (winner) =>
{
    const score1 = dom.getEl.gEID("score1");
    const score2 = dom.getEl.gEID("score2");
    const declare = dom.getEl.gETN("h3", 0);
    let tot1 = parseFloat(score1.innerHTML);
    let tot2 = parseFloat(score2.innerHTML);
    if(winner == 'Player one scores!'){
        tot1 = tot1 + 1;
        declare.innerHTML = winner;
    } else if(winner == 'Player two scores!'){
        tot2 = tot2 + 1;
        declare.innerHTML = winner;
    } else {
        tot1 = tot1 + 0.5;
        tot2 = tot2 + 0.5;
        declare.innerHTML = winner;
    }
    score1.innerHTML = tot1;
    score2.innerHTML = tot2;
};

//Determines if someone has a score of 10 or more
//and if true declares winner and hides roll button.
const determineWinner = () =>
{
    const score1 = parseFloat(dom.getEl.gEID("score1").innerHTML);
    const score2 = parseFloat(dom.getEl.gEID("score2").innerHTML);
    decWinner(score1, "Player 1 wins!");
    decWinner(score2, "Player 2 wins!");
};

const decWinner = (score, message) =>
{
    if(score >= 10){
        dom.getEl.gETN("h3", 0).innerHTML = message;
        dom.getEl.gEID("btnRestart").value = "Replay";
        dom.getEl.gEID("btnRoll").style.visibility = "hidden";
    }
}