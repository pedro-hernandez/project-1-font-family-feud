// global variables

// welcome screen

let fontBoxHide;
let welcomeDiv;
let welcomeParagraph;

// fonts

let randomFontName;
let randomFontUrl;
let randomFontBy;
let randomFontType;
let randomFontMoreInfo;
let chosenFont;

let imposterFontUrl;
let imposterFontBy;
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
let imposterName = document.querySelector('.imposter-name');
let imposterBy = document.querySelector('.imposter-by');
let imposterType = document.querySelector('.imposter-type');
let imposterUrl = document.querySelector('.imposter-url');
let rightPickDiv;
let wrongPickDiv;
let resultsText;

// round and score tracking

let currentRound;
let score = 0;

const welcome = () => {

    fontBoxHide = document.querySelector('.fonts-box');
    fontBoxHide.style.display = 'none';

    showInfo = document.querySelector('.show-info');
    showInfo.style.display = 'none';

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

    // imposter font is selected

    imposterPicker();

    // Register clicks on game board

    boardClick = document.querySelector('.fonts-box');

    boardClick.addEventListener('click', fontClick);

    function fontClick(event) {

        showInfoPane();
        revealImposter();
        const fontPosition = parseInt(event.target.dataset.position);

        // Evaluate if the clicked letter is part of the font-family
        // or an imposter font

        if (fontPosition === imposterPosition) {
            rightPick();
            rigthWrong.innerHTML = `Good job finding the imposter font! 😃`;
            score = score + 1;
        } else {
            wrongPick();
            rigthWrong.innerHTML = `Nope! That wasn't the imposter font. 😦`;
        }
    }

    roundTracker();
}

const mainFont = () => {
    const randomizeFont = (Math.floor(Math.random() * fontArray.length));
    randomFontName = fontArray[randomizeFont].name;
    chosenFont = randomFontName;

    randomFontBy = fontArray[randomizeFont].creator;
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
        imposterFontBy = fontArray[randomizeImposterFont].creator;
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
    }
}

// resets game board, tallies up score and increments round

const reset = () => {

    if (fontBoxHide.classList.contains('right-pick') === true) {
        fontBoxHide.classList.toggle('right-pick')
    } else if (fontBoxHide.classList.contains('wrong-pick') === true) {
        fontBoxHide.classList.toggle('wrong-pick');
    } else {

    }

    showInfo.style.display = "none";
    currentRound++;
    imposterPosition;
    imposterLetter.removeAttribute('style');
    welcomeDiv.style.display = "none";
    setInterval(mainFont(), 1000);
    setInterval(imposterPicker(), 1000);
}

// displays font-family and imposter font information

const showInfoPane = () => {

    showInfo.style.display = 'block';

    const button = document.querySelector('.button');
    button.addEventListener('click', roundTracker);

    randomFont.innerHTML = `<span>font-family</span>: "${randomFontName}";`;
    fontBy.innerHTML = `creator: ${randomFontBy}`;
    fontType.innerHTML = `type: ${randomFontType}`;
    fontUrl.innerHTML = `more info: <a href="${randomFontMoreInfo}" target="_blank">${randomFontMoreInfo}</a>`;
    imposterFont.innerHTML = `<span>imposter font</span>: ${imposterFontName}`;
    imposterFontName.innerHTML = `${imposterFontName}`;
    imposterBy.innerHTML = `creator: ${imposterFontBy}`;
    imposterType.innerHTML = `type: ${imposterFontType}`;
    imposterUrl.innerHTML = `more info: <a href="${imposterFontMoreInfo}" target="_blank">${imposterFontMoreInfo}</a>`;

}

// tracks rounds and generates results screen

const roundTracker = () => {
    if (currentRound < 5) {
        reset();
    } else {
        results();
    }
}

// generates results screen at the end of each round

const results = () => {

    showInfo.style.display = "none";

    fontBoxHide = document.querySelector('.fonts-box');
    fontBoxHide.style.display = "none";

    resultsScreen = document.querySelector('.welcome');
    resultsScreen.style.display = "block";

    welcomeParagraph.style.display = "none";

    resultsText = document.createElement('p');
    resultsText = resultsScreen.appendChild(resultsText);
    resultsText.innerHTML = `You found ${score} out of 5 imposter fonts. 🤔<br>Click to play again.`;

    resultsText.addEventListener('click', function () {
        removeResults();
    });
}

// removes results screen to start over

const removeResults = () => {

    resultsScreen.style.display = 'none';
    score = 0;
    currentRound = 0;
    resultsText.remove();
    reset();
}

// change font-family background color depending on right/wrong pick

const rightPick = () => {
    fontBoxHide.classList.toggle('right-pick');
}

const wrongPick = () => {
    fontBoxHide.classList.toggle('wrong-pick');
}

// shows imposter font position

const revealImposter = () => {
    imposterLetter.setAttribute('style', 'text-decoration');
    imposterLetter.style.textDecoration = ('underline');
    imposterLetter.style.fontFamily = (imposterFontName);
}

// fontArray array of objects

const fontArray = [
    {
        name: 'Merriweather',
        url: 'https://fonts.googleapis.com/css?family=Merriweather',
        creator: 'Sorkin Type',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Merriweather'
    },

    {
        name: 'Roboto Slab',
        url: 'https://fonts.googleapis.com/css?family=Roboto+Slab',
        creator: 'Christian Robertson',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Roboto+Slab',
    },

    {
        name: 'Playfair Display',
        url: 'https://fonts.googleapis.com/css?family=Playfair+Display',
        creator: 'Claus Eggers Sørensen',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Playfair+Display',
    },

    {
        name: 'Source Serif Pro',
        url: 'https://fonts.googleapis.com/css?family=Source+Serif+Pro',
        creator: 'Frank Grießhammer',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Source+Serif+Pro',
    },

    {
        name: 'Cardo',
        url: 'https://fonts.googleapis.com/css?family=Cardo',
        creator: 'David Perry',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Cardo',
    },

    {
        name: 'Arvo',
        url: 'https://fonts.googleapis.com/css?family=Arvo',
        creator: 'Anton Koovit',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Arvo',
    },

    {
        name: 'Bree Serif',
        url: 'https://fonts.googleapis.com/css?family=Bree+Serif',
        creator: 'TypeTogether',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Bree+Serif',
    },

    {
        name: 'Cinzel',
        url: 'https://fonts.googleapis.com/css?family=Cinzel',
        creator: 'Natanael Gama',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Cinzel',
    },

    {
        name: 'Josefin Slab',
        url: 'https://fonts.googleapis.com/css?family=Josefin+Slab',
        creator: 'Santiago Orozco',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Josefin+Slab',
    },

    {
        name: 'Pridi',
        url: 'https://fonts.googleapis.com/css?family=Pridi',
        creator: 'Cadson Demak',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Pridi',
    },

    {
        name: 'Noticia Text',
        creator: 'JM Solé',
        url: 'https://fonts.googleapis.com/css?family=Noticia+Text',
        type: 'Serif',
        moreInfo: 'https://fonts.google.com/specimen/Noticia+Text',
    },

    {
        name: 'Roboto',
        creator: 'Christian Robertson',
        url: 'https://fonts.googleapis.com/css?family=Roboto',
        type: 'Sans Serif',
        moreInfo: 'https://fonts.google.com/specimen/Roboto',
    },

    {
        name: 'Source Sans Pro',
        creator: 'Paul D. Hunt',
        url: 'https://fonts.googleapis.com/css?family=Source+Sans+Pro',
        type: 'Sans Serif',
        moreInfo: 'https://fonts.google.com/specimen/Source+Sans+Pro',
    },

    {
        name: 'Noto Sans',
        creator: 'Google',
        url: 'https://fonts.googleapis.com/css?family=Noto+Sans',
        type: 'Sans Serif',
        moreInfo: 'https://fonts.google.com/specimen/Noto+Sans',
    },

    {
        name: 'Fira Sans',
        creator: 'Carrois Apostrophe',
        url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
        type: 'San Serif',
        moreInfo: 'https://fonts.google.com/specimen/Fira+Sans',
    },

    {
        name: 'Rubik',
        creator: 'Hubert and Fischer, Meir Sadan and Cyreal',
        url: 'https://fonts.googleapis.com/css?family=Rubik',
        type: 'Sans Serif',
        moreInfo: 'https://fonts.google.com/specimen/Rubik',
    },

    {
        name: 'Cairo',
        creator: 'Mohamed Gaber, Multiple Designers',
        url: 'https://fonts.googleapis.com/css?family=Cairo',
        type: 'Sans Serif',
        moreInfo: 'https://fonts.google.com/specimen/Cairo',
    },

    {
        name: 'Catamaran',
        creator: 'Pria Ravichandran',
        url: 'https://fonts.googleapis.com/css?family=Catamaran',
        type: 'Sans Serif',
        moreInfo: 'https://fonts.google.com/specimen/Catamaran',
    },

    {
        name: 'Monda',
        creator: 'Vernon Adams',
        url: 'https://fonts.googleapis.com/css?family=Monda',
        type: 'Sans Serif',
        moreInfo: 'https://fonts.google.com/specimen/Monda',
    },

    {
        name: 'Ubuntu Mono',
        creator: 'Dalton Maag',
        url: 'https://fonts.googleapis.com/css?family=Ubuntu+Mono',
        type: 'Monospace',
        moreInfo: 'https://fonts.google.com/specimen/Ubuntu+Mono',
    },

    {
        name: 'IBM Plex Mono',
        creator: 'Mike Abbink and Bold Monday',
        url: 'https://fonts.googleapis.com/css?family=IBM+Plex+Mono',
        type: 'Monospace',
        moreInfo: 'https://fonts.google.com/specimen/IBM+Plex+Mono',
    },

    {
        name: 'Share Tech Mono',
        creator: 'Carrois Apostrophe',
        url: 'https://fonts.googleapis.com/css?family=Share+Tech+Mono',
        type: 'Monospace',
        moreInfo: 'https://fonts.google.com/specimen/Share+Tech+Mono',
    },

    {
        name: 'VT323',
        creator: 'Peter Hull',
        url: 'https://fonts.googleapis.com/css?family=VT323',
        type: 'Monospace',
        moreInfo: 'https://fonts.google.com/specimen/VT323',
    },

    {
        name: 'Anonymous Pro',
        creator: 'Mark Simonson',
        url: 'https://fonts.googleapis.com/css?family=Anonymous+Pro',
        type: 'Monospace',
        moreInfo: 'https://fonts.google.com/specimen/Anonymous+Pro',
    },
]