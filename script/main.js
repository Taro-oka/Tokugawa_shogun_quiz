const template = "代目の将軍は？";
const arr = ["徳川家康", "徳川秀忠", "徳川家光", "徳川家綱", "徳川綱吉", "徳川家宣", "徳川家継", "徳川吉宗", "徳川家重", "徳川家治", "徳川家斉", "徳川家慶", "徳川家定", "徳川家茂", "徳川慶喜"];

const time = document.querySelector(".time");
const text = document.querySelector(".text");
const quiz_text_box = document.querySelector(".quiz__box__text");
const bg = document.querySelector(".bg");
const start_btn = document.querySelector(".start_btn");
const stop_btn = document.querySelector(".stop_btn");
const pause_btn = document.querySelector(".pause_btn");
const skip_btn = document.querySelector(".skip_btn");

// ここで、何秒間待つのかを指定する
const num1 = 5;
const num2 = 3;

let timeId;
let index;
let nth_in_arr;
// クイズを動かすフラグ
let flg = true;
// 今問題が表示なのか、答えが表示なのかを知らせるフラグ（アニメーションなどで必要）
let q_flg = true;
// ポーズをするかどうかのフラグ
let pause_flg = false;
let anime_state;
let cnt;
let val1;
let val2;

start_btn.addEventListener("click", function(){
    cntdown(num1,num2,0,0);
    // スタートボタンの連打で狂わないように、ここではフォルスを。セットタイムインターバルは押した数だけ生成されてしまう。
    flg = false;
    pause_flg = true;
});

stop_btn.addEventListener("click", function(){
    clearInterval(timeId);
    timeId = "";
    time.textContent = "";
    text.textContent = "";
    pause_btn.textContent = "pause";
    bg.style.backgroundColor="#fff";
    q_flg = true;
    flg = true;
    pause_flg = false;
});

skip_btn.addEventListener("click", function() {
    if(timeId) {
        clearInterval(timeId);
        flg = true;
        if(q_flg) {
            cntdown(num1,num2,0,nth_in_arr + 1 );
        }else{
            q_flg = true;
            cntdown(num1,num2,0,nth_in_arr);
        }
        flg = false;
        pause_flg = true;
    }else{
        flg = true;
        pause_flg = false;
    }
    pause_btn.textContent = "pause";
    q_flg = true;
});

pause_btn.addEventListener("click", function() {
    if(pause_flg) {
        if(pause_btn.textContent === "pause") {
            pause();
            pause_btn.textContent = "resume";
        }else{
            resume();
            pause_btn.textContent = "pause";
        }
    }else{
        // 何もしない
        console.log("didnt");
    }
});

function setintv() {
    return setInterval(function(){
        if(index <= 1) {
            cnt ++;

            // 名前が消え、問題が現れた後
            if(cnt%2 === 0) {
                q_flg = true;
                index = val1;
                shrinkTofit(`${nth_in_arr + 1}` + template);
                text.textContent = `${nth_in_arr + 1}` + template;
            
            // 問題が消え、名前が現れた後
            }else{
                q_flg = false;
                index = val2;
                shrinkTofit(arr[nth_in_arr]);
                text.textContent = arr[nth_in_arr];
                
                if(nth_in_arr >= arr.length - 1) {
                    nth_in_arr = 0;
                }else{
                    nth_in_arr ++;
                }
            }
        }else{
            index --;
            // console.log(nth_in_arr);
        }
        time.innerHTML = index;
        bg_color();
        if(q_flg) {
            animation();
        }
    },1000)

}

function cntdown(arg_val1, arg_val2, arg_cnt = 0, nth = 0) {
    if(flg === false) {
        return "cannt be excecuted"
    }
    val1 = arg_val1;
    val2 = arg_val2;
    index = val1;
    cnt = arg_cnt;
    nth_in_arr = nth;
    time.textContent = index;
    shrinkTofit(`${nth_in_arr + 1}` + template);
    text.textContent = `${nth_in_arr + 1}` + template;
    animation();
    bg_color();

    timeId = setintv();
}
// cntdown(num1,num2);

function animation() {
    // バックグラウンドの横幅を取得し、その半分の距離だけ後ろ(-Z方向)にずらす。そうしないとiosでの表示では、上の文字に重なってしまう。
    const bg_width = Math.ceil(bg.clientWidth / 2);
    bg.animate([
        {transform: `translateZ(-${bg_width}px) rotateY(0)`},
        {transform: `translateZ(-${bg_width}px) rotateY(180deg)`}
    ], {
         duration: 300,
         easing : "linear",
         iterations: 1,
    });
}

function shrinkTofit(txt) {
    const txtContent = txt;
    const width = quiz_text_box.clientWidth;
    const length = txtContent.length;
    const current_fontSize = getComputedStyle(quiz_text_box).fontSize.replace("px", "");
    const calced_fontSize = Math.floor(width / length);

    if(calced_fontSize < current_fontSize) {
        text.style.fontSize = `${calced_fontSize}px`;
    }else{
        text.style.fontSize = `${current_fontSize}px`;
    }
}

function bg_color() {
    if(q_flg) {
        bg.style.backgroundColor="rgba(192, 255, 255, 0.6)";
    }else{
        bg.style.backgroundColor="#fff";
    }
}

function pause() {
    clearInterval(timeId);
}

function resume() {
    if(timeId) {
        clearInterval(timeId)
    }
    timeId = setintv();
}
