
const cards = document.querySelectorAll('.cartoes');

//______________________________CRONôMETRO_______________________________

let startPlay = 0;
(() => {

    let hours = `00`,
        minutes = `00`,
        seconds = `00`,
        chronometerDisplay = document.querySelector(`[data-chronometer]`),
        chronometerCall
  
    function chronometer() {
  
      seconds ++
  
      if (seconds < 10) seconds = `0` + seconds
  
      if (seconds > 59) {
        seconds = `00`
        minutes ++
  
        if (minutes < 10) minutes = `0` + minutes
      }
  
      if (minutes > 59) {
        minutes = `00`
        hours ++
        
        if (hours < 10) hours = `0` + hours
      }
  
      chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`
  
    }
  
    play.onclick = (event) => {
      cards.forEach(card => card.classList.add('flip'))
      setTimeout(() => {
        cards.forEach(card => card.classList.remove('flip'))
      }, 3000);
      chronometerCall = setInterval(chronometer, 1000)
      event.target.setAttribute(`disabled`,``)
      cards.forEach(card => card.addEventListener('click', flipCard));
      startPlay = Date.now()
    }

    pause.onclick = () => {
      clearInterval(chronometerCall)
      play.removeAttribute(`disabled`)
    }

    recorde.onclick = () => {
      if (window.localStorage.timeplaying == 0 || window.localStorage.timeplaying == undefined) 
      {
        window.alert('Sem recorde ainda')
        
      } 
      else 
      { 
        window.alert('Melhor tempo: ' + window.localStorage.timeplaying)
      } 
      
    }
  
    reset.onclick = () => {
      cards.forEach(card => card.removeEventListener('click', flipCard));
      cards.forEach(card => card.classList.remove('flip'));
      cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
      });

      clearInterval(chronometerCall)
      play.removeAttribute(`disabled`)
      chronometerDisplay.textContent = `00:00:00`
        hours = `00`,
        minutes = `00`,
        seconds = `00`
    }
    
  })()

//______________________________CÓDIGO DO JOGO______________________________

//essas váriaveis gerenciam o estado do jogo 
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() { //Guarda a carta clicada
  if (lockBoard) return;
  if (this === firstCard) return; //Se secondCard = firstCard, então retorna em caso positivo

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();

  if (checkForFlipCards() == 16){
    checkForTime()
    window.alert('Ganhou!!!!')
  }
}

function checkForTime(){
  let stopPlay = Date.now();
  let timeplaying = (stopPlay - startPlay) / 1000
  if (window.localStorage.timeplaying > timeplaying || window.localStorage.length == 0) {
    window.localStorage.setItem('timeplaying',timeplaying)
    window.alert("Bateu o record!!!")
  }
}

function checkForFlipCards() {
  let result = 0
  cards.forEach(card => {
    if (card.classList.contains('flip')) 
    {
      result +=1
    }
  })

  return result
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}


//embaralha elementos
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });


})();




