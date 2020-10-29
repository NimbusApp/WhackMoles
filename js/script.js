const mole = document.querySelectorAll('.mole');
const timeLeft = document.querySelector('#time-left');
let score = document.querySelector('#score');
var square = null;
var prop = 9;
var hitPosition = [];

let result = 0;
let currentTime = timeLeft.textContent;

function randomSquare(){
     hitPosition = [];
     square.forEach(className => {
          className.classList.remove('mole');
     });
     for (let i = 0; i < Math.floor(Math.random() * 9); i++) {
          let randomPosition = square[Math.floor(Math.random() * prop)];
          randomPosition.classList.add('mole');
          hitPosition.push(randomPosition.id);
     }
}

function selectedItem(){
     let option = document.getElementById('mySelect').value;
     prop = option * option;
     document.querySelector('.grid').style.width = "" +(option*100) +"px";
     document.querySelector('.grid').style.height = "" +(option*100) +"px";
     currentTime = 60;
     result = 0;
     score.textContent = result;
     drawGrid(prop);
     initGame();
}

function moveMole(){
     timerId = setInterval(randomSquare, 1000);
}

function countDown(){
     if(currentTime >= 0){
          currentTime--;
     }
     timeLeft.textContent = currentTime;
     if(currentTime === 0){
          clearInterval(timerId);
          document.querySelector('.alert').hidden = false;
          document.querySelector('.alert').innerHTML = "GAME OVER! SCORE IS: " +result;
          document.querySelector('.button').hidden = false;
     }
}

function drawGrid(prop){
     const grid = document.querySelector('.grid');
     grid.innerHTML = "";
     for (let i = 0; i < prop; i++) {
         let cell = document.createElement('div');
         cell.setAttribute('class', 'square');
         cell.setAttribute('id', i+1);
         grid.appendChild(cell);
     }
}

function initGame(){
     square = document.querySelectorAll('.square');
     square.forEach(id => {
          id.addEventListener('mouseup', () => {
               if(hitPosition.includes(id.id)){
                    result = result + 1;
                    score.textContent = result;
                    id.classList.remove('mole');
               }
          })
     });
}

function newGame() { 
     location.reload();
     document.querySelector('.alert').hidden = false;
     document.querySelector('.button').hidden = false;
 }

drawGrid(prop);
initGame();
let timerId = setInterval(countDown, 1000);
moveMole();
document.getElementById('year').innerHTML = new Date().getFullYear();