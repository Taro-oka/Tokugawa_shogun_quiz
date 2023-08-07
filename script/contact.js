const msg = document.querySelector(".contact__message");
const btn = document.querySelector(".send-btn");

let sent_name;
let sent_email;
let sent_msg;

btn.addEventListener("click", function(){

    sent_name = document.querySelector("input[name = name]").value;
    sent_email = document.querySelector("input[name = email]").value;
    sent_msg = document.querySelector("textarea[name = message]").value;

    if (!sent_name || !sent_email || !sent_msg) {
        alert("未入力の項目があります")
        return "Can't be executed"
    }else{
        msg.classList.add("inview");
    }   
});


