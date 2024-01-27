const wordList = [
  "Selamat",
  "Pagi",
  "Indonesia",
  "Bahasa",
  "JavaScript",
  "Array",
  "Contoh",
  "Mobil",
  "Komputer",
  "Sekolah",
  "Hari",
  "Malam",
  "Kucing",
  "Anjing",
  "Bunga",
  "Coklat",
  "Senyum",
  "Pelangi",
  "Pantai",
  "Gunung",
  "Jalan",
  "Makan",
  "Minum",
  "Buku",
  "Pensil",
  "Kamera",
  "Sepeda",
  "Pesawat",
  "Kopi",
  "Teh",
  "Hutan",
  "Pohon",
  "Rumah",
  "Matahari",
  "Bulan",
  "Bintang",
  "Saudara",
  "Teman",
  "Cinta",
  "Musik",
  "Film",
  "Surga",
  "Negeri",
  "Sejarah",
  "Tradisi",
  "Kartu",
  "Ponsel",
  "Internet",
  "Sains",
  "Teknologi",
  "Kesehatan",
  "Hewan",
  "Tumbuhan",
  "Percakapan",
  "Rencana",
  "Keberhasilan",
  "Kegagalan",
];

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

const generateRandomSentence = (wordsLength, wordList) =>
  Array.from(
    { length: wordsLength },
    () => wordList[getRandomIndex(wordList)]
  ).join(" ");

const createLetterElement = (letter, index) =>
  `<span class="letters letter-${index}">${letter}</span>`;

const createWordElement = (word, wordIndex) =>
  `<span class="word word-${wordIndex}">${word
    .split("")
    .map(createLetterElement)
    .join("")}</span><span class="letters letter-${word.length}"> </span>`;

const initializeTextElements = (sentence) => {
  const textWrapper = document.getElementById("text-wrapper");
  textWrapper.innerHTML = sentence.split(" ").map(createWordElement).join("");
};

let timer;

const init = () => {
  let isRunning = false;
  let seconds = 0;
  const textInput = document.getElementById("text-input");
  const sentence = generateRandomSentence(30, wordList);
  initializeTextElements(sentence);

  btnReset.addEventListener("click", () => {});
  document.getElementsByClassName("letters")[0].classList.add("letter-active");
  document
    .getElementById("text-wrapper")
    .addEventListener("click", () => textInput.focus());

  const handleInput = (event) => {
    const value = event.target.value;
    const valueLength = value.length;

    if (isRunning == false) {
      timer = setInterval(() => {
        document.querySelector("#info").innerHTML = 60 - seconds;
        seconds++;
      }, 1000);
      isRunning = true;
    }

    const letterElements = document.getElementsByClassName("letters");
    for (let i = 0; i < letterElements.length; i++) {
      const letterElement = letterElements[i];
      letterElement.classList.remove("letter-active");
    }

    const wordElements = document.getElementsByClassName("word");
    for (let i = 0; i < wordElements.length; i++) {
      const wordElement = wordElements[i];
      wordElement.classList.remove("word-incorrect");
    }

    if (valueLength === 0) {
      letterElements[0].classList.add("letter-active");
      return;
    }
    if (valueLength == sentence.length) {
      clearInterval(timer);
      let correctWord = 0;
      let correct = true;
      for (let i = 0; i < valueLength; i++) {
        if (sentence[i] == " " || i == sentence.length - 1) {
          if (correct) correctWord++;
          correct = true;
          continue;
        }
        if (value[i] != sentence[i]) {
          correct = false;
        }
      }

      document.querySelector("#info").textContent =
        Math.round(correctWord / (seconds / 60)) + " WPM";

      document.querySelector("#text-input").setAttribute("disabled", true);
    }

    let wordIndex = 0;
    let correct = true;
    for (let i = 0; i < valueLength; i++) {
      if (sentence[i] == " ") {
        if (correct) {
          if (valueLength == sentence.length) wordIndex++;
          document
            .getElementsByClassName("word")
            [wordIndex].classList.add("word-correct");
        }
        correct = true;
        wordIndex++;
        continue;
      }

      if (sentence[i] != value[i]) {
        correct = false;
        document
          .getElementsByClassName("word")
          [wordIndex].classList.add("word-incorrect");
      }
    }

    letterElements[valueLength].classList.add("letter-active");
  };
  textInput.addEventListener("input", (event) => handleInput(event));
};

const btnReset = document.getElementById("btn-reset");
btnReset.addEventListener("click", () => {
  clearInterval(timer);
  document.querySelector("#info").textContent = "60";
  init();
});

init();
