// Елемент reader завжди є на сторінці (у розмітці)
// Тому, він не залежить від асинхронності fetcher.js

const reader = document.querySelector(".reader")
const bodyEl = document.querySelector("body")
const mainEl = document.querySelector("main")
const readerCloseBtn = document.querySelector(".reader-close-btn")


// Про всяк випадок: коли тільки завантажується головна сторінка, зачинити "Прочитувач"
localStorage.setItem("reader-opened", false)
// closeReader()


export function openReader() {
  reader.classList.add("reader-active")
  bodyEl.classList.add("locked-for-reading")
  mainEl.classList.add("blurried-for-reading")
  localStorage.setItem("reader-opened", true)
}

export function closeReader() {
  reader.classList.remove("reader-active")
  bodyEl.classList.remove("locked-for-reading")
  mainEl.classList.remove("blurried-for-reading")
  localStorage.setItem("reader-opened", false)
  localStorage.setItem("reading", false)
}

readerCloseBtn.addEventListener("click", () => {
  closeReader()
})