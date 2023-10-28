const html = document.querySelector('html');
const focusButton = document.querySelector('.app__card-button--foco');
const shortRestButton = document.querySelector('.app__card-button--curto')
const longRestButton = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')
const buttons = document.querySelectorAll('.app__card-button')
const musicFocusInput = document.querySelector('#alternar-musica')
const music = new Audio('/sons/luna-rise-part-one.mp3')
music.loop = true

musicFocusInput.addEventListener('change', () => {
  if (music.paused) {
    music.play()
  } else {
    music.pause()
  }
})

focusButton.addEventListener('click', () => {
  changeContext('foco')
  focusButton.classList.add('active')
});

shortRestButton.addEventListener('click', () => {
  changeContext('descanso-curto')
  shortRestButton.classList.add('active')
})

longRestButton.addEventListener('click', () => {
  changeContext('descanso-longo')
  longRestButton.classList.add('active')
})


function changeContext(context) {
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