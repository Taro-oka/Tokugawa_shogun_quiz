const header_btn = document.querySelector(".header__btn");
const mobile_menu = document.querySelector(".mobile_menu");
const mobile_menu_btn = document.querySelector(".mobile_menu__btn");

header_btn.addEventListener("touchstart", function() {
    mobile_menu.classList.add("inview");
}); 

mobile_menu_btn.addEventListener("touchstart", function() {
    mobile_menu.classList.remove("inview");
});