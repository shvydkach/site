// categories-state.js: керування станами активних категорій новин 
// (яка саме вибрана), збереження через локальне сховище

//  localStorage.getItem("category-active") - активна, вибрана категорія (незалежно від нічого)
//  localStorage.getItem("category-additional") - "третя" головна категорія для мобільних пристроїв

// В базі даних (data.json) категорії треба буде записувати саме так:
const categories = [
  "Україна",
  "Світ",
  "Уряд", 
  "Спорт",
  "Економіка",
  "Наука",
  "Культура",
  "Різне", // поєднання усіх
]

const ctgrUkraineMobile = document.querySelector(".category-mobile-ukraine")
const ctgrWorldMobile = document.querySelector(".category-mobile-world")
const ctgrCabinetMobile = document.querySelector(".category-mobile-cabinet")
const ctgrSportMobile = document.querySelector(".category-mobile-sport")
const ctgrEconomicsMobile = document.querySelector(".category-mobile-economics")
const ctgrScienceMobile = document.querySelector(".category-mobile-science")
const ctgrCultureMobile = document.querySelector(".category-mobile-culture")
const ctgrAllMobile = document.querySelector(".category-mobile-all")

const ctgrChangeablePlaceMobile = document.querySelector(".category-mobile-main-changeable")


// Якщо немає збереженої category-active, то створити її і встановити "Україна" (типова)
localStorage.getItem("category-active")
  ? null
  : localStorage.setItem("category-active", "Україна")
  
// Якщо немає збереженої category-additional, то створити її і встановити "Різне" (типова)
localStorage.getItem("category-additional")
  ? null
  : localStorage.setItem("category-additional", "Різне")

// Як завантажується головна сторінка, встановити відповідний текст до "третьої головної"
ctgrChangeablePlaceMobile.innerHTML = localStorage.getItem("category-additional")

// Як завантажується головна сторінка, встановити відповідний стиль до головної
switch (localStorage.getItem("category-active")) {
  case "Україна":
    ctgrUkraineMobile.classList.add("category-mobile-main-selected")
    break;
  case "Світ":
    ctgrWorldMobile.classList.add("category-mobile-main-selected")
    break;
  default:
    ctgrChangeablePlaceMobile.classList.add("category-mobile-main-selected")
    break;
}

// Покращити
// 
ctgrUkraineMobile.addEventListener("click", () => {
  localStorage.setItem("")
})