const GAME_TABLE = document.getElementById("game-table");
const GAME_CONTAINER = document.getElementById("game-container");
const START_MENU = document.getElementById("start-menu");
const VICTORY_SCREEN = document.getElementById("victory-screen");
const DISPLAY_CONTAINER = document.getElementById("display-container");

const SUCCESS_AUDIO = document.getElementById("success-sound");
const COLLISION_AUDIO = document.getElementById("collision-sound");
const BOX_SLIDE_AUDIO = document.getElementById("box-slide-sound");
const VICTORY_AUDIO = document.getElementById("victory-audio");
const MUSIC = document.getElementById("music")

BOX_SLIDE_AUDIO.volume = 0.5;
SUCCESS_AUDIO.volume = 0.5;

let gameStarted = false;
let musicOn = true;
let sfxOn = true;

let playerPosition = [undefined, undefined]; //x, y
let playerDirection = "down"; 

let maxX = 12;
let maxY = 13;

let targetsPositions = [];

let targetsFilled = 0;
let totalTargets = 0;

let movedBoxes = 0;
let bestMoveBoxes = 0;

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
        MUSIC.pause();
        MUSIC.currentTime = 0;

        GAME_CONTAINER.style.display = "none";
        DISPLAY_CONTAINER.style.display = "none";
        VICTORY_SCREEN.style.display = "block";

    } else {
        startGame();
    }
}

function startGame() {

    GAME_CONTAINER.style.display = "flex";
    DISPLAY_CONTAINER.style.display = "block";
    if(musicOn) {
        MUSIC.play();
    }

    MUSIC.volume = 1;
    gameStarted = true;

    playerPosition = [undefined, undefined]; //x, y
    playerDirection = "down"; 

    maxX = 12;
    maxY = 13;

    targetsPositions = [];

    targetsFilled = 0;
    totalTargets = 0;

    movedBoxes = 0;

    if(localStorage.getItem(currentLevel + "bestMovedBoxes") != null) {
        bestMoveBoxes = localStorage.getItem(currentLevel + "bestMovedBoxes");

    } else {
        bestMoveBoxes = 0;
    }


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
    document.getElementById("box-var").innerHTML = `${targetsFilled}/${totalTargets}`;
    document.getElementById("level-var").innerHTML = `${currentLevel + 1}/${LEVELS.length}`;
    document.getElementById("moved-box-var").innerHTML = movedBoxes;
    document.getElementById("best-box-var").innerHTML = bestMoveBoxes;
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
    
        } else if(event.key === "r") {
            let userConfirmation = confirm("Voulez-vous vraiment remettre à zéro ce niveau ?");

            if(userConfirmation) {
                if(sfxOn) {
                    COLLISION_AUDIO.play();
                }
                GAME_TABLE.innerHTML = "";
                startGame();
            }

            return; //Exit the function without go any further
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
    
                    movedBoxes++;

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
                        if(sfxOn) {
                            SUCCESS_AUDIO.play();
                        }
                                                
                    } else {
                        level[boxPosition[0]][boxPosition[1]] = "B";
                        drawImage(boxPosition[0], boxPosition[1], "box");
                    }
    
                    if(sfxOn) {
                        BOX_SLIDE_AUDIO.play();
                    }
                    updateScoreDisplay()
        
                    emptyCase(playerPosition[0], playerPosition[1]);
                    playerPosition = JSON.parse(JSON.stringify(potentialPosition));
                    drawImage(potentialPosition[0], playerPosition[1], "player-" + playerDirection);
                    //Change the player position

                    if(targetsFilled === totalTargets) {
                        if(sfxOn) {
                            if(bestMoveBoxes < movedBoxes) {
                                localStorage.setItem(currentLevel + "bestMovedBoxes", movedBoxes);
                            }

                            VICTORY_AUDIO.play();
                        }
                        
                        nextLevel();
                    }
    
    
                } else {
                //Box cant move
                    if(sfxOn) {
                        COLLISION_AUDIO.play();
                    }
                }
    
            }else {
                //Player collidded with something else
                    if(sfxOn) {
                        COLLISION_AUDIO.play();
                    }
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
    currentLevel = -1;
    VICTORY_SCREEN.style.display = "none";
    nextLevel();
});

document.getElementById("mute-play-music-button").addEventListener("click", () => {

    if(musicOn) {
        musicOn = false;
        MUSIC.pause();
        MUSIC.currentTime = 0;
        document.getElementById("mute-play-music-button").innerText = "Réactiver la musique";
        
    } else {
        musicOn = true;
        MUSIC.play();
        document.getElementById("mute-play-music-button").innerText = "Couper la musique";
    }
});

document.getElementById("mute-play-sfx-button").addEventListener("click", () => {

    if(sfxOn) {
        sfxOn = false;
        document.getElementById("mute-play-sfx-button").innerText = "Réactiver les effets sonores";
        
    } else {
        sfxOn = true;
        document.getElementById("mute-play-sfx-button").innerText = "Couper les effets sonores";
    }
});

document.getElementById("restart-button").addEventListener("click", () => {
    let userConfirmation = confirm("Voulez-vous vraiment remettre à zéro ce niveau ?");

    if(userConfirmation) {
        if(sfxOn) {
            COLLISION_AUDIO.play();
        }

        GAME_TABLE.innerHTML = "";
        startGame();
    }
});

document.getElementById("menu-button").addEventListener("click", () => {
    let userConfirmation = confirm("Voulez-vous vraiment retourner au menu ?");

    if(userConfirmation) {

        if(musicOn) {
            MUSIC.pause();
            MUSIC.currentTime = 0;
        }

        currentLevel = -1;
        GAME_TABLE.innerHTML = "";

        GAME_CONTAINER.style.display = "none";
        DISPLAY_CONTAINER.style.display = "none";
        START_MENU.style.display = "block"
    }
});

