const html = document.querySelector('html');
const focusButton = document.querySelector('.app__card-button--foco');
const shortRest = document.querySelector('.app__card-button--curto')
const longRest = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')

focusButton.addEventListener('click', () => {
  html.setAttribute('data-contexto', 'foco')
  banner.setAttribute('src', '/imagens/foco.png')
});

shortRest.addEventListener('click', () =>{
  html.setAttribute('data-contexto', 'descanso-curto')
  banner.setAttribute('src', '/imagens/descanso-curto.png')
})

longRest.addEventListener('click', () =>{
  html.setAttribute('data-contexto', 'descanso-longo')
  banner.setAttribute('src', '/imagens/descanso-longo.png')
})


