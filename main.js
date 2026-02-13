// =============================
// ELEMENT REFERENCES
// =============================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const sec1 = document.getElementById("sec1");
const sec2 = document.getElementById("sec2");
const noMess = document.getElementById("noMess");
const bgAudio = document.getElementById("bgaudio");

const notes = document.querySelectorAll(".note");
const overlay = document.querySelector(".note-overlay");
const focusText = document.getElementById("focusText");

const openMemoriesBtn = document.getElementById("openMemories");
const openLetterBtn = document.getElementById("openLetter");
const memorySection = document.getElementById("memorySection");
const letterSection = document.getElementById("letterSection");

const backFromMemory = document.getElementById("backToNotesFromMemory");
const backFromLetter = document.getElementById("backToNotesFromLetter");

// =============================
// YES BUTTON
// =============================

yesBtn.addEventListener("click", function () {
  sec1.style.display = "none";
  sec2.style.display = "block";
});

// =============================
// NO BUTTON LOGIC
// =============================

let noClickCount = 0;

const politeMessage = [
  "Are you sure?",
  "Think again...",
  "You should go for yes."
];

const teasingMessage = [
  "Really?",
  "go for yes look its so beutiful.",
  "Last chance!"
];

const dramaticMessage = [
  "mujhe mana kaise kar sakte ho aap 😡",
  "yesssssss karoo naaaaaa🥹",
  "I am not giving up."
];

noBtn.addEventListener("click", function () {

  noClickCount++;

  let activeMessage;

  if (noClickCount <= 3) {
    activeMessage = politeMessage;
  } else if (noClickCount <= 6) {
    activeMessage = teasingMessage;
  } else {
    activeMessage = dramaticMessage;
  }

  if (bgAudio && bgAudio.paused) {
    bgAudio.volume = 0.3;
    bgAudio.play();
  }

  const randomIndex = Math.floor(Math.random() * activeMessage.length);
  noMess.innerText = activeMessage[randomIndex];

  const maxX = window.innerWidth;
  const maxY = window.innerHeight;

  const boxWidth = noMess.offsetWidth;
  const boxHeight = noMess.offsetHeight;

  const safeX = Math.max(0, maxX - boxWidth);
  const safeY = Math.max(0, maxY - boxHeight);

  const randomX = Math.floor(Math.random() * safeX);
  const randomY = Math.floor(Math.random() * safeY);

  noMess.style.left = randomX + "px";
  noMess.style.top = randomY + "px";
});

// =============================
// NOTES OVERLAY
// =============================

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

overlay.addEventListener("click", (e) => {
  if (!e.target.closest(".note-focus")) {

    overlay.classList.remove("active");

    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 300);
  }
});

// =============================
// NAVIGATION BETWEEN SECTIONS
// =============================

openMemoriesBtn.addEventListener("click", function () {
  memorySection.classList.remove("hidden");
  letterSection.classList.add("hidden");
  memorySection.scrollIntoView({ behavior: "smooth" });
});

openLetterBtn.addEventListener("click", function () {
  letterSection.classList.remove("hidden");
  memorySection.classList.add("hidden");
  letterSection.scrollIntoView({ behavior: "smooth" });
});

backFromMemory.addEventListener("click", function () {
  memorySection.classList.add("hidden");
  document.querySelector(".notes-section").scrollIntoView({ behavior: "smooth" });
});

backFromLetter.addEventListener("click", function () {
  letterSection.classList.add("hidden");
  document.querySelector(".notes-section").scrollIntoView({ behavior: "smooth" });
});

// =============================
// SLIDER LOGIC
// =============================

const slides = document.querySelectorAll("#memory-slider .slide");
const dotsContainer = document.querySelector("#memory-slider .slider-dots");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");

let currentSlide = 0;

// Create dots dynamically
slides.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.dataset.index = index;
  dotsContainer.appendChild(dot);
});

function updateSlider() {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[currentSlide].classList.add("active");

  const dots = dotsContainer.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active-dot"));
  dots[currentSlide].classList.add("active-dot");
}

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
});

dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    currentSlide = parseInt(e.target.dataset.index);
    updateSlider();
  }
});

// Initialize first slide
updateSlider();
