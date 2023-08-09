class quiz_setup {
    constructor(num1, num2, template, arr){
        this.vars = {};
        this.vars.num1 = num1;
        this.vars.num2 = num2;
        this.vars.template = template;
        this.vars.arr = arr;
        this.vars.timeId;
        this.vars.index;
        this.vars.nth_in_arr;
        // クイズを動かすフラグ
        this.vars.flg = true;
        // 今問題が表示なのか、答えが表示なのかを知らせるフラグ（アニメーションなどで必要）
        this.vars.q_flg = true;
        // ポーズをするかどうかのフラグ（ページ読み込み時にはfalseで宣言。pauseだけいきなり押された時の発火を防ぐ）
        this.vars.pause_flg = false;
        this.vars.anime_state;
        this.vars.cnt;
        this.vars.val1;
        this.vars.val2;

        this.DOMs = {};
        this.DOMs.time = document.querySelector(".time");
        this.DOMs.text = document.querySelector(".text");
        this.DOMs.quiz_text_box = document.querySelector(".quiz__box__text");
        this.DOMs.bg = document.querySelector(".bg");
        this.DOMs.start_btn = document.querySelector(".start_btn");
        this.DOMs.stop_btn = document.querySelector(".stop_btn");
        this.DOMs.pause_btn = document.querySelector(".pause_btn");
        this.DOMs.skip_btn = document.querySelector(".skip_btn");
        
        this.funcs = {};
        this.funcs._setintv = this._setintv.bind(this);
        this.funcs._cntdown = this._cntdown.bind(this);
        this.funcs._animation = this._animation.bind(this);
        this.funcs._shrinkTofit = this._shrinkTofit.bind(this);
        this.funcs._bg_color = this._bg_color.bind(this);
        this.funcs._pause = this._pause.bind(this);
        this.funcs._resume = this._resume.bind(this);
    }

    start_btn_addEvent(){
        const _this = this;
        this.DOMs.start_btn.addEventListener("click", function(){
            _this.funcs._cntdown(_this.vars.num1, _this.vars.num2, 0, 0);
            _this.vars.flg = false;
            _this.vars.pause_flg = true;
        });
    }
    stop_btn_addEvent(){
        const _this = this;
        this.DOMs.stop_btn.addEventListener("click", function(){
            clearInterval(_this.vars.timeId);
            _this.vars.timeId = "";
            _this.DOMs.time.textContent = "";
            _this.DOMs.text.textContent = "";
            _this.DOMs.pause_btn.textContent = "pause";
            _this.DOMs.bg.style.backgroundColor="#fff";
            _this.vars.q_flg = true;
            _this.vars.flg = true;
            _this.vars.pause_flg = false;
        });
    }
    pause_btn_addEvent(){
        const _this = this;
        this.DOMs.pause_btn.addEventListener("click", function(){
            if(_this.vars.pause_flg) {
                if(_this.DOMs.pause_btn.textContent === "pause") {
                    _this.funcs._pause();
                    _this.DOMs.pause_btn.textContent = "resume";
                }else{
                    _this.funcs._resume();
                    _this.DOMs.pause_btn.textContent = "pause";
                }
            }else{
                // 何もしない
                // console.log("didnt");
            }
        })
    }
    skip_btn_addEvent(){
        const _this = this;
        this.DOMs.skip_btn.addEventListener("click", function(){
            if(_this.vars.timeId) {
                clearInterval(_this.vars.timeId);
                _this.vars.flg = true;
                if(_this.vars.q_flg) {
                    _this.funcs._cntdown(_this.vars.num1, _this.vars.num2, 0, _this.vars.nth_in_arr + 1 );
                }else{
                    _this.vars.q_flg = true;
                    _this.funcs._cntdown(_this.vars.num1, _this.vars.num2, 0, _this.vars.nth_in_arr);
                }
                _this.vars.flg = false;
                _this.vars.pause_flg = true;
            }else{
                _this.vars.flg = true;
                _this.vars.pause_flg = false;
            }
            _this.DOMs.pause_btn.textContent = "pause";
            _this.vars.q_flg = true;
        });
    }

    _setintv(){
        const _this = this;
        return setInterval(function(){
            if(_this.vars.index <= 1) {
                _this.vars.cnt ++;
    
                // 名前が消え、問題が現れた後
                if(_this.vars.cnt%2 === 0) {
                    _this.vars.q_flg = true;
                    _this.vars.index = _this.vars.val1;
                    _this._shrinkTofit(`${_this.vars.nth_in_arr + 1}` + _this.vars.template);
                    _this.DOMs.text.textContent = `${_this.vars.nth_in_arr + 1}` + _this.vars.template;
                
                // 問題が消え、名前が現れた後
                }else{
                    _this.vars.q_flg = false;
                    _this.vars.index = _this.vars.val2;
                    _this._shrinkTofit(_this.vars.arr[_this.vars.nth_in_arr]);
                    _this.DOMs.text.textContent = _this.vars.arr[_this.vars.nth_in_arr];
                    
                    if(_this.vars.nth_in_arr >= _this.vars.arr.length - 1) {
                        _this.vars.nth_in_arr = 0;
                    }else{
                        _this.vars.nth_in_arr ++;
                    }
                }
            }else{
                _this.vars.index --;
                // console.log(this.vars.nth_in_arr);
            }
            _this.DOMs.time.innerHTML = _this.vars.index;
            _this._bg_color();
            if(_this.vars.q_flg) {
                _this._animation();
            }
        },1000)
    }
    _cntdown(arg_val1, arg_val2, arg_cnt = 0, nth = 0) {
        if(this.vars.flg === false) {
            return "cannt be excecuted"
        }
        this.vars.val1 = arg_val1;
        this.vars.val2 = arg_val2;
        this.vars.index = this.vars.val1;
        this.vars.cnt = arg_cnt;
        this.vars.nth_in_arr = nth;
        this.DOMs.time.textContent = this.vars.index;
        this._shrinkTofit(`${this.vars.nth_in_arr + 1}` + this.vars.template);
        this.DOMs.text.textContent = `${this.vars.nth_in_arr + 1}` + this.vars.template;
        this._animation();
        this._bg_color();
    
        this.vars.timeId = this._setintv();
    }
    _animation() {
        // バックグラウンドの横幅を取得し、その半分の距離だけ後ろ(-Z方向)にずらす。そうしないとiosでの表示では、上の文字に重なってしまう。
        const bg_width = Math.ceil(this.DOMs.bg.clientWidth / 2);
        this.DOMs.bg.animate([
            {transform: `translateZ(-${bg_width}px) rotateY(0)`},
            {transform: `translateZ(-${bg_width}px) rotateY(180deg)`}
        ], {
            duration: 300,
            easing : "linear",
            iterations: 1,
        });
    }
    _shrinkTofit(txt){
        const txtContent = txt;
        const width = this.DOMs.quiz_text_box.clientWidth;
        const length = txtContent.length;
        const current_fontSize = getComputedStyle(this.DOMs.quiz_text_box).fontSize.replace("px", "");
        const calced_fontSize = Math.floor(width / length);

        if(calced_fontSize < current_fontSize) {
            this.DOMs.text.style.fontSize = `${calced_fontSize}px`;
        }else{
            this.DOMs.text.style.fontSize = `${current_fontSize}px`;
        }
    }
    _bg_color(){
        if(this.vars.q_flg) {
            this.DOMs.bg.style.backgroundColor="rgba(192, 255, 255, 0.6)";
        }else{
            this.DOMs.bg.style.backgroundColor="#fff";
        }
    }
    _pause(){
        clearInterval(this.vars.timeId);
    }
    _resume(){
        if(this.vars.timeId) {
            clearInterval(this.vars.timeId)
        }
        this.vars.timeId = this.funcs._setintv();
    }

}
