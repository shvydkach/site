// const openModalButtons = document.querySelectorAll('[data-modal-target]')
const openModalButton = document.querySelector(".categories-mobile-modal-btn span")

// const closeModalButtons = document.querySelectorAll('[data-close-button]')
const closeModalButton = document.querySelector(".categories-mobile-modal-close")

// const overlay = document.getElementById('overlay')
const overlay = document.querySelector(".categories-mobile-overlay")

const modal = document.querySelector(".categories-mobile-modal")

// openModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = document.querySelector(button.dataset.modalTarget)
//     openModal(modal)
//   })
// })
openModalButton.addEventListener("click", () => {
  openModal(modal)
})



// closeModalButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const modal = button.closest('.modal')
//     closeModal(modal)
//   })
// })
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