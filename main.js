// global variables

let randomFontName;
let chosenFont;
let imposterLetter;
let imposterPosition;
let imposterFontName;
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

// welcome screen
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

// Load main game board

const gameBoardLoad = () => {
    const welcomeScreenDiv = document.querySelector('.welcome');
    const welcomeScreenDivParent = welcomeScreenDiv.parentNode;

    const gameBoard = document.createElement('div');
    gameBoard.setAttribute('class', 'fonts-box fonts-box-gradient');

    welcomeScreenDivParent.replaceChild(gameBoard, welcomeScreenDiv);
}

// gameBoardLoad();

// welcome screen button eventListener to
// switch to main board  - CODE HERE


const playGame = () => {

    currentRound = 0;

    // random font picker for "font-family" members

    mainFont();

    // Randomly selects another imposter font if the same "font-family" font and 
    // imposter fonts are selected

    imposterPicker();

    // Register clicks on game board

    boardClick = document.querySelector('.fonts-box');

    boardClick.addEventListener('click', fontClick);

    function fontClick(event) {

        const fontPosition = parseInt(event.target.dataset.position);
        console.log(`position clicked: ${fontPosition}`);
        console.log(`imposter position: ${imposterPosition}`);

        // Evaluate if the clicked letter is part of the font-family
        // or an imposter font

        // countdown();    

        if (fontPosition === imposterPosition) {
            alert('You found the imposter font! 100 points');
            score = score++;
        } else {
            alert('Sorry, not the imposter. No points for you.');
        }

        roundTracker();

    }

    roundTracker();
}

const mainFont = () => {
    const randomizeFont = (Math.floor(Math.random() * fontArray.length));
    randomFontName = fontArray[randomizeFont].name;
    chosenFont = randomFontName;

    console.log(`font family name: ${chosenFont}`);


    const randomFontUrl = fontArray[randomizeFont].url;
    const randomFontType = fontArray[randomizeFont].type;
    const randomFontMoreInfo = fontArray[randomizeFont].moreInfo;

    document.querySelector('.main-font').setAttribute('href', randomFontUrl);
    const fontBox = document.querySelector('.fonts-box');
    fontBox.setAttribute('style', 'font-family');
    fontBox.style.fontFamily = (randomFontName);
}

const imposterPicker = () => {

    let randomizeImposterFont = (Math.floor(Math.random() * fontArray.length));
    imposterFontName = fontArray[randomizeImposterFont].name;

    if (imposterFontName === chosenFont) {
        imposterPicker();
    } else {
        console.log(`imposter font name: ${imposterFontName}`);

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
        // console.log(`imposterLetter: ${imposterLetter}`);
        // console.log(`imposter position ${imposterPosition}`);
    }

}

// resets game board, tallies up score and increments round

const reset = () => {
    console.log(`Current Score: ${score}`);
    console.log(`Current Round: ${currentRound}`);
    currentRound++;
    imposterPosition;
    imposterLetter.removeAttribute('style');
    mainFont();
    imposterPicker();
}

// tracks rounds and generates outcomes screen

const roundTracker = () => {
    if (currentRound < 5) {
        reset();
    } else {
        const gameBoardDiv = document.querySelector('.fonts-box');
        const gameBoardDivParent = gameBoardDiv.parentNode;

        var welcomeScreen = document.createElement('div');
        welcomeScreen.setAttribute('class', 'welcome welcome-gradient');
        welcomeScreen.innerHTML = `<p class="welcome-text">You have correctly identified ${score} out of 5 imposter fonts.</p> <p>Play again?</p> <p>BUTTON</p>`;

        gameBoardDivParent.replaceChild(welcomeScreen, gameBoardDiv);
    }
}

playGame();