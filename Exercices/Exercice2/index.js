const regex = new RegExp("#(.*)");

var menuToggled = false;
var main = document.querySelector("main");
var navbar = document.querySelector("nav");
var links = document.querySelectorAll("a");
var banner = document.getElementById("banner");
var mobileMenu = document.getElementById("mobile-menu");
var button = document.getElementById("mobile-menu-icon");

 
window.onscroll = ( () => {

    if (window.pageYOffset >= (banner.offsetTop + window.innerHeight)) {
        navbar.classList.add("sticky");
        main.classList.add("add-padding");

      } else {

        navbar.classList.remove("sticky");
        main.classList.remove("add-padding");
      }

});

button.addEventListener("click", () => {

    if(menuToggled) {

        menuToggled = false;
        navbar.classList.remove("nav-larger");
        mobileMenu.style.display = "none";

    } else {

        menuToggled = true;
        navbar.classList.add("nav-larger");
        mobileMenu.style.display = "block";
    }
});

links.forEach(link => {
    link.addEventListener("click", (element) => {

        element.preventDefault();
        let completeLink = element.path[0].href;
        let destination = regex.exec(completeLink)[1];

        if(destination === "") {
            window.scrollTo(0, 0);

        } else {
            
            let title = document.getElementById(destination);
            let pad = window.innerHeight / 9;
            console.log(pad);
            window.scrollTo(0, title.offsetTop - pad);
        }
    });
});
