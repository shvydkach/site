

// Елемент reader завжди є на сторінці (у розмітці)
// Тому, він не залежить від асинхронності fetcher

const reader = document.querySelector(".reader")
const readerCloseBtn = document.querySelector(".reader-close-btn")


// Про всяк випадок: коли тільки завантажується головна сторінка, зачинити "Прочитувач"
localStorage.setItem("reader-opened", false)
closeReader()


export function openReader() {
  reader.classList.add("reader-active")
  localStorage.setItem("reader-opened", true)
}

export function closeReader() {
  reader.classList.remove("reader-active")
  localStorage.setItem("reader-opened", false)
}

readerCloseBtn.addEventListener("click", () => {
  closeReader()
})