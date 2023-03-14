const xClass = 'x';
const circleClass = 'circle';
let turn = xClass;
let currentClass;
const cellElements = document.querySelectorAll('[data-cell]');
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

const winningTextMessage = document.querySelector('#winning-message');
const winningMessage = document.querySelector('.winner-display');
const displayWinningTag = 'show';
const restartMessage = document.querySelector('#restartButton');


restartMessage.addEventListener('click',startGame);

//this function needs to be run on starting the game
function startGame(){

    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.addEventListener('click', handleClick, {once: true});
    })

    // boardHoverEffect();
    winningMessage.classList.remove(displayWinningTag);
}


function handleClick(e){

    const cell = e.target;
    if(turn == xClass){
        currentClass = xClass;
    } else {
        currentClass = circleClass;
    }

    //inorder to place the mark
    placeMark(cell, currentClass);

    //we have to check for the winning combinations
    if(winningCombo(currentClass)){
        endGame(false);
        // console.log("winner")
    } else if(isDraw()){
        endGame(true);
    } else {
        //now we have to write a function to swap the function
        swapClass(currentClass);

        //invoke the function 
        boardHoverEffect();
    }
}

//inorder to check whether the game is draw or not
function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass);
    })
}

//inorder to check whether the game is ended or not
function endGame(draw){
    if(draw){
        winningTextMessage.innerText = "Draw!";
    } else {
        // console.log("won")
        //we simply have to check whose turn is going on 
        if(currentClass === xClass){
            winningTextMessage.innerText = "X Wins!";
        } else {
            winningTextMessage.innerText = "0 Wins!";
        }
    }
    winningMessage.classList.add(displayWinningTag);
}

//inorder to place the marks for the class
function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

//inorder to swap the class
function swapClass(){
    if(turn === xClass){
        turn = circleClass;
    } else {
        turn = xClass;
    }
}
//now we have to check the winning combinations
function winningCombo(currentClass){
    return winningCombinations.some(combinations => {
        return combinations.every(index => {
            return cellElements[index].classList.contains(currentClass); 
        })
    })
}


//now we want to bring back the hover effect to the screen
function boardHoverEffect(){
    board.classList.remove(xClass);
    board.classList.remove(circleClass);

    if(turn === xClass) board.classList.add(xClass);
    else board.classList.add(circleClass);
}

//invoking the function
startGame();