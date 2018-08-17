// global variables

let randomFontName;
let chosenFont;
let imposterLetter;
let imposterPosition;
let boardClick;
let currentRound = 0;
let score = 0;

// fontArray array of objects with starter Serif fonts

const fontArray = [
    {
        name: 'Merriweather',
        url: 'https://fonts.googleapis.com/css?family=Merriweather',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Merriweather'
    },

    {
        name: 'Roboto Slab',
        url: 'https://fonts.googleapis.com/css?family=Roboto+Slab',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Roboto+Slab',
    },

    {
        name: 'Playfair Display',
        url: 'https://fonts.googleapis.com/css?family=Playfair+Display',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Playfair+Display',
    },

    {
        name: 'Source Serif Pro',
        url: 'https://fonts.googleapis.com/css?family=Source+Serif+Pro',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Source+Serif+Pro',
    },

    {
        name: 'Cardo',
        url: 'https://fonts.googleapis.com/css?family=Cardo',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Cardo',
    },

    {
        name: 'Arvo',
        url: 'https://fonts.googleapis.com/css?family=Arvo',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Arvo',
    },

    {
        name: 'Bree Serif',
        url: 'https://fonts.googleapis.com/css?family=Bree+Serif',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Bree+Serif',
    },

    {
        name: 'Cinzel',
        url: 'https://fonts.googleapis.com/css?family=Cinzel',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Cinzel',
    },

    {
        name: 'Josefin Slab',
        url: 'https://fonts.googleapis.com/css?family=Josefin+Slab',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Josefin+Slab',
    },

    {
        name: 'Pridi',
        url: 'https://fonts.googleapis.com/css?family=Pridi',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Pridi',
    },
]

// Welcome screen
// adapted from: http://usefulangle.com/post/82/pure-javascript-replace-element

const welcome = () => {
    const gameBoardDiv = document.querySelector('.fonts-box');
    const gameBoardDivParent = gameBoardDiv.parentNode;

    var welcomeScreen = document.createElement('div');
    welcomeScreen.setAttribute('class', 'welcome welcome-gradient');
    welcomeScreen.innerHTML = `<p class="welcome-text">Find the imposter font.</p><p>BUTTON.</p>`;

    gameBoardDivParent.replaceChild(welcomeScreen, gameBoardDiv);
}

// welcome();



// Random font picker for "font-family" members

const playGame = () => {

    // Register clicks on game board

    boardClick = document.querySelector('.fonts-box');
    boardClick.addEventListener('click', fontClick);

    function fontClick(event) {

        const fontPosition = parseInt(event.target.dataset.position);
        console.log(`current position: ${fontPosition}`);
        console.log(`imposter position: ${imposterPosition}`);

        // Evaluate if the clicked letter is part of the font-family
        // or an imposter font

        // countdown();    

        if (fontPosition === imposterPosition) {
            alert('You found the imposter font! 100 points');
            score = score + 100;
        } else {
            alert('Sorry, not the imposter. No points for you.');
        }

        reset();

    }
}

const fontFamilyPicker = () => {
    const randomizeFont = (Math.floor(Math.random() * fontArray.length));
    let randomFontName = fontArray[randomizeFont].name;
    chosenFont = randomFontName;

    console.log(`font family name: ${chosenFont}`);


    let randomFontUrl = fontArray[randomizeFont].url;
    let randomFontType = fontArray[randomizeFont].type;
    let randomFontMoreInfo = fontArray[randomizeFont].moreInfo;

    document.querySelector('.main-font').setAttribute('href', randomFontUrl);
    const fontBox = document.querySelector('.fonts-box');
    fontBox.setAttribute('style', 'font-family');
    fontBox.style.fontFamily = (randomFontName);

    return chosenFont;
}

// fontFamilyPicker();

// Randomly select the imposter font and its position

const imposterPicker = () => {
    const randomizeImposterFont = (Math.floor(Math.random() * fontArray.length));
    const imposterFontName = fontArray[randomizeImposterFont].name;

    if (imposterFontName === chosenFont) {
        imposterPicker();
    } else {
        let imposterFontUrl = fontArray[randomizeImposterFont].url;
        let imposterFontType = fontArray[randomizeImposterFont].type;
        let imposterFontMoreInfo = fontArray[randomizeImposterFont].moreInfo;

        // randomize imposter font's position

        let randomImposter = (Math.floor(Math.random() * 9));
        imposterPosition = randomImposter;

        // place and display imposter font
        const imposterFontHeadLink = document.querySelector('.imposter-font');
        imposterFontHeadLink.setAttribute('href', imposterFontUrl);
        const imposterFontBox = document.querySelectorAll('.font-box');
        const imposterParagraph = imposterFontBox.item(imposterPosition);
        imposterLetter = imposterParagraph.firstElementChild;
        imposterLetter.setAttribute('style', 'font-family');
        imposterLetter.style.fontFamily = (imposterFontName);
        console.log(`imposterLetter: ${imposterLetter}`);
        console.log(`imposter position ${imposterPosition}`);
    }

}

// imposterPicker();

const reset = () => {
    console.log(score);
    console.log(currentRound);
    // boardClick.addEventListener('click', fontClick);

    currentRound++;
    imposterLetter.removeAttribute('style');
    imposterPosition = undefined;
    fontFamilyPicker();
    imposterPicker();
}

// for (i = 0; i < 3; i++){
playGame();
fontFamilyPicker();
imposterPicker();
// }


// *** ASK ***
// possible five-second countdown

// Adapted from: https://stackoverflow.com/questions/4435776/simple-clock-that-counts-down-from-30-seconds-and-executes-a-function-afterward

// var secondsLeft = 5;
// var timerDiv = document.querySelector('.timer');

// var timerId = setInterval(countdown, 1000);

// function countdown() {
//   if (secondsLeft == 0) {
//     clearTimeout(timerId);
//     timerDiv.innerHTML = `</p>Time's up.</p>`;
//     // boardClick.removeEventListener('click', fontClick);
//     reset();
//   } else {
//     timerDiv.innerHTML = `</p> Time remaining:</br>${secondsLeft}</p>`;
//     secondsLeft--;
//   }
// }