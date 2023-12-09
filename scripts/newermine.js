
var foundBomb = "0";
var diff = "";
var bombCount = 0;
var hasBomb = new Set();
var bombPos = [];
var bombHint = new Array(100).fill(0); 
let bombHintArray = [];
const notHere = new Set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 10, 20, 30, 40, 50, 60, 70, 80, 19, 29, 39, 49, 59, 69, 79, 89]);
document.getElementById("diff1").onclick = gameEasy;
document.getElementById("diff2").onclick = gameMid;
document.getElementById("diff3").onclick = gameHard;


function gameEasy() {
    console.log("Easy");
    diff = 100;
    bombCount = 8;
    makeMine();
}
function gameMid() {
    console.log("Mid");
    diff = 100;
    bombCount = 14;
    makeMine();
}
function gameHard() {
    console.log("Hard");
    diff = 100;
    bombCount = 20;
    makeMine();
}

function makeMine() {
    console.log(diff);
    const diffBut1 = document.getElementById('diff1');
    const diffBut2 = document.getElementById('diff2');
    const diffBut3 = document.getElementById('diff3');
    diffBut1.remove();
    diffBut2.remove();
    diffBut3.remove();
    for (let i = 0; i < diff; i++) {
        const gridMaker = document.getElementById("makeGridHere"); 
        const placeGrid = document.createElement("div");
          placeGrid.classList.add("mineSquare");
          placeGrid.id = i; 
      //    placeGrid.textContent = i;
          gridMaker.appendChild(placeGrid);
    }
 
        notHere.forEach((value) => {
        document.getElementById(value).style.backgroundColor = "black";
    });
   // bombCount = Math.sqrt(parseInt(diff));
    while (hasBomb.size < bombCount){
      const bombHere = Math.floor(Math.random() * diff);
      if (!hasBomb.has(bombHere) && !notHere.has(bombHere)){
      hasBomb.add(bombHere);
    }
   }
    bombHintArray = Array.from(hasBomb);
    console.log("arry :", bombHintArray);
    bombPos = Array.from(hasBomb);
    console.log(hasBomb, bombCount);
/*   for (i = 0; i < bombCount; i++){
        document.getElementById(bombPos[i]).style.backgroundColor = "red";
   }*/
   console.log("size", bombHintArray.length);
   
   for (var i = 0; i < bombHintArray.length; i++){                 // start a loop that runs for the length of hasBomb (which is 8 but can be increased easily to any size)  
          console.log("hasBomb", bombHintArray);                //   again an example of using log to find problems. I put this here because the rest of the loop wasn't functioning correctly and I wanted to ensure hasBomb was still complete (which it was, meaning my problem is further along) - Update, it's an hour later and I've fixed it
          var bombHintAdd = bombHintArray[i];                                                                  // sets any position containing a bomb to a value far higher than any other square (this will be used later to verify if a bomb is clicked )
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +9;            // I really want to find a way to do this cleaner. It searches any square adjacent to a bomb and increases its value by 1 - there has to be a way to reduce the load
          bombHintAdd = bombHintArray[i] -11;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
          bombHintAdd = bombHintArray[i] -10;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
          bombHintAdd = bombHintArray[i] -9;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
          bombHintAdd = bombHintArray[i] -1;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
          bombHintAdd = bombHintArray[i] +1;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
          bombHintAdd = bombHintArray[i] +9;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
          bombHintAdd = bombHintArray[i] +10;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
          bombHintAdd = bombHintArray[i] +11;
          bombHint[bombHintAdd] = bombHint[bombHintAdd] +1;
        }
        console.log("bombHint : ", bombHint, bombHintArray);
   
 /*   for (i = 0; i < (bombHint.length); i++){
        if (document.getElementById(i) != null){
            document.getElementById(i).textContent = bombHint[i];
        }else {
            continue;
        }
    }   */
        
    }
  var checkSpot = document.getElementById("makeGridHere").addEventListener("click", function(event) {     
        if (event.target.classList.contains("mineSquare")) {                   
            var butClick = event.target.id;
            var butClicked = bombHint[butClick];    
            event.target.textContent = bombHint[butClick];                                   
            console.log("clicked", butClick, butClicked);
        }
        if (butClicked > 8) {
            document.getElementById(bombHint[butClick]).style.boxShadow = "inset 2px 2px 2px black"
            console.log("GameOver", bombHint.length);
            document.getElementById(butClick).textContent = "*";
            document.getElementById("mineOver").innerHTML = "You LOSE!!! Click <span id='MineReload'>here</span> to play again";
            document.getElementById("MineReload").addEventListener("click", GameReload);
            notHere.forEach((value) => {
                document.getElementById(value).style.backgroundColor = "red";
            });
            hasBomb.forEach((value) => {
                document.getElementById(value).style.backgroundColor = "red";
            });
    }else {
        document.getElementById(butClick).style.boxShadow = "inset 2px 2px 2px black"
        console.log("carryOn");
        console.log(bombHint, bombHint[butClick]);
        if (bombHint[butClick] === 0 && bombHint[butClick - 1] === 0 && bombHint[butClick - 1] != null) {                                // again, there has to be a neater way to do this 
            document.getElementById(butClick -1).textContent = "0";
            document.getElementById(butClick -1).style.color = "black";
            document.getElementById(butClick -1).style.boxShadow = "inset 2px 2px 2px black";
        }
        if (bombHint[butClick] === 0 && bombHint[butClick + 1] === 0 && bombHint[butClick + 1] != null) {                // All of this is to check if, on pressing a square with a value of 0......
            document.getElementById(butClick +1).textContent = "0";           // ...it checks all adjacent squares and if they have a value of 0, reveals them
            document.getElementById(butClick +1).style.color = "black";
            document.getElementById(butClick +1).style.boxShadow = "inset 2px 2px 2px black";
        }
        if (bombHint[butClick] === 0 && bombHint[butClick - 9] === 0 && bombHint[butClick - 9] != null) {
            document.getElementById(butClick -9).textContent = "0";
            document.getElementById(butClick -9).style.color = "black";
            document.getElementById(butClick -9).style.boxShadow = "inset 2px 2px 2px black";
        }
        if (bombHint[butClick] === 0 && bombHint[butClick - 10] === 0 && bombHint[butClick - 10] != null) {
            document.getElementById(butClick -10).textContent = "0";
            document.getElementById(butClick -10).style.color = "black";
            document.getElementById(butClick -10).style.boxShadow = "inset 2px 2px 2px black";
        }
        if (bombHint[butClick] === 0 && bombHint[butClick - 11] === 0 && bombHint[butClick - 11] != null) {
            document.getElementById(butClick -11).textContent = "0";
            document.getElementById(butClick -11).style.color = "black";
            document.getElementById(butClick -11).style.boxShadow = "inset 2px 2px 2px black";
        }
        if (bombHint[butClick] === 0 && bombHint[butClick  + 11] === 0 && bombHint[butClick + 11] != null) {
            document.getElementById(butClick + 11).textContent = "0";
            document.getElementById(butClick + 11).style.color = "black";
            document.getElementById(butClick + 11).style.boxShadow = "inset 2px 2px 2px black";
        }
        if (bombHint[butClick] === 0 && bombHint[butClick  + 10] === 0 && bombHint[butClick + 10] != null) {
            document.getElementById(butClick + 10).textContent = "0";
            document.getElementById(butClick + 10).style.color = "black";
            document.getElementById(butClick + 10).style.boxShadow = "inset 2px 2px 2px black";
        }
        if (bombHint[butClick] === 0 && bombHint[butClick  + 9] === 0 && bombHint[butClick + 9] != null) {
            document.getElementById(butClick + 9).textContent = "0";
            document.getElementById(butClick + 9).style.color = "black";
            document.getElementById(butClick + 9).style.boxShadow = "inset 2px 2px 2px black";
        }
        }    
    });

    window.addEventListener('contextmenu', (ev) => {
        ev.preventDefault();                                           // this prevents the menu opening on right-click - Now I just have to figure out how to get it to do something else
        console.log("right clicked",);                                 // had to take this step by step to make sure it was working. This is to confirm visually that rClick has happened
        var clicked = ev.target.id;                                    // adds the id of the clicked square to a var
        console.log("here : ", clicked);                               // and again let's me know that all is working up to here
        var bombMark = bombHint[clicked];                       // takes the id of clicked square (e.g. b6) and finds the index of this in gridPos
        console.log("Please work = ", bombMark);                       // had my fingers crossed but it did indeed work 

        if (document.getElementById(clicked).style.backgroundColor !== "aqua") {            // this part takes care of what happens on rClick. First off, check if the square is default colour
            if (bombMark > 8) {                                               // and if there is a bomb. Other than in a very highly unlikely situation, a non-bomb square will never have more than 6 points
                console.log("Bing", bombMark);                                // Bing, Bang and Basta added to the steps to ensure that the correct option was being encountered
                document.getElementById(clicked).style.backgroundColor = "aqua";        // So, if it was default colour and has a bomb, the square changes colour and....
                document.getElementById(clicked).style.boxShadow = "inset 2px 2px 2px black"; 
                foundBomb++;
                                                                         // ... 1 is added to the score for gameWin
            } else {                                                                    // else (that is, if it is default colour but doesn't contain a bomb)
                console.log("Bang");                                                    // let me know via console
                document.getElementById(clicked).style.backgroundColor = "aqua";        // and change the colour
                document.getElementById(clicked).style.boxShadow = "inset 2px 2px 2px black";
                foundBomb--;
            }
        } else if (document.getElementById(clicked).style.backgroundColor === "aqua" && bombHint[bombMark] > 8) { // else if (that is, if the colour of the square is not default (handled above) square is aqua and there is a bomb)
                console.log("Basta");
                document.getElementById(clicked).style.backgroundColor = "";                    // changes the colour back to default
                document.getElementById(clicked).style.boxShadow = "";
                foundBomb--;
                                                                                 // and reduces that game score
                console.log("This many : ");
        } else {
            console.log(document.getElementById(clicked).style.backgroundColor)
            document.getElementById(clicked).style.backgroundColor = "";                           // the only other possibility is aqua coloured and not containing a bomb
            document.getElementById(clicked).style.boxShadow = "";
            foundBomb++;
        }
    if (foundBomb === bombCount){
        document.getElementById("mineOver").innerHTML = "You WIN!!! Click <span id='MineReload'>here</span> to play again";
        document.getElementById("MineReload").addEventListener("click", GameReload);
        notHere.forEach((value) => {
            document.getElementById(value).style.backgroundColor = "green";
        });
        console.log("You Win")
    }
      });
      function GameReload(){                                                                   // refresh the page (will take this out once I figure out why my 'Clean the Field Loop isn't working)
        location.reload();
        }
/*
    gridArray.push(placeGrid.id);  
    placeGrid.textContent = placeGrid.id;
 }
 console.log(gridArray);



*/