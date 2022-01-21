// Дії (текст, посилання, медіа) можна буде запустити тільки після прочитання новини
// Тобто тоді, коли відкрито Прочитувач і не прочитується 

const actionBtnText = document.querySelector(".reader-action-btn-text")
const actionBtnLinks = document.querySelector(".reader-action-btn-links")
const actionBtnMedia = document.querySelector(".reader-action-btn-media")
const actionOverlay = document.querySelector(".reader-action-overlay")
const actionOverlayCloseBtn = document.querySelector(".reader-action-close-btn")
const actionActionText = document.querySelector(".reader-action-text")
const actionActionLinks = document.querySelector(".reader-action-links")
const actionActionMedia = document.querySelector(".reader-action-media")

// Буде виконуватись з fetcher.js в функції startReader
export function setActions(content, links) {
  
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
        ${content}
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
      actionActionLinks.innerHTML = ``

      const linksArr = JSON.parse(links)

      if (linksArr.length == 0 || !linksArr) {
        actionActionLinks.innerHTML = `
          Для цієї новини посилань немає
        `
      } else {
        linksArr.forEach(link => {
          actionActionLinks.innerHTML += `
            <div class="reader-action-link">
              <div class="reader-action-link-title">
                ${link.title}:
              </div>
              <div class="reader-action-link-url">
                <a href="${link.url}" target="_blank"> 
                  ${link.url}
                </a>
              </div>
            </div>
            <br> <br>
          `
        })
      }
      
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
  
      actionActionText.classList.remove("reader-action-active")
      actionActionLinks.classList.remove("reader-action-active")
      actionActionMedia.classList.add("reader-action-active")
    }
    else {
      console.log("Ще не можна")
    }
  })
}