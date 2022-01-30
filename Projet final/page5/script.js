const GAME_TABLE = document.getElementById("game-table");

let playerPosition = [1, 7];
let playerDirection = "down";

let maxX = 15;
let maxY = 15;

//Drawing the game table
for(i = 0; i < maxX; i++) {

    let row =  GAME_TABLE.insertRow(); //Creation of a tr element 
    row.id = i;

    for(j = 0; j < maxY; j++) {
        let cell = row.insertCell(j); //Creation of a td element
        cell.id = i + "-" + j;
    }
}

function drawPlayer(x, y, direction) {
    document.getElementById(x + "-" + y).innerHTML = `<img id='player' src=./sprites/${direction}.png>`;
}

function emptyCase(x, y) {
    document.getElementById(x + "-" + y).innerHTML = ""
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

    drawPlayer(playerPosition[0], playerPosition[1], playerDirection);
    //Change the direction of the player before he moves15

    if(potentialPosition[0] === -1 || potentialPosition[0] === maxX || 
       potentialPosition[1] === -1 || potentialPosition[1] === maxY) {
            //Collision play sound later
            console.log

    } else {
        emptyCase(playerPosition[0], playerPosition[1])
        playerPosition = JSON.parse(JSON.stringify(potentialPosition));
        drawPlayer(playerPosition[0], playerPosition[1], playerDirection);
    }

});

drawPlayer(playerPosition[0], playerPosition[1], playerDirection);