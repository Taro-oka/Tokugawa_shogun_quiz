// 着火点となる要素
const scroll_items = document.querySelectorAll('.shogun_list__item');

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
};

// 実行する
const observer = new IntersectionObserver(showElements, options);

// 各要素に到達したら発動。複数あるから forEach 使う
scroll_items.forEach(item => {
  observer.observe(item);
});

// 要素が表示されたら実行する動作
function showElements(entries){
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // 各要素にinview を加える
      entry.target.classList.add('inview');
    }
  });
};