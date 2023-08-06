const header_btn = document.querySelector(".header__btn");
const mobile_menu = document.querySelector(".mobile_menu");
const mobile_menu_btn = document.querySelector(".mobile_menu__btn");

header_btn.addEventListener("touchstart", function() {
    mobile_menu.classList.add("inview");
}); 

mobile_menu_btn.addEventListener("touchstart", function() {
    mobile_menu.classList.remove("inview");
});

const arrow = document.querySelector(".arrow");
arrow.addEventListener("click", function(){
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

window.addEventListener("scroll", function() {
    const scroll = window.scrollY;
    if (scroll > 200) {
      arrow.classList.add("inview");
    } else {
        arrow.classList.remove("inview"); 
    }
})