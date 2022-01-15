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


const categoriesComp = document.querySelectorAll(".category-comp")
const categoriesMobile = document.querySelectorAll(".category-mobile")
const ctgrChangeablePlaceMobile = document.querySelector(".category-mobile-main-changeable")


// Якщо немає збереженої category-active, то створити її і встановити "Україна" (типова)
localStorage.getItem("category-active")
  ? null
  : localStorage.setItem("category-active", "Україна")
  
// Якщо немає збереженої category-additional, то створити її і встановити "Різне" (типова)
localStorage.getItem("category-additional")
? null
: localStorage.setItem("category-additional", "Різне")

// Як завантажеться головна сторінка, встановити відповідний текст до "третьої головної"
ctgrChangeablePlaceMobile.innerHTML = localStorage.getItem("category-additional")

// Якщо при завантаженні сторінки, збереженою активною категорією не є ані "Україна", ані "Світ"
if (localStorage.getItem("category-active") != "Україна" && localStorage.getItem("category-active") != "Світ") {
  ctgrChangeablePlaceMobile.classList.add("category-mobile-selected")
  ctgrChangeablePlaceMobile.innerHTML = localStorage.getItem("category-active")
}

// Як завантажеться головна сторінка, встановити відповідний стиль до головної (комп)
categoriesComp.forEach(categoryComp => {
  if (categoryComp.innerHTML == localStorage.getItem("category-active")) {
    categoryComp.classList.add("category-comp-selected")
    otherClearSelectedClassComp(categoryComp.innerHTML)
  }
})

// Як завантажеться головна сторінка, встановити відповідний стиль до головної (мобільні)
categoriesMobile.forEach(categoryMobile => {
  if (categoryMobile.innerHTML == localStorage.getItem("category-active")) {
    categoryMobile.classList.add("category-mobile-selected")
    otherClearSelectedClassMobile(categoryMobile.innerHTML)
  }
})

// Коли натискається (вибирається) якась категорія на комп
categoriesComp.forEach(categoryComp => {
  categoryComp.addEventListener("click", () => {
    localStorage.setItem("category-active", categoryComp.innerHTML)
    categoryComp.classList.add("category-comp-selected")
    otherClearSelectedClassMobile(categoryComp.innerHTML)
    otherClearSelectedClassComp(categoryComp.innerHTML)
  })
})

// Коли натискається (вибирається) якась категорія на мобільному
categoriesMobile.forEach(categoryMobile => {
  categoryMobile.addEventListener("click", () => {
    localStorage.setItem("category-active", categoryMobile.innerHTML)
    categoryMobile.classList.add("category-mobile-selected")
    otherClearSelectedClassMobile(categoryMobile.innerHTML)
    otherClearSelectedClassComp(categoryMobile.innerHTML)
    // ctgrChangeablePlaceMobile не належить до categoriesMobile
    ctgrChangeablePlaceMobile.classList.remove("category-mobile-selected")
    
    // Якщо це натиснуто (вибрано) категорію з віконечка-modal
    if (categoryMobile.classList.contains("category-mobile-modal")) {
      // Зачинити це віконечко-modal (фактично прибрати класи)
      document.querySelector(".categories-mobile-modal").classList.remove("categories-mobile-modal-active")
      document.querySelector(".categories-mobile-overlay").classList.remove("categories-mobile-overlay-active")
      // Встановити збережене відповідно до вибраної категорії
      localStorage.setItem("category-additional", categoryMobile.innerHTML)
      // Покласти відповідну назву в "третє" місце
      ctgrChangeablePlaceMobile.innerHTML = localStorage.getItem("category-additional")
      // Додати відповідний стиль до "третього" місця
      ctgrChangeablePlaceMobile.classList.add("category-mobile-selected")
    }
  })
})


// Коли натискається (вибирається) "третя" категорія з головних на мобільному 
ctgrChangeablePlaceMobile.addEventListener("click", () => {
  localStorage.setItem("category-active", ctgrChangeablePlaceMobile.innerHTML)
  ctgrChangeablePlaceMobile.classList.add("category-mobile-selected")
  otherClearSelectedClassMobile(ctgrChangeablePlaceMobile.innerHTML)
  otherClearSelectedClassComp(ctgrChangeablePlaceMobile.innerHTML)
  // categoriesMobile.forEach(categoryMobile => {
  //   if (categoriesMobile.innerHTML == localStorage.getItem("category-active"))
  // })
})

// Якщо "третя" категорія є активною, то відповідно підсвітити її 
if (ctgrChangeablePlaceMobile.innerHTML == localStorage.getItem("category-active")) {
  document.querySelector(".category-mobile-ukraine").classList.remove("category-mobile-selected")
  document.querySelector(".category-mobile-world").classList.remove("category-mobile-selected")
  ctgrChangeablePlaceMobile.classList.add("category-mobile-selected")
  otherClearSelectedClassMobile(ctgrChangeablePlaceMobile.innerHTML)
}



/* Допоміжні функції: */

function otherClearSelectedClassComp(exceptInnerHTML) {
  const categoriesCompArr = Array.from(categoriesComp)
  
  const filteredCategoriesComp = categoriesCompArr.filter(categoryComp => {
    return categoryComp.innerHTML != exceptInnerHTML
  })

  filteredCategoriesComp.forEach(notSelectedCategory => {
    notSelectedCategory.classList.remove("category-comp-selected")
  })
}

function otherClearSelectedClassMobile(exceptInnerHTML) {
  const categoriesMobileArr = Array.from(categoriesMobile)
  
  const filteredCategoriesComp = categoriesMobileArr.filter(categoryMobile => {
    return categoryMobile.innerHTML != exceptInnerHTML
  })

  filteredCategoriesComp.forEach(notSelectedCategory => {
    notSelectedCategory.classList.remove("category-mobile-selected")
  })
}




