// слово (транслітерація): інтернет-комунікація
// для редактора вписати: інтернет-комунікація
// має показуватись: інтернет комунікація

// слово (транслітерація): облдержадміністрація
// для редактора вписати: облдерж--адміністрація
// має показуватись: облдерж адміністрація

// слово (транслітерація): супроводжуватиметься
// для редактора вписати: супроводжу--ватиметься
// має показуватись: супроводжу ватиметься

// В даній міні-програмі текст має вводитись форматованим
// Наприклад, крапки та коми показуватись не будуть, але будуть паузи




/* Форматований текст 
(який повинен ввести редактор) */
// Із північними вітрами надходитиме холодне повітря з північних широт. 
// [16 - 17] грудня погоду формуватиме північно--атлантичний циклон. 
// Він супроводжу--ватиметься шквальним вітром швидкістю [15 - 20] метрів [на секунду] та мокрим снігом. 
// Температура впродовж доби становитиме -3 до +2градусів.

/* Текст в транслітерації 
(який може прочитати користувач) */
// Із північними вітрами надходитиме холодне повітря з північних широт. 
// 16 - 17 грудня погоду формуватиме північноатлантичний циклон. 
// Він супроводжуватиметься шквальним вітром швидкістю 15 - 20 метрів на секунду та мокрим снігом. 
// Температура впродовж доби становитиме від -3 до +2 градусів.

/* Текст з розміткою для комп'ютера 
(тобто, як фактично його буде розуміти й прочитувати програма) */
// Із північними вітрами надходитиме холодне повітря з північних широт[/пауза] 
// [/показати разом](16 - 17) грудня погоду формуватиме північно[/перенести]атлантичний циклон[/пауза] 
// Він супровод[/перенести]жуватиметься шквальним вітром швидкістю [/показати разом](15 - 20) метрів [/показати разом](на секунду) та мокрим снігом[/пауза]  
// Температура впродовж доби становитиме -3...+2 градусів[/пауза]


// Повертає необхідну швидкість прочитання 
export function getWpm() {
  return Math.round(1000 / ( +localStorage.getItem("wpm") / 60 ))
}



// Повертає індекс (порядковий номер) букви на якій має бути сфокусування
export function focusIndex(word) {
  // word - слово, яке має прочитуватись

  let focusOnIndex = 0

  switch (word.length) {
    case 1:
      focusOnIndex = 0
      break;
    case 2:
      focusOnIndex = 0
      break;
    case 3:
      focusOnIndex = 1
      break;
    case 4:
      focusOnIndex = 1
      break;
    case 5:
      focusOnIndex = 1
      break;
    case 6:
      focusOnIndex = 2
      break;
    case 7:
      focusOnIndex = 2
      break;
    case 8:
      focusOnIndex = 3
      break;
    case 9:
      focusOnIndex = 3
      break;
    case 10:
      focusOnIndex = 3
      break;
    case 11: 
      focusOnIndex = 4
      break;
    case 12: 
      focusOnIndex = 4
      break;
    case 13: 
      focusOnIndex = 5
      break;
    case 14: 
      focusOnIndex = 5
      break;
    case 15: 
      focusOnIndex = 5
      break;
    default:
      focusOnIndex = undefined
      break;
  }

  return focusOnIndex
}



// Розподіляє слова по пробілу і повертає масив з ними
export function splitBySpaces(text) {
  // text - текст новини
  // має отримуватись з data-content елемента novyna

  return text.split(" ")
    .filter(word => word.trim() !== '')
    .map(word => word.trim())
}



// Приймає масив зі слів розподілених пробілом
// Опрацьовує редакторську розмітку
// Повертає масив зі слів, які мають прочитуватись
export function forComp(wordsArr) {
  // wordsArr - масив зі словами, розідлених по пробілу функцією splitBySpaces 

  let words = []
  for (let i = 0; i < wordsArr.length; i++) {

    // перевірка на початок об'єднаних слів
    if (wordsArr[i].indexOf("[") === 0) {
      let firstWordUnited = wordsArr[i].substring(1, wordsArr[i].length)
      let wordsUnited = [firstWordUnited]
      for (let j = i + 1; j < wordsArr.length; j++) {
        if (wordsArr[j].indexOf("]") !== wordsArr[j].length - 1) {
          wordsUnited.push(wordsArr[j])
        } else {
          wordsUnited.push(wordsArr[j])
          i = j
          break
        }
      }
      let wordUnited = ""
      wordsUnited.forEach((word, index, arr) => {
        if (index !== arr.length - 1) {
          wordUnited += word
          wordUnited += " "
        } else {
          wordUnited += word.substring(0, word.length - 1)
        }
      })
      words.push(wordUnited)
    }

    // перевірка на спеціальний переніс
    else if(wordsArr[i].indexOf("--") !== -1) {
      let wordsByDoubleHyphen = wordsArr[i].split("--")
      wordsByDoubleHyphen.forEach(word => words.push(word))
    }

    // перевірка на переніс по дефісу
    else if(wordsArr[i].indexOf("-") !== -1) {
      let wordsByHyphen = wordsArr[i].split("-")
      wordsByHyphen.forEach(word => words.push(word))
    }

    // просто слово
    else {
      if (wordsArr[i].length > 16) {
        alert(`${wordsArr[i]} - задовге (< 15 букв)`)
      } else {
        if (wordsArr[i].indexOf(".") === wordsArr[i].length - 1) {
          words.push(wordsArr[i].substring(0, wordsArr[i].length - 1))
          // симуляція паузи за допомогою двох невидимих слів
          words.push("   ")
          words.push("   ")
        } else {
          words.push(wordsArr[i])
        }
      }
    }
  }

  return words
}



// Приймає масив зі слів розподілених пробілом
// Повертає той текст, який користувач може прочитати в транслітерації
export function forUser(wordsArr) {
  // wordsArr - масив зі словами, розідлених по пробілу функцією splitBySpaces 
  let words = []
  for (let i = 0; i < wordsArr.length; i++) {

    // перевірка на початок об'єднаних слів
    if (wordsArr[i].indexOf("[") === 0) {
      let firstWordUnited = wordsArr[i].substring(1, wordsArr[i].length)

      let wordsUnited = [firstWordUnited]
      for (let j = i + 1; j < wordsArr.length; j++) {
        if (wordsArr[j].indexOf("]") !== wordsArr[j].length - 1) {
          wordsUnited.push(wordsArr[j])
        } else {
          wordsUnited.push(wordsArr[j])
          i = j
          break
        }
      }
      let wordUnited = ""
      wordsUnited.forEach((word, index, arr) => {
        if (index !== arr.length - 1) {
          wordUnited += word
          wordUnited += " "
        } else {
          wordUnited += word.substring(0, word.length - 1)
        }
      })
      words.push(wordUnited)
    }

    // перевірка на спеціальний переніс
    else if(wordsArr[i].indexOf("--") !== -1) {
      let wordsByDoubleHyphen = wordsArr[i].split("--")
      let wordFromDoubleHyphen = ""
      wordsByDoubleHyphen.forEach(word => wordFromDoubleHyphen += word)
      words.push(wordFromDoubleHyphen)
    }

    // перевірка на переніс по дефісу
    else if(wordsArr[i].indexOf("-") !== -1) {
      words.push(wordsArr[i])
    }

    // просто слово
    else {
      words.push(wordsArr[i])
    }
  }

  let transliteration = ""
  words.forEach(word => {
    transliteration += word
    transliteration += " "
  })

  return transliteration
}





