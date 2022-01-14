/* theme.js: отримання та встановлення кольорової теми */


function getCurrentTheme() {
  // Визначення теми користувача
  let theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
  
  localStorage.getItem("site-theme") 
    ? theme = localStorage.getItem("site-theme") 
    : null

  return theme
}


function loadTheme(theme) {
  const root = document.querySelector(":root")
  root.setAttribute("color-scheme",`${theme}`)
}

loadTheme(getCurrentTheme())