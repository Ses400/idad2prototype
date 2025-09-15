const grip = document.getElementById("grid");
const restartBtn = document.getElementById("restartBtn");
const toast = document.getElementById("toast");

var pattern = [];
var clueLength = 10;

const totalButtons = 25;
const colors = [
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
  "#ffa0e6ff",
];

const clickSound = new Audio("");
const mistakeSound = new Audio("");

let gameSequence = [];
let userSequence = [];
let level = 0;
let acceptingInput = false;

const ordinals = [
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelveth",
  "thirteenth",
  "fourteenth",
  "fifteenth",
  "sixteenth",
  "seventeeth",
  "eighteenth",
  "nineteenth",
  "twentieth",
  "twentyfirst",
  "twentysecond",
  "twentythird",
  "twentyforth",
  "twentyfifth",
];
for (let i = 0; i < totalButtons; i++) {
  const btn = document.createElement("div");
  btn.classList.add("btn");
  btn.id = "btn" + i;
  btn.addEventListener("click", () => {});
  btn.style.backgroundColor = colors[i];
  grid.appendChild(btn);
}

function playSound(type) {
  if (type === "click") clickSound.play();
  else if (type === "mistake") mistakeSound.play();
}

function flashButton(index) {
  const btn = document.getElementById("btn" + index);
  btn.classList.add("flash");
  btn.style.backgroundColor = "#ffffffff";
  playSound("click");
  setTimeout(() => {
    btn.style.backgroundColor = "#ffa0e6ff";
    btn.style.transtition = ".3s";
    btn.classList.remove("flash");
  }, 300);
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

function generateNewSequence(length) {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * totalButtons);
    sequence.push(rand);
  }
  return sequence;
}

function nextSequence() {
  level++;
  gameSequence = generateNewSequence(level);
  userSequence = [];

  acceptingInput = false;
  gameSequence.forEach((val, i) => {
    setTimeout(() => {
      flashButton(val);
    }, 600 * (i + 1));
  });

  setTimeout(() => {
    acceptingInput = true;
  }, 600 * gameSequence.length + 300);
}

function checkUserInput(index) {
  if (userSequence[index] !== gameSequence[index]) {
    playSound("mistake");
    showToast(`Wrong! Total score is sequence ${level}`);
    acceptingInput = false;
    return;
  }

  if (userSequence.length === gameSequence.length) {
    const ordinal = ordinals[level - 1] || `${level}th`;
    showToast(`You completed the ${ordinal} sequence`);
    acceptingInput = false;
    setTimeout(nextSequence, 1000);
  }
}

function resetGameAndStart() {
  gameSequencec = [];
  userSequence = [];
  level = 0;
  nextSequence();
}

document.querySelectorAll(".btn").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (!acceptingInput) return;
    const el = document.getElementById("btn" + index);
    el.classList.add("pressed");
    flashButton(index);
    setTimeout(() => {
      el.classList.remove("pressed");
    }, 300);
    userSequence.push(index);
    checkUserInput(userSequence.length - 1);
  });
});
restartBtn.addEventListener(`click`, () => {
  resetGameAndStart();
});

window.addEventListener("DOMContentLoaded", () => {
  resetGameAndStart();
});
