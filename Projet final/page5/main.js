const GAME_TABLE = document.getElementById("game-table");
const GAME_CONTAINER = document.getElementById("game-container");
const START_MENU = document.getElementById("start-menu");
const VICTORY_SCREEN = document.getElementById("victory-screen");

const SUCCESS_AUDIO = document.getElementById("success-sound");
const COLLISION_AUDIO = document.getElementById("collision-sound");
const BOX_SLIDE_AUDIO = document.getElementById("box-slide-sound");
const VICTORY_AUDIO = document.getElementById("victory-audio");

let gameStarted = false;

let playerPosition = [undefined, undefined]; //x, y
let playerDirection = "down"; 

let maxX = 12;
let maxY = 13;

let targetsPositions = [];

let targetsFilled = 0;
let totalTargets = 0;

let currentLevel = -1;
let level = [];

function nextLevel() {
    currentLevel++;

    if(currentLevel == 0) {
        START_MENU.style.display = "none";

    } else {
        GAME_TABLE.innerHTML = "";
    }

    if(currentLevel >= LEVELS.length) {
        gameStarted = false;
        GAME_CONTAINER.style.display = "none";
        VICTORY_SCREEN.style.display = "block";

    } else {
        startGame();
    }
}

function startGame() {

    GAME_CONTAINER.style.display = "flex";
    gameStarted = true;

    playerPosition = [undefined, undefined]; //x, y
    playerDirection = "down"; 

    maxX = 12;
    maxY = 13;

    targetsPositions = [];

    targetsFilled = 0;
    totalTargets = 0;

    level = JSON.parse(JSON.stringify(LEVELS[currentLevel]));
    

    //Drawing the game table
    for(x = 0; x < maxX; x++) {

        let row =  GAME_TABLE.insertRow(); //Creation of a tr element 
        row.id = x;

        for(y = 0; y < maxY; y++) {
            let cell = row.insertCell(y); //Creation of a td element
            cell.id = x + "-" + y;

            if(level[x][y] === "G") {
                cell.style.backgroundImage = "url('./sprites/ground.png')";

            } else if(level[x][y] === "H") {
                cell.style.backgroundImage = "url('./sprites/wall-h.png')";

            } else if(level[x][y] === "V") {
                cell.style.backgroundImage = "url('./sprites/wall-v.png')";

            } else if(level[x][y] == "C") {
                cell.style.backgroundImage = "url('./sprites/wall-corner.png')";
            
            } else if(level[x][y] == "P") {
                cell.style.backgroundImage = "url('./sprites/ground.png')";
                drawImage(x, y, "player-down");
                playerPosition = [x, y]

            } else if(level[x][y] == "B") {
                cell.style.backgroundImage = "url('./sprites/ground.png')";
                drawImage(x, y, "box");

            } else if(level[x][y] == "T") {
                cell.style.backgroundImage = "url('./sprites/target.png')";
                targetsPositions.push([x, y])
                totalTargets++;

            }
        }
    }

    updateScoreDisplay();

}

function wasTarget(x, y) {

    for(i = 0 ; i < targetsPositions.length; i++) {
        if(targetsPositions[i][0] == x && targetsPositions[i][1] == y) {
            return true;
        }
    }

    return false;
}

function drawImage(x, y, image) {
    document.getElementById(x + "-" + y).innerHTML = `<img id='player' src=./sprites/${image}.png>`;
}

function emptyCase(x, y) {
    document.getElementById(x + "-" + y).innerHTML = ""
}

function checkColision(x, y) {

    if(level[x][y] != "G" && level[x][y] != "P" && level[x][y] != "T") {
    //If the player try to go on something else that the ground, his starting
    //position of a target
        return true;
    }

    return false;
}

function updateScoreDisplay() {
    document.getElementById("display-var").innerHTML = `${targetsFilled}/${totalTargets}`;
}

document.addEventListener("keydown", (event) => {

    if(gameStarted) {

        let potentialPosition = JSON.parse(JSON.stringify(playerPosition))
    
        if(event.key === "z" || event.key === "ArrowUp") {
            playerDirection = "up"
            potentialPosition[0] -= 1;
    
        } else if(event.key === "s" || event.key === "ArrowDown") {
            playerDirection = "down"
            potentialPosition[0] += 1;
    
        } else if(event.key === "q" || event.key === "ArrowLeft") {
            playerDirection = "left"
            potentialPosition[1] -= 1;
    
        } else if(event.key === "d" || event.key === "ArrowRight") {
            playerDirection = "right"
            potentialPosition[1] += 1;
    
        } 
    
        drawImage(playerPosition[0], playerPosition[1], "player-" + playerDirection);
        //Change the direction of the player before he moves
    
        if(checkColision(potentialPosition[0], potentialPosition[1])) {
                
            if(level[potentialPosition[0]][potentialPosition[1]] == "B" || level[potentialPosition[0]][potentialPosition[1]] == "F") {
    
                let boxMoved = false;
                let boxPosition = [undefined, undefined]
    
                if(playerDirection == "down" && !checkColision(potentialPosition[0] + 1, potentialPosition[1])) {
                    boxPosition = [potentialPosition[0] + 1, potentialPosition[1]];
                    boxMoved = true
    
                } else if(playerDirection == "up" && !checkColision(potentialPosition[0] - 1, potentialPosition[1])) {
                    
                    boxPosition = [potentialPosition[0] - 1, potentialPosition[1]];
                    boxMoved = true
    
                } else if(playerDirection == "left" && !checkColision(potentialPosition[0], potentialPosition[1] - 1)) {
                    boxPosition = [potentialPosition[0], potentialPosition[1] - 1];
                    boxMoved = true
    
                } else if(playerDirection == "right" && !checkColision(potentialPosition[0], potentialPosition[1] + 1)) {
                    boxPosition = [potentialPosition[0], potentialPosition[1] + 1];
                    boxMoved = true
    
                }
    
                if(boxMoved) {
                    //Changing the position of the box on the matrix and drawing it
    
                    if(wasTarget(potentialPosition[0], potentialPosition[1])) {
                        level[potentialPosition[0]][potentialPosition[1]] = "T";
                        targetsFilled--;
    
                    } else {
                        level[potentialPosition[0]][potentialPosition[1]] = "G";
                    }
                    
                    if(level[boxPosition[0]][boxPosition[1]] == "T") {
                        level[boxPosition[0]][boxPosition[1]] = "F";
                        drawImage(boxPosition[0], boxPosition[1], "box-in");
    
                        targetsFilled++;
                        SUCCESS_AUDIO.play();
                        
                    } else {
                        level[boxPosition[0]][boxPosition[1]] = "B";
                        drawImage(boxPosition[0], boxPosition[1], "box");
                    }
    
                    BOX_SLIDE_AUDIO.play();
                    updateScoreDisplay()
        
                    emptyCase(playerPosition[0], playerPosition[1]);
                    playerPosition = JSON.parse(JSON.stringify(potentialPosition));
                    drawImage(potentialPosition[0], playerPosition[1], "player-" + playerDirection);
                    //Change the player position

                    if(targetsFilled === totalTargets) {
                        VICTORY_AUDIO.play();
                        nextLevel();
                    }
    
    
                } else {
                //Box cant move
                    COLLISION_AUDIO.play();
                }
    
            }else {
                //Player collidded with something else
                    COLLISION_AUDIO.play();
                }
    
        } else {
            emptyCase(playerPosition[0], playerPosition[1])
            playerPosition = JSON.parse(JSON.stringify(potentialPosition));
            drawImage(playerPosition[0], playerPosition[1], "player-" + playerDirection);
        }
    }
});

document.getElementById("start-button").addEventListener("click", () => {
    nextLevel();
});

document.getElementById("replay-button").addEventListener("click", () => {
    currentLevel = 0;
    VICTORY_SCREEN.style.display = "none";
    nextLevel();
});