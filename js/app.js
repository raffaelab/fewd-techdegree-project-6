const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

const overlay = document.getElementById('overlay');
const resetButton = document.querySelector('.btn__reset');

// hide start overlay when player clicks "Start Game" button
resetButton.addEventListener('click', () => {
    if (resetButton.textContent === 'Start Game') {
        overlay.style.display = 'none';
    } else if (resetButton.textContent === 'Try Again') {
        location.reload();
    }
});

const phrases = [
    'i love javascript',
    'this is awesome',
    'have a nice day',
    'open sesame',
    'my first javascript game'
];

// function to choose one of the phrases randomly and split into single letters
function getRandomPhraseAsArray(arr){
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)].split('');
    return randomPhrase;
} 

// function which creates game phrase display by looping through phrase array and creating li elements and adding classes to it
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++) {
        const ul = document.querySelector('#phrase ul');
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if (arr[i] === ' ') {
            li.className = 'space';
        } else {
            li.className = 'letter';
        }
    }
}

// function to check if clicked button is a match
function checkLetter(button) {
    const letter = document.getElementsByClassName('letter');
    let match = null;
    for (let i = 0; i < letter.length; i++) {
        if (button.textContent === letter[i].textContent) {
            letter[i].className += ' show';
            match = button.textContent;
        }
    }
    return match;
}

// function to check if game has been won or lost and show overlay
function checkWin() {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    const title = document.querySelector('.title');
    if (letter.length === show.length) {
        // show win overlay if player guessed all letters
        overlay.className = 'win';
        title.textContent = 'You won!';
        overlay.style.display = 'flex';
        resetButton.textContent = 'Try Again';
    } else if (missed > 4) {
        // show lose overlay if player has 5 wrong tries
        overlay.className = 'lose';
        title.textContent = 'You lost!';
        overlay.style.display = 'flex';   
        resetButton.textContent = 'Try Again';   
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 

qwerty.addEventListener('click', e => {
    // checks if clicked element is a button which doesn't have the class "chosen" yet
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen') {
        const button = e.target;
        button.className = 'chosen';
        button.disabled = 'true';
        const letterFound = checkLetter(button);
        if (letterFound === null) {
            // if letter is incorrect, it adds 1 to the missed variable and removes one of the hearts
            const scoreboard = document.querySelector('#scoreboard ol');
            const tries = document.querySelector('.tries');
            missed += 1;
            scoreboard.removeChild(tries);
        }
    } 
    // call function "checkWin" to see if user has won or lost already after every click
    checkWin();
});