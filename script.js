const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

//Let's create a function to initalise the games start


function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];//ALL Boxes Empty on the back of the logic
    
    boxes.forEach((box, index) => {   //All the boxes Empty on the UI
        box.innerText = "";  
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`
    console.log("Iinitialised");
}

boxes.forEach((box,index) => {   //Event Listner Applied on each and every boxes inorder to encounter the clicks!
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

initGame();

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    } 
    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";

    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) //ALL the three boxes are non empty and equal
            && (gameGrid[position[0]] === gameGrid[position[1]]) &&(gameGrid[position[1]] === gameGrid[position[2]])){

                if(gameGrid[position[0]] === "X"){
                    answer="X";
                }
                else{
                    answer = "O";
                }
                //Disable Pointe events inorder to stop the possibility of 2 winners
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })
                //Now we know the winner add win class
                //add the green color now
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
        }
    });
    if(answer !== "" ) {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }


    if(fillCount === 9){
        gameInfo.innerText("Game Tied !");
        newGameBtn.classList.add("active");
    }

}






function handleClick(index){
    //Clicked Box is Empty
    //if non empty -> make it unclickable
    //Box clicking
    //Swaps X<->O change of the players
    //Win Check
    //Win or all 9 filled with some listner

    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer; //X or O //Update on the ui
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();//Swap the turn of the players after Encountering the clicks
        checkGameOver();//Check if anyone has won or not //This function would have the most logic of the game
    }
    
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);




