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
const endScreen = document.getElementById("endScreen");

const options = ["olfato", "oido", "vista", "gusto", "tacto"];
let currentIndex = null;
let repeatedSpin = false;

function spinWheel() {
  const randomDegree = Math.floor(Math.random() * 360);
  const degree = 1800 + randomDegree; // 5 vueltas + un extra aleatorio

  // Resetea transición y rotación antes de girar
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";
  void wheel.offsetWidth; // Fuerza reflow

  wheel.style.transition = "transform 5s ease-out";
  wheel.style.transform = `rotate(${degree}deg)`;

  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
/*     const segment = 72;
    const finalDeg = (degree % 360 + 360) % 360;
    const adjustedDeg = (finalDeg + 180) % 360; 
    const index = Math.floor(adjustedDeg / segment) % options.length; */

    const finalDeg = 360 - randomDegree + (72/2) 
    const listDeg = [0, 72, 144, 216, 288];
    const index = listDeg.findIndex(deg => {
        return finalDeg >= deg && finalDeg < (deg + 72);
    })
    //const options = ["olfato" (0), "oido"(1), "vista"(2), "gusto"(3), "tacto"(4)];
    currentIndex = index;
    console.log("Current index:", currentIndex, options[currentIndex]);

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
  console.log("Selected option:", selected);
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
  if (resultVideo.src.includes('final.mp4')) {
    videoContainer.classList.add('hidden');
      endScreen.style.display = "block"; 
  }
  resultVideo.src = 'videos/final.mp4';
  resultVideo.play();
});

// Al cargar la página, oculta todo menos el intro
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector('.container').classList.add('hidden');
  document.getElementById('popup').classList.add('hidden');
  videoContainer.classList.add('hidden');
  introContainer.classList.remove('hidden');
  endScreen.style.display = "none"; 
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
