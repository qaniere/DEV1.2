const form = document.getElementById("register-form");
const usernameInput = document.getElementById("username");
const ageInput = document.getElementById("age");
const passwordInput = document.getElementById("password");
const passwordVerificationInput = document.getElementById("password-verification");

let id = 0;
const registerTable =  document.getElementById("register-table");


async function hashSha512(message) {

    const msgBuffer = new TextEncoder().encode(message);     
    const hashBuffer = await crypto.subtle.digest("SHA-512", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
}

form.addEventListener("submit", (event) => {

    event.preventDefault(); //Prevent the default behaviour of the form HTML element (use post or get)

    let username = usernameInput.value;
    let age = parseInt(ageInput.value); //Convert the string input into a int
    let password = passwordInput.value;
    let passwordVerification = passwordVerificationInput.value;


    if (username.length > 20) {
        alert("Le nom d'utilisateur est trop grand (20 caractères maximums)");

    } else if(age < 0 || age > 130) {
        alert("Votre age doit être compris entre 0 et 130ans.");

    }else if(password != passwordVerification) {
        alert("Le mot de passe et la confirmation ne sont pas identiques");

    } else {

        hashSha512(password).then( (hashedPassword) => {

            id++;
            let row = registerTable.insertRow(); //Creation of a tr element 
            let cell1 = row.insertCell(0); //Creation of a td element
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            let cell4 = row.insertCell(3);
            let cell5 = row.insertCell(4);

            row.id = id;
            cell1.innerText = id;
            cell2.innerText = username;
            cell3.innerText = age;
            cell4.innerHTML = "<div class='hash-div'>" + hashedPassword + "</div>";
            cell5.innerHTML = "<button id='" + id + "'>Supprimer</button>";

            cell5.children[0].addEventListener("click", () => {

                let confirmOperation = window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?");

                if(confirmOperation) {
                   document.getElementById(cell5.children[0].id).remove();
                }   

            });

            alert("Inscription réussie !");
            usernameInput.value = "";
            ageInput.value = "";
            passwordInput.value = "";
            passwordVerificationInput.value = "";
        });
    }
});
