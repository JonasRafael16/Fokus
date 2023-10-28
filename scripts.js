const html = document.querySelector('html');
const focusButton = document.querySelector('.app__card-button--foco');
const shortRest = document.querySelector('.app__card-button--curto')
const longRest = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const title = document.querySelector('.app__title')

focusButton.addEventListener('click', () => {
  changeContext('foco')
});

shortRest.addEventListener('click', () => {
  changeContext('descanso-curto')
})

longRest.addEventListener('click', () => {
  changeContext('descanso-longo')
})


function changeContext(context) {
  html.setAttribute('data-contexto', context)
  banner.setAttribute('src', `/imagens/${context}.png`)
  changeText(context)
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