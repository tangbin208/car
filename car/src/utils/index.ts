export function sleep(time = 100) {
  return new Promise(resolve => {
    setTimeout(resolve, time);
  });
}
// 图片懒加载
export function Lazyload(this: any,el: HTMLElement,) {
  this.el = el || window;
  this.init();
}
Lazyload.prototype = {
  init() {
		let loadImg=Debounce(()=>{this.loadImg()});
    this.el.addEventListener("scroll", () => {
     loadImg();
    });
    this.loadImg();
  },
  loadImg() {
    let imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll("img[data-src]");
    imgs.forEach((item) => {
      if (item.src === item.dataset.src || !item.dataset.src) return;
      if (this.isIntoView(item)) {
        item.src = item.dataset.src;
      }
    });
  },
  isIntoView(el: HTMLElement) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top > 0 &&
      rect.top < window.innerHeight &&
      rect.left > 0 &&
      rect.left < window.innerWidth
    );
  }
};
// 防抖,知道事件触发间隔频率大于一定时间再触发一次，
// 就像重新开始倒计时蓄力
// 经常用在滚动事件
// func 推荐使用箭头函数
export function Debounce(func: any, ms = 500) {
  let timer = 0;
  return function() {
    window.clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, ms);
  };
}
// 节流,事件每隔一定时间一定触发一次,
// 就像进入了冷却
export function Throttle(func, ms = 500) {
  let start = +new Date();
  return function() {
    let current = +new Date();
    if (current - start > ms) {
      func();
      start = current;
    }
  };
}
