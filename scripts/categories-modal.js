// categories-modal.js: логіка для відкриття-закриття вікна додаткових категорій (modal)


const openModalButton = document.querySelector(".categories-mobile-modal-btn span")

const closeModalButton = document.querySelector(".categories-mobile-modal-close")

const overlay = document.querySelector(".categories-mobile-overlay")

const modal = document.querySelector(".categories-mobile-modal")

openModalButton.addEventListener("click", () => {
  openModal(modal)
})

closeModalButton.addEventListener("click", () => {
  closeModal(modal)
})

overlay.addEventListener('click', () => {
  closeModal(modal)
})

function openModal(modal) {
  if(modal == null) return
  modal.classList.add('categories-mobile-modal-active')
  overlay.classList.add('categories-mobile-overlay-active')
}

function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('categories-mobile-modal-active')
  overlay.classList.remove('categories-mobile-overlay-active')
}