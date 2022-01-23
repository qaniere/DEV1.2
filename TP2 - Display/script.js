const form = document.getElementById("register");
const usernameInput = document.getElementById("name");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    let username = usernameInput.value;
    alert("Bievenue dans le fanc club " + username + " !");

});