// setting-wpm-index.js: якщо користувач тільки зайшов на сайт (на index.html)
// то створити в сховищі 'wpm' і надати типового значення

localStorage.getItem("wpm") 
  ? null
  : localStorage.setItem("wpm", 270)
