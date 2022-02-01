const GAME_TABLE = document.getElementById("game-table");

let playerPosition = [undefined, undefined]; //x, y
let playerDirection = "down"; 

let maxX = 12;
let maxY = 13;

let targetsPositions = [];

let targetsFilled = 0;
let totalTargets = 0;

const LEVEL = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "C", "H", "H", "H", "H", "H", "H", "H", "H", "H", "C", " "],
    [" ", "V", "G", "G", "G", "G", "P", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "B", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "B", "G", "G", "G", "B", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "T", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "T", "G", "G", "G", "T", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
    [" ", "C", "H", "H", "H", "H", "H", "H", "H", "H", "H", "C", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
]

// C = Corner, to link vertical and horizontal wall - Player cant walk here or push it
// V = Vertical wall - Player cant walk here or push it
// H = Horizontal wall - Player cant walk here or push it
// G = Ground - Player can walk on it but he cant push it
// B = Box - Player cant walk here but he can push push it
// T = Target, Where the player should push the box - Player can walk on it but he cant push it
// F = Filled target, a box is placed here - Player cant walk on it but he can push it
// P = Player - Dont need to be update, considered as ground after


//Drawing the game table
for(x = 0; x < maxX; x++) {

    let row =  GAME_TABLE.insertRow(); //Creation of a tr element 
    row.id = x;

    for(y = 0; y < maxY; y++) {
        let cell = row.insertCell(y); //Creation of a td element
        cell.id = x + "-" + y;

        if(LEVEL[x][y] === "G") {
            cell.style.backgroundImage = "url('./sprites/ground.png')";

        } else if(LEVEL[x][y] === "H") {
            cell.style.backgroundImage = "url('./sprites/wall-h.png')";

        } else if(LEVEL[x][y] === "V") {
            cell.style.backgroundImage = "url('./sprites/wall-v.png')";

        } else if(LEVEL[x][y] == "C") {
            cell.style.backgroundImage = "url('./sprites/wall-corner.png')";
        
        } else if(LEVEL[x][y] == "P") {
            cell.style.backgroundImage = "url('./sprites/ground.png')";
            drawImage(x, y, "player-down");
            playerPosition = [x, y]

        } else if(LEVEL[x][y] == "B") {
            cell.style.backgroundImage = "url('./sprites/ground.png')";
            drawImage(x, y, "box");

        } else if(LEVEL[x][y] == "T") {
            cell.style.backgroundImage = "url('./sprites/target.png')";
            targetsPositions.push([x, y])
            totalTargets++;

        }
    }
}

updateScoreDisplay();

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

    if(LEVEL[x][y] != "G" && LEVEL[x][y] != "P" && LEVEL[x][y] != "T") {
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
            
        if(LEVEL[potentialPosition[0]][potentialPosition[1]] == "B" || LEVEL[potentialPosition[0]][potentialPosition[1]] == "F") {

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
                    LEVEL[potentialPosition[0]][potentialPosition[1]] = "T";
                    targetsFilled--;

                } else {
                    LEVEL[potentialPosition[0]][potentialPosition[1]] = "G";
                }
                
                if(LEVEL[boxPosition[0]][boxPosition[1]] == "T") {
                    LEVEL[boxPosition[0]][boxPosition[1]] = "F";
                    drawImage(boxPosition[0], boxPosition[1], "box-in");
                    targetsFilled++;
                    
                } else {
                    LEVEL[boxPosition[0]][boxPosition[1]] = "B";
                    drawImage(boxPosition[0], boxPosition[1], "box");
                }

                updateScoreDisplay()

                emptyCase(playerPosition[0], playerPosition[1]);
                playerPosition = JSON.parse(JSON.stringify(potentialPosition));
                drawImage(potentialPosition[0], playerPosition[1], "player-" + playerDirection);
                //Change the player position
            }
        }

    } else {
        emptyCase(playerPosition[0], playerPosition[1])
        playerPosition = JSON.parse(JSON.stringify(potentialPosition));
        drawImage(playerPosition[0], playerPosition[1], "player-" + playerDirection);
    }

});
