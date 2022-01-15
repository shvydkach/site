import getDataUkraine from "./fetch-ukraine.js"
import getDataWorld from "./fetch-world.js"
import getDataCabinet from "./fetch-cabinet.js"
import getDataSport from "./fetch-sport.js"
import getDataEconomics from "./fetch-economics.js"
import getDataScience from "./fetch-science.js"
import getDataCulture from "./fetch-culture.js"


// getDataUkraine()
//   .then(news => console.log(news[1].title))

const newsContainer = document.querySelector(".news")

const categories = document.querySelectorAll(".category")

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
  
}


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



// function check() {
//   const currentActiveCategory = localStorage.getItem("category-active")
// }