import getDataUkraine from "./fetch-ukraine.js"
import getDataWorld from "./fetch-world.js"
import getDataCabinet from "./fetch-cabinet.js"
import getDataSport from "./fetch-sport.js"
import getDataEconomics from "./fetch-economics.js"
import getDataScience from "./fetch-science.js"
import getDataCulture from "./fetch-culture.js"



const newsContainer = document.querySelector(".news")
const categories = document.querySelectorAll(".category")

// Під час першого відкриття, завантажити новини відповідної категорії
newsContainer.innerHTML = ``
switch (localStorage.getItem("category-active")) {
  case "Україна":
    getDataUkraine()
      .then(dataUkraine => loadContent(dataUkraine))
      .catch(err => console.log(err))
    break;
  case "Світ":
    getDataWorld()
      .then(dataWorld => loadContent(dataWorld))
      .catch(err => console.log(err))
    break;
  case "Уряд":
    getDataCabinet()
      .then(dataCabinet => loadContent(dataCabinet))
      .catch(err => console.log(err))
    break;
  case "Спорт":
    getDataSport()
      .then(dataSport => loadContent(dataSport))
      .catch(err => console.log(err))
    break;
  case "Економіка":
    getDataEconomics()
      .then(dataEconomics => loadContent(dataEconomics))
      .catch(err => console.log(err))
    break;
  case "Наука":
    getDataScience()
      .then(dataScience => loadContent(dataScience))
      .catch(err => console.log(err))
    break;
  case "Культура":
    getDataCulture()
      .then(dataCulture => loadContent(dataCulture))
      .catch(err => console.log(err))
    break;
  case "Різне":
    console.log("Вибрано різне")
    break;
  default:
    console.log("Якась помилка")
    break;
}


// Коли вибирається (натискається), якась з категорій
categories.forEach(categoryBtn => {
  categoryBtn.addEventListener("click", () => {
    switch (categoryBtn.innerHTML) {
      case "Україна":
        getDataUkraine()
          .then(dataUkraine => loadContent(dataUkraine))
          .catch(err => console.log(err))
        break;
      case "Світ":
        getDataWorld()
          .then(dataWorld => loadContent(dataWorld))
          .catch(err => console.log(err))
        break;
      case "Уряд":
        getDataCabinet()
          .then(dataCabinet => loadContent(dataCabinet))
          .catch(err => console.log(err))
        break;
      case "Спорт":
        getDataSport()
          .then(dataSport => loadContent(dataSport))
          .catch(err => console.log(err))
        break;
      case "Економіка":
        getDataEconomics()
          .then(dataEconomics => loadContent(dataEconomics))
          .catch(err => console.log(err))
        break;
      case "Наука":
        getDataScience()
          .then(dataScience => loadContent(dataScience))
          .catch(err => console.log(err))
        break;
      case "Культура":
        getDataCulture()
          .then(dataCulture => loadContent(dataCulture))
          .catch(err => console.log(err))
        break;
      case "Різне":
        console.log("Вибрано різне")
        break;
      default:
        console.log("Якась помилка")
        break;
    }
  })
})



// Це все буде відбуватись асинхронно
// Тому, трохи тяжко розділити код в інші файли, 
// бо він синхронний і не "встигає" завантажити контент
// (точніше він робить це раніше)
// Треба буде писати логіку всередині цієї функції,
// бо знову ж таки, loadContent() викликається з обіцянки
// функцій getData*Category*() і тому є асинхронною
function loadContent(data) {
  /* data - це масив з новинами [{"title": "...", ....}, {}, {}] */

  // Очищення від новин
  newsContainer.innerHTML = ``

  // Створення та відтворення на сторінці новин відповідної категорії
  data.forEach(novyna => {
    const novynaEl = createNovynaElement(novyna)
    // ПОКРАЩИТИ: mountNovynaEl(novynaEl) -> можна зробити сторінкування
    newsContainer.appendChild(novynaEl)
  })

  // На цьому етапі новини завантажено в структуру HTML
  // Тому можна додавати функції для прочитання новини

  // Отримання всіх кнопок "Старт прочитання" (трикутник)
  const startBtns = document.querySelectorAll(".novyna-start")

  // Коли натискається кнопка "Старт прочитання" (трикутник)
  startBtns.forEach(startBtn => {
    startBtn.addEventListener("click", () => {
      startReader(startBtn)
    })
  })
  
}





function startReader(clickedBtn) {
  //  Div, до якого належить ця кнопка. Він зберігає дані через dataset
  const novynaEl = clickedBtn.parentElement
  
  // Дані (текст, посилання, потім - медіа), отримані з div
  const content = novynaEl.dataset.content
  const links = novynaEl.dataset.links
  
  // reader.classList.add("active")
  // localStorage.setItem("reader-opened", true)
  
}

// start.addEventListener("click", () => {
//   updateSpeed()
//   let inputText = splitBySpaces(inputBlock.value)
//   let words = forComp(inputText)

//   if (canStartAgain) {
//     showing(words)  
//   }
// })







// Допоміжні функції:

function createNovynaElement(novynaDataArr) {
  /*
  Схема
  <div class="novyna" data>
    <div class="novyna-title">
      <p class="novyna-title-text">
        Вітер, сніг та температура близько нуля: прогноз погоди на грудень
      </p>
    </div>
    <div class="novyna-start">
      <span class="novyna-start-btn"></span>
    </div>
  </div>
  */

  const novynaEl = document.createElement("div")
  novynaEl.classList.add("novyna")
  novynaEl.innerHTML = `
    <div class="novyna-title">
      <p class="novyna-title-text">
        ${novynaDataArr.title}
      </p>
    </div>
    <div class="novyna-start">
      <span class="novyna-start-btn"></span>
    </div>
  `
  novynaEl.dataset.content = novynaDataArr.content
  novynaEl.dataset.links = JSON.stringify(novynaDataArr.links)

  return novynaEl
}

