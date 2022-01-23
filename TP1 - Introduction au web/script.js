let form = document.getElementById("form-bg");
let response = document.getElementById("bg");

form.addEventListener("submit", (event) => {

    event.preventDefault();
    
    if(response.value == "oui je suis bg et j'adore valérie pécresse") {
        alert("Ok, bienvenue dans le fan club");

    } else if(response.value == "kamil est gué") {
        alert("oui c'est vraie.....................")

    } else {
        alert("Non désolé tu peux pas être fan de valérie.................")
    }
});