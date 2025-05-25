const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");
const sound = document.getElementById("spinSound");
const popup = document.getElementById("popup");
const trustBtn = document.getElementById("trust");
const spinAgainBtn = document.getElementById("spinAgain");
const videoContainer = document.getElementById("videoContainer");
const resultVideo = document.getElementById("resultVideo");
const introContainer = document.getElementById("introContainer");
const introVideo = document.getElementById("introVideo");


const options = ["olfato", "oido", "vista", "gusto", "tacto"];
let currentIndex = null;
let repeatedSpin = false;

function spinWheel() {
  const degree = 1800 + Math.floor(Math.random() * 360);
  const segment = 360 / options.length;
  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${degree}deg)`;

  sound.currentTime = 0;
  sound.play();

  const actualDeg = degree % 360;
  currentIndex = Math.floor((360 - actualDeg + segment / 2) % 360 / segment);

  setTimeout(() => {
    sound.pause();
    if (!repeatedSpin) {
      popup.classList.remove("hidden");
    } else {
      showVideo();
    }
  }, 5000);
}

spinBtn.addEventListener("click", () => {
  repeatedSpin = false;
  result.textContent = "";
  popup.classList.add("hidden");
  videoContainer.classList.add("hidden");
  resultVideo.pause();
  spinWheel();
});

trustBtn.addEventListener("click", () => {
  popup.classList.add("hidden");
  showVideo();
});

spinAgainBtn.addEventListener("click", () => {
  repeatedSpin = true;
  popup.classList.add("hidden");
  spinWheel();
});

function showVideo() {
  const selected = options[currentIndex];
  result.textContent = `¡Elegiste: ${selected.toUpperCase()}!`;
  resultVideo.src = `videos/${selected}.mp4`;
  // Oculta todo menos el video
  document.querySelector('.container').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');
  videoContainer.classList.remove('hidden');
  videoContainer.classList.add('fullscreen-video');
  resultVideo.play();
}

resultVideo.addEventListener('ended', () => {
  // Si ya es el video final, no hagas nada
  if (resultVideo.src.includes('final.mp4')) return;
  resultVideo.src = 'videos/final.mp4';
  resultVideo.play();
});

// Al cargar la página, oculta todo menos el intro
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.container').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');
  videoContainer.classList.add('hidden');
  introContainer.classList.remove('hidden');
});

// Cuando termina el intro, muestra la ruleta
introVideo.addEventListener('ended', () => {
    console.log("Intro video ended");
  //introContainer.classList.add('hidden');
    introContainer.style.display = "none"; 
  introOverlay.style.display = "none"; // Oculta el overlay si sigue visible
  document.querySelector('.container').classList.remove('hidden');
});

const introOverlay = document.getElementById("introOverlay");
const startIntro = document.getElementById("startIntro");

startIntro.addEventListener("click", () => {
  introOverlay.style.display = "none";
  introVideo.play();
});