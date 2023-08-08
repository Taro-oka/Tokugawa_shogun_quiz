// モバイルメニュの表示
const header_btn = document.querySelector(".header__btn");
const mobile_menu = document.querySelector(".mobile_menu");
const mobile_menu_btn = document.querySelector(".mobile_menu__btn");

header_btn.addEventListener("touchstart", function() {
    mobile_menu.classList.add("inview");
}); 

mobile_menu_btn.addEventListener("touchstart", function() {
    mobile_menu.classList.remove("inview");
});

// スクロールした時にヘッダーを見せたり消したり
const header = document.querySelector(".header");
let previousScroll = 0;  // 前回のスクロール量
let scrolled = 0;  // 現在のスクロール量

window.addEventListener("scroll", function(){

    previousScroll = scrolled;
    scrolled = window.scrollY;
  
    if(scrolled > previousScroll){  // スクロールした時
        header.classList.add("deactivate"); // headerを画面外へ非表示
    }else{  // バックスクロールした時
        header.classList.remove("deactivate"); // headerを再表示
    }
});


// トップへ戻るボタン
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