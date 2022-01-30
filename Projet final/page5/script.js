const GAME_TABLE = document.getElementById("game-table");

let playerPosition = [undefined, undefined]; //x, y
let playerDirection = "down"; 

let maxX = 12;
let maxY = 12;

const LEVEL = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", "C", "H", "H", "H", "H", "H", "H", "H", "H", "C", " "],
    [" ", "V", "G", "G", "G", "G", "P", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "B", "T", "G", "G", "V", " "],
    [" ", "V", "G", "G", "B", "T", "G", "G", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "B", "T", "G", "G", "V", " "],
    [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
    [" ", "C", "H", "H", "H", "H", "H", "H", "H", "H", "C", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
]

// C = Corner, to link vertical and horizontal wall - Player cant walk here or push it
// V = Vertical wall - Player cant walk here or push it
// H = Horizontal wall - Player cant walk here or push it
// G = Ground - Player can walk on it but he cant push it
// B = Box - Player cant walk here but he can push push it
// T = Target, Where the player should push the box - Player can walk on it but he cant push it
// P = Player


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

        }
    }
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
            //Collision play sound later
            console.log

    } else {
        emptyCase(playerPosition[0], playerPosition[1])
        playerPosition = JSON.parse(JSON.stringify(potentialPosition));
        drawImage(playerPosition[0], playerPosition[1], "player-" + playerDirection);
    }

});
