/* setting-theme.js: отримання, встановлення та збреження в локальне сховище кольорової теми */


const btnLight = document.querySelector(".theme-light")
const btnDark = document.querySelector(".theme-dark")
const btnTheme = document.querySelector(".setting-select-theme")

function getCurrentTheme() {
  // Визначення теми користувача
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
  
  localStorage.getItem("site-theme") 
    ? theme = localStorage.getItem("site-theme") 
    : null

  theme == "light"
    ? btnLight.classList.add("theme-active")
    : btnDark.classList.add("theme-active")

  return theme
}

function loadTheme(theme) {
  const root = document.querySelector(":root")
  root.setAttribute("color-scheme",`${theme}`)
}


btnTheme.addEventListener("click", () => {
  let theme = getCurrentTheme()
  let audio

  if (theme === "dark") {
    audio = document.querySelector(".theme-audio-on")
    theme = "light"
    btnLight.classList.add("theme-active")
    btnDark.classList.remove("theme-active")
  } else {
    audio = document.querySelector(".theme-audio-off")
    theme = "dark"
    btnLight.classList.remove("theme-active")
    btnDark.classList.add("theme-active")
  }

  audio.currentTime = 0
  audio.play()
  localStorage.setItem("site-theme", `${theme}`)
  loadTheme(theme)
})

loadTheme(getCurrentTheme())

