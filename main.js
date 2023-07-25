const template = "代目の将軍は？";
const arr = ["徳川家康", "徳川秀忠", "徳川家光", "徳川家綱", "徳川綱吉", "徳川家宣", "徳川家継", "徳川吉宗", "徳川家重", "徳川家治", "徳川家斉", "徳川家慶", "徳川家定", "徳川家茂", "徳川慶喜"];

const time = document.querySelector(".time");
const text = document.querySelector(".text");
const bg = document.querySelector(".bg");
const start_btn = document.querySelector(".start_btn");
const stop_btn = document.querySelector(".stop_btn");
const pause_btn = document.querySelector(".pause_btn");
const skip_btn = document.querySelector(".skip_btn");

const num1 = 5;
const num2 = 3;

let timeId;
let index;
let nth_in_arr;
let flg = true;
let q_flg = true;
let pause_flg = true;
let anime_state;
let cnt;
let val1;
let val2;

function setintv() {
    return setInterval(function(){
        if(index <= 1) {
            cnt ++;

            // 名前が消え、問題が現れた後
            if(cnt%2 === 0) {
                q_flg = true;
                index = val1;
                text.textContent = `${nth_in_arr + 1}` + template;
            
            // 問題が消え、名前が現れた後
            }else{
                q_flg = false;
                index = val2;
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
        time.innerHTML = `${index}<span class="bg"></span>`;
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
    text.textContent = `${nth_in_arr + 1}` + template;
    animation();
    bg_color();

    timeId = setintv();
}
// cntdown(num1,num2);

start_btn.addEventListener("click", function(){
    cntdown(num1,num2,0,0);
    flg = false;
    pause_flg = true;
});

stop_btn.addEventListener("click", function(){
    clearInterval(timeId);
    timeId = "";
    time.textContent = "";
    text.textContent = "";
    pause_btn.textContent = "pause";
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
    q_flg = true;
});

function animation() {
    bg.animate([
        {transform: 'rotateY(0)'},
        {transform: 'rotateY(180deg)'}
    ], {
         duration: 300,
         easing : "linear",
         iterations: 1,
    });
}

function bg_color() {
    if(q_flg) {
        bg.style.backgroundColor="rgba(192, 255, 255, 0.6)";
    }else{
        bg.style.backgroundColor="#fff";
    }
}

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

function pause() {
    clearInterval(timeId);
}

function resume() {
    if(timeId) {
        clearInterval(timeId)
    }
    timeId = setintv();
}


