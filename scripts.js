//PEGANDO OS ELEMENTOS

const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

//Construindo as funções
function togglePlay() {
  /* const method = video.paused ? 'play' : 'pause';
  video[method](); 
  mesma coisa que a condição abaixo*/

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
//função para atualizar o botao de play e pause
function updateButton() {
  const icon = this.paused ? "Play" : "Pause";
  toggle.textContent = icon;
}
//função de passar o tempo para frente e pra tras x segundo com botoes
function skipTime() {
  console.log(this.dataset);
  //ESSA LINHA é a mesma coisa que o if abaixo
  video.currentTime += parseFloat(this.dataset.skip);
  /*  if (this.dataset.skip === "25") {
    video.currentTime += 25;
    console.log(video.currentTime);
  } else {
    video.currentTime -= 10;
    console.log(video.currentTime);
  } */
}

function updateBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
  // console.log(percent);
}

function updateVolume() {
  video[this.name] = this.value;
}

function updateVideoBar(event) {
  const videoTime = (event.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = videoTime;
}

//chamando os event listners

//play clicando na tela
video.addEventListener("click", togglePlay);
//atualizar botao pra play
video.addEventListener("play", updateButton);
//atualizar borao pause
video.addEventListener("pause", updateButton);
//atualizar a barra de progresso
video.addEventListener("timeupdate", updateBar);
//play clicando no botao
toggle.addEventListener("click", togglePlay);
//passar tempo pra tras ou pra frente x segundos
skipButtons.forEach((button) => button.addEventListener("click", skipTime));
//alterando valor do volume e da velocidade
ranges.forEach((range) => range.addEventListener("change", updateVolume));
ranges.forEach((range) => range.addEventListener("mousemove", updateVolume));

//atualizar video clicando na barra de progresso
let mousedown = false;
progress.addEventListener("click", updateVideoBar);
progress.addEventListener("mousemove", (e) => mousedown && updateVideoBar(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
