let lettersEl = document.querySelector(".letters");
let lettersGuess = document.querySelector(".letters-guess");
let letters = "abcdefghijklmnopqrstuvwxyz";
let hangmanDraw = document.querySelector(".hangman-draw");
let category = document.querySelector(".category-select");
let music_music_sound_correct = document.querySelector("#music_sound_correct");
let music_music_sound_not_correct = document.querySelector("#music_sound_not_correct");
let SpanLettersGuess = "";
let spanLetters =""
let arrayLetters = [];
arrayLetters = letters.split("");
let number_error = 0;
let number_correct = 0;
let words = {
  programming: ["java", "python", "c", "javascript"],
  famous: ["abdessamad", "ohtmen", "me"],
};
let randomWord = [];

show_letters();
category.focus();

// display letters in page leters
function show_letters() {
  arrayLetters = letters.split("");
  // create letters
  arrayLetters.forEach((value) => {
    let letterSpan = document.createElement("span");
    letterSpan.classList = "span-letter";
    letterSpan.classList.add("span-letter-clicked");
    let textSpan = document.createTextNode(value);
    letterSpan.append(textSpan);
    lettersEl.appendChild(letterSpan);
  });
  spanLetters = document.querySelectorAll(".span-letter");
}

// when select category 
category.addEventListener("change", () => {
  spanLetters.forEach((span) => {
    span.classList.remove("span-letter-clicked");
  }); 
  random_word(category.value);
  disply_input(randomWord);
});

document.addEventListener("click", (e) => {
  // when click on letter 
  if (e.target.classList == "span-letter") {
    let correct_letter = false;
    e.target.classList.add("span-letter-clicked");
    // disable for can't choose category when play game
    category.style.pointerEvents = "none";
    let SpanGuessText = document.createTextNode(e.target.innerHTML);

    // verifer if this correct letter
    randomWord.forEach((text, index) => {
      if (e.target.innerHTML == text) {
        // show in span letter guess
        SpanLettersGuess[index].appendChild(SpanGuessText);
        correct_letter = true;
        number_correct++;
      }
    });
   // when not find letter clicked in random
    if (!correct_letter) {
      // play music
      music_music_sound_correct.currentTime = 1.5;
      music_music_sound_correct.play();
      hangmanDraw.classList.add(`error${++number_error}`);
      // lose game
      if (number_error == 7) {
        alert("game over");
        end_game();
        number_error = 0;
      }
    } else {
      // when choose the correct letter 
      music_music_sound_not_correct.currentTime = 1.5;
      music_music_sound_not_correct.play();
      // when 
      if (number_correct == randomWord.length) {
        alert("you win on game");
        end_game();
        number_correct = 0;
      }
    }
  }
});

function random_word(categoryName) {
  console.log(categoryName);
  let names_category = words[categoryName];
  let randomNumber = Math.floor(Math.random() * names_category.length);
  randomWord = names_category[randomNumber].split("");
}

// show spans letters guess
function disply_input(randomWord) {
  lettersGuess.innerHTML = "";
  randomWord.forEach(() => {
    let spanLettersGuess = document.createElement("span");
    spanLettersGuess.classList.add("spanLettersGuess");
    lettersGuess.appendChild(spanLettersGuess);
  });
  SpanLettersGuess = document.querySelectorAll(".spanLettersGuess");
}

function end_game() {
  category.style.pointerEvents = "auto";
  random_word(category.value);
  disply_input(randomWord);
  spanLetters.forEach((span) => {
    span.classList.remove("span-letter-clicked");
  });
  for (let i = 1; i <= 7; i++) {
    hangmanDraw.classList.remove(`error${i}`);
  }
}