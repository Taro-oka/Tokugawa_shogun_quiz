const msg = document.querySelector(".contact__message");
const btn = document.querySelector(".send-btn");

let sent_name;
let sent_email;
let sent_msg;

// 送信ボタンが押されたら、データを岡本のメールへ送信するイベント
btn.addEventListener("click", function(){

    // フォームに書かれた内容をこの変数に格納する
    sent_name = document.querySelector("input[name = name]").value;
    sent_email = document.querySelector("input[name = email]").value;
    sent_msg = document.querySelector("textarea[name = message]").value;

    // 未記入の時は、null、つまりフォルシーなのんで、エラーが出るようにする
    if (!sent_name || !sent_email || !sent_msg) {
        alert("未入力の項目があります")
        return "Can't be executed"
    }else{
        btn.textContent = "送信中....";
        btn.disabled = true;

        // メールの本文内で使う変数「name」「email」「notes」。EmailJSのサイトの、メールテンプレート編集のところでいじれる。
        const templateParams = {
            name: sent_name,
            email: sent_email,
            notes: sent_msg,
        };
        
        // 送信する。この関数は外部からEmailJSのファイルを読み込んでいるので使える。
        emailjs.send('service_e2b0ypw', 'template_841zc4l', templateParams)
            .then(function(response) {
                btn.textContent = "送信";
                msg.classList.add("inview");
            }, function(error) {
               btn.textContent = "送信";
               btn.disabled = false;
               alert('送信できませんでした', error);
            });
    }   
});


