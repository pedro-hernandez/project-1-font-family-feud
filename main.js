let randomFontName;
let randomFontUrl;
let randomFontType;
let randomFontMoreInfo;
let intruderPosition;
let intruderFontName;
let intruderFontUrl;
let intruderFontType;
let intruderFontMoreInfo;
let boardClass;

// fontArray array of objects with starter Serif fonts

let fontArray = [
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

// Random font picker for "font-family" members

const fontFamilyPicker = () => {
    const randomizeFont = (Math.floor(Math.random() * fontArray.length));
    randomFontName = fontArray[randomizeFont].name;
    randomFontUrl = fontArray[randomizeFont].url;
    randomFontType = fontArray[randomizeFont].type;
    randomFontMoreInfo = fontArray[randomizeFont].moreInfo;
    fontArray.splice([randomizeFont], 1);
}

fontFamilyPicker();

// Add random "font-family" member Google Fonts stylesheet to
// <head> and set it to the (non-intruder) font-family members

const fontFamilyFont = () => {
    document.querySelector('.main-font').setAttribute('href', randomFontUrl);
    const fontBox = document.querySelector('.fonts-box');
    fontBox.setAttribute('style', 'font-family');
    fontBox.style.fontFamily = (randomFontName);
}

fontFamilyFont();

// Randomly select the intruder font and its position

const intruderPicker = () => {
    const randomizeIntruderFont = (Math.floor(Math.random() * fontArray.length));
    intruderFontName = fontArray[randomizeIntruderFont].name;
    intruderFontUrl = fontArray[randomizeIntruderFont].url;
    intruderFontType = fontArray[randomizeIntruderFont].type;
    intruderFontMoreInfo = fontArray[randomizeIntruderFont].moreInfo;
}

intruderPicker();

const randomizeIntruderPosition = () => {
    intruderPosition = (Math.floor(Math.random() * 9));
}

randomizeIntruderPosition();

// Place and display intruder font

const intruderFont = () => {
    document.querySelector('.intruder-font').setAttribute('href', intruderFontUrl);
    const intruderFontBox = document.querySelectorAll('.font-box');
    const intruderPara = intruderFontBox.item(intruderPosition);
    let intruderLetter = intruderPara.firstElementChild;
    intruderLetter.setAttribute('style', 'font-family');
    intruderLetter.style.fontFamily = (intruderFontName);
}

intruderFont();

// Register clicks on game board

const boardClick = document.querySelector('.fonts-box');
boardClick.addEventListener('click', fontClick);

function fontClick (event) {
    const boardClass = event.target.getAttribute('class');
    const fontPosition = parseInt(event.target.dataset.position);
    console.log(boardClass);
    console.log(fontPosition);
}