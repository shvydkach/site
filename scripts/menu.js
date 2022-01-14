/* menu.js: Логіка для відкриття-згортання меню  */

const btnWrap = document.querySelector(".header-btn")
const btnBurger = document.querySelector(".header-burger")
const menuList = document.querySelector(".header-menu")
const pageBody = document.querySelector("body")


document.querySelector(".header-btn").addEventListener("click", () => {
  btnBurger.classList.toggle("active")
  menuList.classList.toggle("active")
  pageBody.classList.toggle("lock")
})

document.querySelector(".header-link").addEventListener("click", () => {
  btnBurger.classList.toggle("active")
  menuList.classList.toggle("active")
  pageBody.classList.toggle("lock")
})
