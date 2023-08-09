// 必要上方を宣言（後にクラスに渡す）
const template = "代目の将軍は？";
const arr = ["徳川家康", "徳川秀忠", "徳川家光", "徳川家綱", "徳川綱吉", "徳川家宣", "徳川家継", "徳川吉宗", "徳川家重", "徳川家治", "徳川家斉", "徳川家慶", "徳川家定", "徳川家茂", "徳川慶喜"];
// ここで、何秒間待つのかを指定する（後にクラスに渡す）
const num1 = 5;
const num2 = 3;

const setup = new quiz_setup(num1, num2, template, arr);
setup.start_btn_addEvent();
setup.stop_btn_addEvent();
setup.pause_btn_addEvent();
setup.skip_btn_addEvent();

