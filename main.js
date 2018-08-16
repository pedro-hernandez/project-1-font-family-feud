let randomFontName;
let imposterFontName;
let fontPosition;
let imposterPosition;
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

let imposterFontArray = [];


// Random font picker for "font-family" members

const fontFamilyPicker = () => {
    const randomizeFont = (Math.floor(Math.random() * fontArray.length));
    let randomFontName = fontArray[randomizeFont].name;
    let randomFontUrl = fontArray[randomizeFont].url;
    let randomFontType = fontArray[randomizeFont].type;
    let randomFontMoreInfo = fontArray[randomizeFont].moreInfo;
    fontArray.splice([randomizeFont], 1);
    imposterFontArray = fontArray;

    // Add random "font-family" member Google Fonts stylesheet to
    // <head> and set it to the (non-imposter) font-family members

    document.querySelector('.main-font').setAttribute('href', randomFontUrl);
    const fontBox = document.querySelector('.fonts-box');
    fontBox.setAttribute('style', 'font-family');
    fontBox.style.fontFamily = (randomFontName);
}

fontFamilyPicker();

// Randomly select the imposter font and its position

const imposterPicker = () => {
    const randomizeImposterFont = (Math.floor(Math.random() * imposterFontArray.length));
    imposterFontName = imposterFontArray[randomizeImposterFont].name;
    let imposterFontUrl = imposterFontArray[randomizeImposterFont].url;
    let imposterFontType = imposterFontArray[randomizeImposterFont].type;
    let imposterFontMoreInfo = imposterFontArray[randomizeImposterFont].moreInfo;

    // randomize imposter font's position

    imposterPosition = (Math.floor(Math.random() * 9));

    // place and display imposter font

    document.querySelector('.imposter-font').setAttribute('href', imposterFontUrl);
    const imposterFontBox = document.querySelectorAll('.font-box');
    const imposterPara = imposterFontBox.item(imposterPosition);
    let imposterLetter = imposterPara.firstElementChild;
    imposterLetter.setAttribute('style', 'font-family');
    imposterLetter.style.fontFamily = (imposterFontName);
}

imposterPicker();

// Register clicks on game board

const boardClick = document.querySelector('.fonts-box');

boardClick.addEventListener('click', fontClick);

function fontClick(event) {

    const fontPosition = parseInt(event.target.dataset.position);
    console.log(`current position: ${fontPosition}`);
    console.log(`imposter position: ${imposterPosition}`);

    // Evaluate if the clicked letter is part of the font-family
    // or an imposter font

    if (fontPosition == imposterPosition) {
        alert('You found the imposter font! 100 points');
        score = score + 100;
        reset();

    } else {
        alert('Sorry, not the imposter. No points for you.');
        reset();
    }

}

const reset = () => {
    console.log(score);
    randomFontName = '';
    imposterFontName = '';
    fontPosition;
    imposterPosition;
    imposterFontArray = [];
    currentRound++;
    fontFamilyPicker();
    imposterPicker();
}


