const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

// Початкове встановлення (при завантаженні сторінки)
appHeight() 
// Повторне встановлення (при зміні розмірів)
window.addEventListener('resize', appHeight)
