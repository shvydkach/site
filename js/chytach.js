const testText = "Це є тестовий текст, створений і написаний для того, щоб показати як саме працює логіка програми 'Швидкочитач' !";
const startText = "Розпочати";
const restartText = "Перезапустити";

let start = document.querySelector(".start");
let output = document.querySelector(".output-text");
let inputBlock = document.querySelector(".input-text");
let input = inputBlock.value;
let words = input.split(" ");

let info = document.querySelector(".text-count");
let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let wpm = document.querySelector(".wpm");
let speed = Math.round(1000 / ( wpm.value / 60 ));


let canStartAgain = true;

start.addEventListener("click", () => {

  getInputs();
  countWords();

  if (canStartAgain) {
    startShowing();
  } else {
    console.log("Ще не завершилась попередня анімація");
  }

});

plus.addEventListener("click", increaseWpm);
minus.addEventListener("click", decreaseWpm);

function increaseWpm(){
  let currentWpm = parseInt(wpm.value, 10);
  currentWpm += 10;
  wpm.value = currentWpm;
}

function decreaseWpm(){
  let currentWpm = parseInt(wpm.value, 10);
  currentWpm -= 10;
  wpm.value = currentWpm;
}

function startShowing() {
  let counter = -1;

  const interval = setInterval(() => {

    if (counter !== (words.length - 1)){
      counter++;
      output.innerHTML = words[counter];
      canStartAgain = false;
    } 
    else {
        clearInterval(interval);
        canStartAgain = true;

        if (input == "") {
            output.innerText = noInput();
        }
    }
  }, speed);
}

function getInputs() {
  input = inputBlock.value;
  words = input.split(" ");
  speed = Math.round(1000 / ( wpm.value / 60 ));
}

function noInput(){
  return errorMessage = "Немає вхідних даних!";
}

function countWords() {

 if (input == "" ) {
      words.length = 0;
 }

  info.innerHTML = `
  <span class="text-count"> Всього слів: <p class="text-count-number">${words.length}</p> </span>
  `
}
