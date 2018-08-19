// global variables

// welcome screen

let fontBoxHide;
let welcomeDiv;
let welcomeParagraph;

// fonts

let randomFontName;
let randomFontUrl;
let randomFontType;
let randomFontMoreInfo;
let chosenFont;

let imposterFontUrl;
let imposterFontType;
let imposterFontMoreInfo;
let imposterLetter;
let imposterPosition;
let imposterFontName;

// event

let boardClick;

// results

let showInfo;
let resultsScreen;
let rigthWrong = document.querySelector('h2');
let randomFont = document.querySelector('.random-font')
let fontBy = document.querySelector('.font-by');
let fontType = document.querySelector('.font-type');
let fontUrl = document.querySelector('.font-url');
let imposterFont = document.querySelector('.imposter-font-name');
console.log(imposterFont);

let imposterName = document.querySelector('.imposter-name');
let imposterBy = document.querySelector('.imposter-by');
let imposterType = document.querySelector('.imposter-type');
let imposterUrl = document.querySelector('.imposter-url');

// round and score tracking

let currentRound;
let score = 0;

const welcome = () => {

    fontBoxHide = document.querySelector('.fonts-box');
    fontBoxHide.style.display = "none";

    showInfo = document.querySelector('.show-info');
    showInfo.style.display = "none";

    welcomeDiv = document.querySelector('.welcome');
    welcomeParagraph = document.createElement('p');
    welcomeParagraph = welcomeDiv.appendChild(welcomeParagraph);
    welcomeParagraph.innerHTML = `<p class="welcome-text">Find the imposter font. Click to play.</p>`;

    welcomeParagraph.addEventListener('click', function () {
        removeWelcome();
    });
}

welcome();

// removes welcome screen and starts game

const removeWelcome = () => {

    welcomeDiv.style.display = "none";
    playGame();

}

const playGame = () => {

    currentRound = 0;
    score = 0;

    // random font picker for "font-family" members

    mainFont();

    // Randomly selects another imposter font if the same "font-family" font and 
    // imposter fonts are selected

    imposterPicker();

    // Register clicks on game board

    boardClick = document.querySelector('.fonts-box');

    boardClick.addEventListener('click', fontClick);

    function fontClick(event) {

        showInfoPane();
        const fontPosition = parseInt(event.target.dataset.position);
        console.log(`position clicked: ${fontPosition}`);
        console.log(`imposter position: ${imposterPosition}`);

        // Evaluate if the clicked letter is part of the font-family
        // or an imposter font

        // countdown();    

        if (fontPosition === imposterPosition) {
            rigthWrong.innerHTML = `Good job finding the imposter font!`;
            // alert('You found the imposter font!');
            score = score + 1;
            console.log(`score: ${score}`);
        } else {
            rigthWrong.innerHTML = `Sorry, not the imposter font`;
            // alert('Sorry, not the imposter.');
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


    randomFontUrl = fontArray[randomizeFont].url;
    randomFontType = fontArray[randomizeFont].type;
    randomFontMoreInfo = fontArray[randomizeFont].moreInfo;

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

        imposterFontUrl = fontArray[randomizeImposterFont].url;
        imposterFontType = fontArray[randomizeImposterFont].type;
        imposterFontMoreInfo = fontArray[randomizeImposterFont].moreInfo;

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
    setInterval(mainFont(), 1000);
    setInterval(imposterPicker(), 1000);
}

// displays font-family and imposter font information

const showInfoPane = () => {

    showInfo.style.display = 'block';
    randomFont.innerHTML = `<span>font-family</span>: ${randomFontName}`;
    fontBy.innerHTML = `by:`;
    fontType.innerHTML = `type: ${randomFontType}`;
    fontUrl.innerHTML = `more info: <a href="${randomFontMoreInfo}" target="_blank">${randomFontMoreInfo}</a>`;
    imposterFont.innerHTML = `<span>imposter font</span>: ${imposterFontName}`;
    // imposterName.innerHTML = `${imposterFontName}`;
    imposterBy.innerHTML = `by:`;
    imposterType.innerHTML = `type: ${imposterFontType}`;
    imposterUrl.innerHTML = `more info: <a href="${imposterFontMoreInfo}" target="_blank">${imposterFontMoreInfo}</a>`;

}


// tracks rounds and generates outcomes screen

const roundTracker = () => {
    if (currentRound < 5) {
        reset();
    } else {
        results();
    }
}


// generates results screen at the end of each round

const results = () => {

    fontBoxHide = document.querySelector('.fonts-box');
    fontBoxHide.style.display = "none";

    resultsScreen = document.querySelector('.welcome');
    resultsScreen.style.display = "block";

    welcomeParagraph.style.display = "none";

    let resultsText = document.createElement('p');
    resultsText = resultsScreen.appendChild(resultsText);
    resultsText.innerHTML = `You have correctly identified ${score} out of 5 imposter fonts.<br>Click to play again.`;

    resultsText.addEventListener('click', function () {
        removeResults();
    });
}

// removes results screen to start over

const removeResults = () => {

    resultsScreen.style.display = "none";
    playGame();

}

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