import getDataUkraine from "./fetch-ukraine.js"
import getDataWorld from "./fetch-world.js"
import getDataCabinet from "./fetch-cabinet.js"
import getDataSport from "./fetch-sport.js"
import getDataEconomics from "./fetch-economics.js"
import getDataScience from "./fetch-science.js"
import getDataCulture from "./fetch-culture.js"

import { getWpm } from "./reader-reading.js"
import { focusIndex } from "./reader-reading.js"
import { splitBySpaces } from "./reader-reading.js"
import { forComp } from "./reader-reading.js"
import { forUser } from "./reader-reading.js"

import { openReader } from "./reader.js"
import { closeReader } from "./reader.js"



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
      wordOutput.innerHTML = ``
      openReader()
      showContent()
      startReader(startBtn)
    })
  })

  // Кнопка закриття "Прочитувача"
  const readerCloseBtn = document.querySelector(".reader-close-btn")

  readerCloseBtn.addEventListener("click", () => {
    closeReader()
    localStorage.setItem("reading", false)
  })


  const actionBtnText = document.querySelector(".reader-action-btn-text")
  const actionBtnLinks = document.querySelector(".reader-action-btn-links")
  const actionBtnMedia = document.querySelector(".reader-action-btn-media")
  const actionOverlay = document.querySelector(".reader-action-overlay")
  const actionOverlayCloseBtn = document.querySelector(".reader-action-close-btn")
  const actionActionText = document.querySelector(".reader-action-text")
  const actionActionLinks = document.querySelector(".reader-action-links")
  const actionActionMedia = document.querySelector(".reader-action-media")

  // Дії (текст, посилання, медіа) можна буде запустити тільки після прочитання новини
// Тобто тоді, коли відкрито Прочитувач і не прочитується

  actionOverlayCloseBtn.addEventListener("click", () => {
    actionOverlay.classList.remove("reader-action-overlay-active")
    actionActionText.classList.remove("reader-action-active")
    actionActionLinks.classList.remove("reader-action-active")
    actionActionMedia.classList.remove("reader-action-active")
  })

  actionBtnText.addEventListener("click", () => {
    if (localStorage.getItem("reading") == "false") {
      
      actionOverlay.classList.add("reader-action-overlay-active")

      actionActionText.innerHTML = `
      Тестовий текст lorem ipsum dolor, sit amet consectetur adipisicing elit. 
      <br> <br> <br> <br> <br> <br> <br>
      `

      actionActionText.classList.add("reader-action-active")
      actionActionLinks.classList.remove("reader-action-active")
      actionActionMedia.classList.remove("reader-action-active")

    }
    else {
      console.log("Ще не можна")
    }
  })

  actionBtnLinks.addEventListener("click", () => {
    if (localStorage.getItem("reading") == "false") {
      
      actionOverlay.classList.add("reader-action-overlay-active")

      actionActionText.classList.remove("reader-action-active")
      actionActionLinks.classList.add("reader-action-active")
      actionActionMedia.classList.remove("reader-action-active")
    }
    else {
      console.log("Ще не можна")
    }
  })

  actionBtnMedia.addEventListener("click", () => {
    if (localStorage.getItem("reading") == "false") {
      
      actionOverlay.classList.add("reader-action-overlay-active")

      actionActionLinks.innerHTML = `
        <div class="reader-action-link">
          <div class="reader-action-link-title">
            Оригінальне інтерв'ю:
          </div>
          <div class="reader-action-link-url">
            <a href="https://instagram.com/shvydkach" target="_blank"> 
              https://instagram.com/shvydkach 
            </a>
          </div>
        </div>
        <br> <br> <br> <br> <br> <br> <br>
      `

      actionActionText.classList.remove("reader-action-active")
      actionActionLinks.classList.remove("reader-action-active")
      actionActionMedia.classList.add("reader-action-active")
    }
    else {
      console.log("Ще не можна")
    }
  })

}


// Запускає "Прочитувач"
function startReader(clickedBtn) {
  // clickedBtn - це кнопка "Старт прочитання" (трикутник)

  // console.log(clickedBtn.parentElement.nextSibling)
  // console.log(clickedBtn.parentElement.previousSibling)
  // if (!clickedBtn.parentElement.previousSibling) {
  //   console.log(clickedBtn.parentElement)
  // } else {
  //   console.log(clickedBtn.parentElement.previousSibling)
  // }

  //  Div, до якого належить ця кнопка. Він зберігає дані через dataset
  const novynaEl = clickedBtn.parentElement
  
  // Дані (текст, посилання) отримані з div
  // ПОТІМ: отримання медіа, так само
  const content = novynaEl.dataset.content
  const links = novynaEl.dataset.links
  
  const wordsSplitted = splitBySpaces(content)
  const wordsToRead = forComp(wordsSplitted)
  const wordsForTransliteration = forUser(wordsSplitted)
  
  showing(wordsToRead) 

  // ДОДАТИ потім: керування станами
  // if (canStartAgain) {
  //   showing(words)  
  // }
}



// Елемент в який 'щосекунди' буде вставлятись слово
const wordOutput = document.querySelector(".reader-text-output-word")


function showing(input) {
  // input - масив з розподілених слів, отриманих за допомогою forComp

  showContent()

  let counter = -1
  localStorage.setItem("reading", true)

  if (input.length > 0) {
    const interval = setInterval(() => {
      if (counter !== input.length - 1) {

          // Якщо перестає читатись (натиснута кнопка закриття прочитувача)
          // "false" в лапках, бо localStorage зберігає його як рядок
          if (localStorage.getItem("reading") == "false") {
            clearInterval(interval)
            wordOutput.innerHTML = ``
            // Не треба показувати навігацію
          }

          counter++   

          // Слово, що має прочитуватись
          let currentWord = input[counter]

          // Індекс тої букви, яка має виділятись при сфокусованому режимі прочитання
          let focusOn = focusIndex(currentWord)
          
          if (focusOn !== undefined) {
            let firstLetters = currentWord.substring(0, focusOn) 
            let focusLetter = currentWord.substring(focusOn, focusOn + 1)
            let lastLetters = currentWord.substring(focusOn + 1, currentWord.length)

            // Заміна всіх пробілів на спецсимвол &nbsp;
            // Це для того, щоб не було переносу на інший рядок
            // Наприклад: 
            // редакторський текст: "[16 - 17] грудня"
            // Функція splitBySpaces повертає з цього масив: ["[16", "-", "17]", "грудня"]
            // Функція forComp повертає з цього масив: ["16 - 17", "грудня"]
            // Нижчезастосований replaceAll замінює пробіли на &nbsp;
            // Так, що "16 - 17" перетворюється на "16&nbsp;-&nbsp;17" , яке й вставляється в HTML
            firstLetters = firstLetters.replaceAll(" ", "&nbsp;")
            focusLetter = focusLetter.replaceAll(" ", "&nbsp;")
            lastLetters = lastLetters.replaceAll(" ", "&nbsp;")

            wordOutput.innerHTML = `
            <span class="focused">
              <span class="letter letter1">${firstLetters}</span>
              ${focusLetter}
              <span class="letter letter2">${lastLetters}</span>
            </span>
          `
          }
          // якщо слово задовге, то focusOn буде undefined, і це виконається
          else {
            clearInterval(interval)
            console.log("Помилка! Задовге слово")
          }
      } 
      else {
        // Закінчення прочитання
        clearInterval(interval)
        wordOutput.innerHTML = ``
        localStorage.setItem("reading", false)
        showNavigation()
      }
    }, getWpm())
  } 
  else {
    console.log("Немає вхідних даних")
  }
}



const outputEndmessage = document.querySelector(".reader-text-output-endmessage")
const outputWord = document.querySelector(".reader-text-output-word")

function showNavigation() {
  outputEndmessage.classList.add("reader-text-output-endmessage-active")
  outputWord.classList.remove("reader-text-output-word-active")
}

function showContent() {
  outputEndmessage.classList.remove("reader-text-output-endmessage-active")
  outputWord.classList.add("reader-text-output-word-active")
}



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

