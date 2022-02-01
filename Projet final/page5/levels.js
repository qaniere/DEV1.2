const LEVELS = [
    [
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
    ],

    [
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", "C", "H", "H", "H", "H", "H", "H", "H", "H", "H", "C", " "],
        [" ", "V", "P", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
        [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
        [" ", "V", "G", "G", "G", "G", "G", "G", "G", "G", "G", "V", " "],
        [" ", "V", "H", "G", "H", "H", "C", "H", "H", "H", "G", "V", " "],
        [" ", "V", "G", "B", "G", "G", "H", "G", "G", "G", "G", "V", " "],
        [" ", "V", "G", "B", "G", "G", "G", "G", "G", "G", "T", "V", " "],
        [" ", "V", "G", "G", "G", "G", "V", "G", "G", "G", "T", "V", " "],
        [" ", "V", "G", "G", "G", "G", "V", "G", "G", "G", "G", "V", " "],
        [" ", "C", "H", "H", "H", "H", "H", "H", "H", "H", "H", "C", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ],


]

// C = Corner, to link vertical and horizontal wall - Player cant walk here or push it
// V = Vertical wall - Player cant walk here or push it
// H = Horizontal wall - Player cant walk here or push it
// G = Ground - Player can walk on it but he cant push it
// B = Box - Player cant walk here but he can push push it
// T = Target, Where the player should push the box - Player can walk on it but he cant push it
// F = Filled target, a box is placed here - Player cant walk on it but he can push it
// P = Player - Dont need to be update, considered as ground after
