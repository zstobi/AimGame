// const for the game grid where the magic happens

const gameGrid = document.querySelector('.game-grid');

// ----------------------------

// const for the start button

const start = document.querySelector('.start');

// ---------------------------- 

// const for the reset button -
// first created and classes added -
// add textcontent - 
// display none - 
// call function to change display

const reset = document.createElement('BUTTON');
reset.classList.add('nes-btn');
reset.classList.add('is-error');
reset.textContent = 'Reset';
reset.style.display = 'none';

// ----------------------------

// const for bottom container
// const for btnKit
// append the reset btn to btnKit

const positionCont = document.querySelector('.position-container');
const btnKit = document.querySelector('.btnKit');
btnKit.appendChild(reset);

// ----------------------------

// function to remove the pressing option to start btn

function startDisabled(){
    start.classList.remove('is-warning');
    start.classList.add('is-disabled');
    start.removeEventListener('click',runningGame);
};

// ----------------------------

// constant for target button -
// first created and classes added - 
// set to display none - 
// append it to gameGrid -
// call function to change display

const targetBtn = document.createElement('BUTTON');
targetBtn.classList.add('nes-btn');
targetBtn.classList.add('is-primary');
targetBtn.classList.add('targeting');
targetBtn.style.display = 'none';
gameGrid.appendChild(targetBtn);

// ----------------------------

// functions to randomize the targetBtn position on the gameGrid:

function randomizeColumn(){
    let randomNumber = Math.floor(Math.random()*30);
    if (randomNumber===0){
        randomNumber+1;
        return randomNumber;
    } else {
        return randomNumber;
    };
};

function randomizeRow(){
    let randomNumber = Math.floor(Math.random()*20);
    if (randomNumber===0){
        randomNumber+1;
        return randomNumber;
    } else {
        return randomNumber;
    };
};

function randomUbi(){
    targetBtn.style.setProperty('--columna',randomizeColumn());
    targetBtn.style.setProperty('--fila',randomizeRow());
};

let infiniteRotate = setInterval(randomUbi,800);

// ----------------------------

// variable with function to make able to remove the event listener of targetBtn

let targetRemoval = (e)=>{
    e.stopPropagation();
        // lo que hace es que evita que el evento se propague hacia arriba - 
        // o sea, evita que sea trigereado al mismo tiempo el evento en el elemento padre.
        targetHit();
};

// function to start the point or damage counting
// also call function to make the hearts go red

function startBucle(){
    targetBtn.style.display = 'block';
    gameGrid.addEventListener('click',damageIncrease);
    targetBtn.addEventListener('click',targetRemoval);
    completeHeart();
};

// ----------------------------

// function for countdown before the game starts

function n1n2n3(){
    const numberText = document.createElement('p');
    numberText.classList.add('no-margin');
    gameGrid.appendChild(numberText);

    numberText.style.gridColumn = '16';
    numberText.style.gridRow = '10';
    numberText.textContent = 3;
    
    minuteOne.textContent = '01';
    seconds.textContent = '00';

    let tresDosUno = setInterval(()=>{
        numberText.textContent -= 1;
        if (numberText.textContent==0){
            numberText.textContent = 'Go!';
        };
    },1000);

    setTimeout(()=>{
        clearInterval(tresDosUno);
        gameGrid.removeChild(numberText);
        reset.style.display = 'block';
        startBucle();
        clock();
    },4000);
};

// ----------------------------

// function to finish the actual round

function reStart(){
    reset.style.display = 'none';
    start.classList.remove('is-disabled');
    start.classList.add('is-warning');
    
    gameGrid.removeEventListener('click',damageIncrease);
    targetBtn.removeEventListener('click',targetRemoval);
    targetBtn.style.display = 'none';

    starting();
    lifeReNew();

    clearInterval(countDown);
    clearTimeout(finishCountDown);
    minuteOne.textContent = '--';
    seconds.textContent = '--';
};

// ----------------------------

// variable for the points to be counted
let points = 0;

// function that changes the color of the target while being hit, also adding one point per hit

function targetHit(){
    if (targetBtn.classList.contains('is-primary')){
        targetBtn.classList.remove('is-primary');
        targetBtn.classList.add('is-success');
    } else if (targetBtn.classList.contains('is-success')){
        targetBtn.classList.remove('is-success');
        targetBtn.classList.add('is-warning');
    } else if (targetBtn.classList.contains('is-warning')){
        targetBtn.classList.remove('is-warning');
        targetBtn.classList.add('is-error');
    } else if (targetBtn.classList.contains('is-error')){
        targetBtn.classList.remove('is-error');
        targetBtn.classList.add('is-primary');
    };
    points++;
    console.log(points + " puntos");
};

// ----------------------------

// consts for the timer

const minuteOne = document.querySelector('.minuteOne');

const seconds = document.querySelector('.seconds');

// variables for minute and seconds

let second;
let minute = 1;

// function to make the countdown of one minute to finish the game

function clock(){
    second = 59;
    minuteOne.textContent = '00';
    seconds.textContent = second;

    countDown = setInterval(()=>{
        second--;
        if (second<=9&&second>=0){
            seconds.textContent = '0'+second;
        } else{
            seconds.textContent = second;
        };
    },1000);

    // this cancel the countDown
    
    finishCountDown = setTimeout(()=>{
        clearInterval(countDown);
        reStart();
    },60000);
};

// ----------------------------

// function to paint the hearts icon to red

function completeHeart(){
    h1.classList.remove('is-empty');
};

// ----------------------------

// const for lifes of the player
const lifes = document.querySelector('.life');

// variable for damage to be counted
let damage = 0;

// function to increase the damage while no hitting in the target

function damageIncrease(){
    damage++;
    console.log(damage + ' puntos de danio');
    if (h1.classList.contains('is-half')&&lifes.textContent!=0){
        h1.classList.remove('is-half');
        lifes.textContent -= 1;
    } else if (lifes.textContent=='0'&&h1.classList.contains('is-half')){
        reStart();
    } else if (!(h1.classList.contains('is-half'))) {
        h1.classList.add('is-half');
    };
};

// ----------------------------

// function to renew the lifes of the player

function lifeReNew(){
    lifes.textContent = 10;
    if (h1.classList.contains('is-half')){
        h1.classList.remove('is-half');
        h1.classList.add('is-empty');        
    } else {
        h1.classList.add('is-empty');
    };
};

// ----------------------------

// function to run the game
// calls: - startDisabled() - removing() - n1n2n3()
// also call on resetBtn click reStart()

function runningGame(){
    startDisabled(); // desactiva el start
    n1n2n3(); // activa el conteo
    lifes.textContent = 10;

    reset.addEventListener('click',()=>{
        reStart();
    });
};

// ----------------------------

// function that set an event listener to the start btn
// calls pressStart()

function starting(){
    pressStart();
    start.addEventListener('click',runningGame);
};

// ----------------------------

// const for the text press start
// textcontent added, classes added, display none, appended to gameGrid

const pStart = document.createElement('p');
pStart.textContent = 'Press Start';
pStart.classList.add('press-start');
pStart.classList.add('no-margin');
pStart.style.display = 'block';
gameGrid.appendChild(pStart);

// function to make the press start text visible on the screen

function pressStart(){
    const titilando = setInterval(()=>{
        if (pStart.style.display == 'block'){
            pStart.style.display = 'none';
        } else {
            pStart.style.display = 'block';
        }
    },480);

    start.addEventListener('click',()=>{
        clearInterval(titilando);
        pStart.style.display = 'none';
    });
};

//----------------------------

// function that starts the hole game

starting();


// QUE FALTA?

// conteo de puntos adecuado

// agregarle el top leaderboard username y points, de mayor a menor (cuando haya database)

// listo para subir