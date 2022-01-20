function getRandomHexColor() {
    let randomInt = Math.floor(Math.random() * (9999999 - 0 + 1) + 0);
    //This calculation return's a random int of nine digits

    let hexString = "#" + randomInt.toString(16);
    //Convert the int to the hex format for CSS

    return hexString;
}

pickeds = [];
c = 0;

for(i = 0; i < 50000; i++) {
    color = getRandomHexColor();
    if(pickeds.includes(color)) {
        c++;
    } else {
        pickeds.push(color);
    }
}

console.log(c);