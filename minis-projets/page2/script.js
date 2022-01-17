const FORM = document.getElementById("register-form");
const USERNAME_INPUT = document.getElementById("username");
const AGE_INPUT = document.getElementById("age");
const PASSWORD_INPUT = document.getElementById("password");
const PASSWORD_VERIFICATION_INPUT = document.getElementById("password-verification");
const REGISTER_TABLE = document.getElementById("register-table");
const DELETE_BUTTON = document.getElementById("delete-button");
//Retrieve all HTML nodes in constants

let id = 0;
let userDatabase = [];
//The default values of the localStorage variables
//The database is a list which contains JSON object. 
//Each objet represents a user (attributes : id, username, age, registerDate, hashedPassword)

if(localStorage.getItem("id") != null && localStorage.getItem("database") != null) {
//If the localStorage isn't empty

    id = parseInt(localStorage.getItem("id"));
    userDatabase = JSON.parse(localStorage.getItem("database"));
    //Replacing default values by retrieved one 

    for(i = 0; i < userDatabase.length; i++) {
        createLine(REGISTER_TABLE, userDatabase[i]);
    }
}

/**
 * This function return true is the username given is
 * present in the database given.
 *  
 * @param {list} list The database. It must be a list which contains JSON objects with the attribute username
 * @param {string} username The username to be searched for.
 */
function is_username_taken(list, username) {

    for(i = 0; i < list.length; i++) {
        if(username == list[i].username) {
            return true;
        }
    }

    return false;
}

/**
 * This function return the position of the JSON object.
 * with contains the given id. "null" is returned if there.
 * is an error.
 * 
 * @param {list} list The database. It must be a list which contains JSON objects with the attribute id.
 * @param {number} id The id attributes of the JSON object to retrieve.
 */
function getIndexOfUser(list, id) {

    for(i = 0; i < list.length; i++) {
        if(id == parseInt(list[i].id)) {
            return i;
        }
    } 

    return null;
}

function getDateTime() {
    let today = new Date();

    let day = today.getDate() > 10 ? today.getDate() : "0" + today.getDate();
    let month = (today.getMonth() + 1) > 10 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1);
    let year = today.getFullYear() > 10 ? today.getFullYear() : "0" + today.getFullYear();

    let hours = today.getHours();
    let minutes = today.getMinutes() > 10 ? today.getMinutes() : "0" + today.getMinutes();
    let seconds = today.getSeconds() > 10 ? today.getSeconds() : "0" + today.getSeconds();
    

    let completeDate = day + "/" + month + "/" + year;
    let completeTime = hours + ":" + minutes + ":" + seconds;
    return completeDate + " " + completeTime;
}

function createLine(element, infos) {

    let row = element.insertRow(); //Creation of a tr element 
    let cell1 = row.insertCell(0); //Creation of a td element
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    let cell6 = row.insertCell(5);

    row.id = infos.id;
    cell1.innerText = infos.id;
    cell2.innerText = infos.username;
    cell3.innerText = infos.age;
    cell4.innerText = infos.registerDate;
    cell5.innerHTML = "<div class='hash-div'>" + infos.hashedPassword + "</div>";
    cell6.innerHTML = "<button id='" + infos.id + "'>Supprimer</button>";

    cell6.children[0].addEventListener("click", () => {

        let confirmOperation = confirm("Voulez-vous vraiment supprimer cet utilisateur ?");

        if(confirmOperation) {
            let rowId = cell6.children[0].id
            document.getElementById(rowId).remove();
            
            let index_to_pop = getIndexOfUser(userDatabase, rowId);
            userDatabase.splice(index_to_pop, 1);
            localStorage.setItem("database", JSON.stringify(userDatabase));
        }   
    });
}

async function hashSha512(message) {

    const msgBuffer = new TextEncoder().encode(message);     
    const hashBuffer = await crypto.subtle.digest("SHA-512", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
}

FORM.addEventListener("submit", (event) => {

    event.preventDefault(); //Prevent the default behaviour of the form HTML element (use post or get)

    let username = USERNAME_INPUT.value;
    let age = AGE_INPUT.value; //Convert the string input into a int
    let password = PASSWORD_INPUT.value;
    let passwordVerification = PASSWORD_VERIFICATION_INPUT.value;


    if (username.length > 20) {
        alert("Le nom d'utilisateur est trop grand (20 caractères maximums)");

    } else if(is_username_taken(userDatabase, username)) {
        alert("Ce nom d'utilisateur est déjà utilisé.");

    } else if(age < 0 || age > 130) {
        alert("Votre age doit être compris entre 0 et 130ans.");

    } else if(password != passwordVerification) {
        alert("Le mot de passe et la confirmation ne sont pas identiques");

    } else {

        if(age == "") {
            age = "N/C";
        }

        let registerDate = getDateTime();

        hashSha512(password).then( (hashedPassword) => {

            id++;
            new_entry = {
                "id": id,
                "username": username,
                "age": age,
                "registerDate": registerDate,
                "hashedPassword": hashedPassword
            };
            userDatabase.push(new_entry);
            localStorage.setItem("database", JSON.stringify(userDatabase)); 
            localStorage.setItem("id", id);

            createLine(REGISTER_TABLE, new_entry)

            alert("Inscription réussie !");
            USERNAME_INPUT.value = "";
            AGE_INPUT.value = "";
            PASSWORD_INPUT.value = "";
            PASSWORD_VERIFICATION_INPUT.value = "";

            
        });
    }
});

/**
 * This function does no take any parameters, she is called when the 
 * delete button is clicked and then she ask user confirmation and clear 
 * table and localStorage.
 */
 DELETE_BUTTON.addEventListener("click", () => {

    let userConfirmation = confirm("Voulez-vous vraiment effacer toutes les entrées ?");

    if(userConfirmation) {

        for(i = 0; i < userDatabase.length; i++) {
           let idToDelete = userDatabase[i].id;
           document.getElementById(idToDelete).remove();
        }

        localStorage.removeItem("id");
        localStorage.removeItem("database");
    }
});
