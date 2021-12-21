const regex = new RegExp("#(.*)"); 
//This regex returns substring after the # in the string

var menuToggled = false;
var main = document.querySelector("main"); //The main content of the page
var navbar = document.querySelector("nav"); //The navbar at the top of the page
var links = document.querySelectorAll("a"); //All the links of the page
var banner = document.getElementById("banner");
var mobileMenu = document.getElementById("mobile-menu"); //The part of the menu that is only visible on mobile devices
var mobileButton = document.getElementById("mobile-menu-icon"); //The mobile menu button, only visible on mobiles devices

 
window.onscroll = ( () => {
//This callback is executed everytime the the page is scrolled

    if (window.pageYOffset >= ((banner.offsetTop + window.innerHeight) - (window.innerHeight / 100) * 5)) { //Removed 5% of the calculcation
    //When the user can't see the banner anymore

        navbar.classList.add("sticky");
        main.classList.add("add-padding");

    } else {
    //If the user can see the banner

    navbar.classList.remove("sticky");
    main.classList.remove("add-padding");
    }
});

links.forEach(link => {
    link.addEventListener("click", (element) => {
    //This part of code get all links in a for boucle

        element.preventDefault(); //Prevent the link to be clicked
        let completeLink = element.path[0].href; //Return a string like "https://domain.com/folder/page.html#section"
        let destination = regex.exec(completeLink)[1]; //Return a string like "section"
        let isMobile = element.path[0].classList[0] === "mobile" ? true : false;

        if(destination === "") {
            window.scrollTo(0, 0);

        } else {

            let title = document.getElementById(destination);
            let marginTop = (window.innerHeight / 100) * 10; //10% of the height of the page
            window.scrollTo(0, title.offsetTop - marginTop);

        }

        if(isMobile) {
            menuToggled = false;
            navbar.classList.remove("nav-larger");
            mobileMenu.style.display = "none";
        }
    });
});

mobileButton.addEventListener("click", () => {
//This callback is executed when the mobile menu button is clicked

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
