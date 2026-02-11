// ===== ELEMENT REFERENCES =====

let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");
let sec1 = document.getElementById("sec1");
let sec2 = document.getElementById("sec2");
let noMess = document.getElementById("noMess");
let bgaudio = document.getElementById("bgaudio");

const notes = document.querySelectorAll(".note");
const overlay = document.querySelector(".note-overlay");
const focusText = document.getElementById("focusText");

// ===== NO BUTTON LOGIC =====

let noClickc = 1;

const politeMessage = [
  "Are you sure?",
  "Think again...",
  "You should go for yes."
];

const dramaticMessage = [
  "Still no?",
  "This is getting serious.",
  "I am not giving up."
];

const teasingMessage = [
  "Really?",
  "You’re making this harder.",
  "Last chance!"
];

let activeMessage = politeMessage;

noBtn.addEventListener("click", function () {

  noClickc++;

if (noClickc <= 3) {
  activeMessage = politeMessage;
} else if (noClickc <= 6) {
  activeMessage = teasingMessage;
} else {
  activeMessage = dramaticMessage;
}
console.log(noClickc,activeMessage)

  if (bgaudio && bgaudio.paused) {
    bgaudio.volume = 0.3;
    bgaudio.play();
  }

  let random = Math.floor(Math.random() * activeMessage.length);
  noMess.innerText = activeMessage[random];

  let maxX = window.innerWidth;
  let maxY = window.innerHeight;

  let boxWidth = noMess.offsetWidth;
  let boxHeight = noMess.offsetHeight;

  let safeX = Math.max(0, maxX - boxWidth);
  let safeY = Math.max(0, maxY - boxHeight);

  let randomX = Math.floor(Math.random() * safeX);
  let randomY = Math.floor(Math.random() * safeY);

  noMess.style.left = randomX + "px";
  noMess.style.top = randomY + "px";
});

// ===== YES BUTTON LOGIC =====

yesBtn.addEventListener("click", function () {
  sec1.style.display = "none";
  sec2.style.display = "block";
});

// ===== NOTE BACKGROUND SETUP =====

notes.forEach(note => {
  const bgImage = note.getAttribute("data-bg");
  if (bgImage) {
    note.style.backgroundImage = `url(${bgImage})`;
  }
});

// ===== OPEN OVERLAY =====

notes.forEach(note => {
  note.addEventListener("click", () => {
    const fullText = note.getAttribute("data-note");
    focusText.textContent = fullText;

    overlay.classList.remove("hidden");

    setTimeout(() => {
      overlay.classList.add("active");
    }, 10);
  });
});

// ===== CLOSE OVERLAY =====

overlay.addEventListener("click", (e) => {
  if (!e.target.closest(".note-focus")) {

    overlay.classList.remove("active");

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);

  }
});
