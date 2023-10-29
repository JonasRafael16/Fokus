const html = document.querySelector('html');
const focusButton = document.querySelector('.app__card-button--foco');
const shortRestButton = document.querySelector('.app__card-button--curto');
const longRestButton = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const timer = document.getElementById('timer');

const buttons = document.querySelectorAll('.app__card-button');
const startPauseButton = document.querySelector('#start-pause');
const startPauseTextButton = document.querySelector('#start-pause span');
const startPauseImageButton = document.querySelector('#start-pause img');

const musicFocusInput = document.querySelector('#alternar-musica');
const music = new Audio('/sons/luna-rise-part-one.mp3');
const startAudio = new Audio('/sons/play.wav');
const pauseAudio = new Audio('/sons/pause.mp3');
const finishCountdownAudio = new Audio('/sons/beep.mp3');



let countDownTime = 1500;
let countDownIntervalId = null;

music.loop = true

musicFocusInput.addEventListener('change', () => {
  if (music.paused) {
    music.play()
  } else {
    music.pause()
  }
})

focusButton.addEventListener('click', () => {
  countDownTime = 1500
  changeContext('foco')
  focusButton.classList.add('active')
});

shortRestButton.addEventListener('click', () => {
  countDownTime = 300
  changeContext('descanso-curto')
  shortRestButton.classList.add('active')
})

longRestButton.addEventListener('click', () => {
  countDownTime = 900
  changeContext('descanso-longo')
  longRestButton.classList.add('active')
})


function changeContext(context) {
  showTimer()
  html.setAttribute('data-contexto', context)
  banner.setAttribute('src', `/imagens/${context}.png`)
  changeText(context)
  removeActiveStyle()
}

function changeText(context) {
  switch (context) {
    case 'foco':
      title.innerHTML = `
      Otimize sua produtividade,<br>
      <strong class="app__title-strong">mergulhe no que importa.</strong>`
      break

    case 'descanso-curto':
      title.innerHTML = `
      Que tal dar uma respirada?<br>
      <strong class="app__title-strong">Faça uma pausa curta!</strong>`
      break

    case 'descanso-longo':
      title.innerHTML = `
      Hora de voltar à superfície. <br>
      <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
      break
  }
}

function removeActiveStyle() {
  buttons.forEach((button) => {
    button.classList.remove('active')
  })
}

function stopCountDown() {
  clearInterval(countDownIntervalId)
  countDownIntervalId = null
}


const countDown = () => {
  if (countDownTime === 0) {
    stopCountDown()
    finishCountdownAudio.play()
    alert('Tempo finalizado!')
    countDownTime = 5

    return
  }
  countDownTime -= 1
  showTimer()
  console.log(countDownTime)
}

const startPauseCountDown = () => {
  if (countDownIntervalId) {
    stopCountDown()
    pauseAudio.play()
    startPauseTextButton.textContent = 'Começar'
    startPauseImageButton.setAttribute('src', '/imagens/play_arrow.png')
    return
  }
  startAudio.play()
  startPauseTextButton.textContent = 'Pausar'
  startPauseImageButton.setAttribute('src', '/imagens/pause.png')
  countDownIntervalId = setInterval(countDown, 1000)
}

function showTimer() {
  const time = new Date(countDownTime * 1000)
  const formatedTime = time.toLocaleString('pt-Br', { minute: '2-digit', second: '2-digit' })
  timer.innerHTML = formatedTime
}


startPauseButton.addEventListener('click', startPauseCountDown)
showTimer()