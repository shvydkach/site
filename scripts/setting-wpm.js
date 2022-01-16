/* setting-theme.js: отримання, встановлення та збреження в локальне сховище швидкості прочитання (слів за хвилину) */


const wpmMinusBtn = document.querySelector(".wpm-minus-btn")
const wpmPlusBtn = document.querySelector(".wpm-plus-btn")
const wpmText = document.querySelector(".wpm-speed")

// Встановлення  типового значення при завантаженні
localStorage.getItem("wpm") 
  ? null
  : localStorage.setItem("wpm", 270)

// Встановлення типового значення при завантаженні
wpmText.innerHTML = localStorage.getItem("wpm")

// Коли натискається "-", відповідно змінити
wpmMinusBtn.addEventListener("click", () => {
  const currentWpm = localStorage.getItem("wpm")
  localStorage.setItem("wpm", +currentWpm - 5)
  wpmText.innerHTML = localStorage.getItem("wpm")
})

// Коли натискається "+", відповідно змінити
wpmPlusBtn.addEventListener("click", () => {
  const currentWpm = localStorage.getItem("wpm")
  localStorage.setItem("wpm", +currentWpm + 5)
  wpmText.innerHTML = localStorage.getItem("wpm")
})


