let randomFontName;
let randomFontUrl;
let randomFontType;
let randomFontMoreInfo;
let intruderPosition;
let intruderFontName;
let intruderFontUrl;
let intruderFontType;
let intruderFontMoreInfo;

// Testing fontArray array of objects
// Starter Serif fonts

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
    document.querySelector('.main-font').setAttribute('href' , randomFontUrl);  
    const fontBox = document.querySelector('.fonts-box');
    fontBox.setAttribute('style', 'font-family');
    fontBox.style.fontFamily=(randomFontName);
}

fontFamilyFont();

// Randomly select and display the intruder font...

const intruderPicker = () => {
    const randomizeFont = (Math.floor(Math.random() * fontArray.length));
    intruderFontName = fontArray[randomizeFont].name;
    intruderFontUrl = fontArray[randomizeFont].url;
    intruderFontType = fontArray[randomizeFont].type;
    intruderFontMoreInfo = fontArray[randomizeFont].moreInfo;
}

const randomizeIntruderPosition = () => {
    intruderPosition = (Math.floor(Math.random() * 9));
}

randomizeIntruderPosition();

const intruderFont = () => {
    document.querySelector('.intruder-font').setAttribute('href' , randomFontUrl);  
    const intruderFontBox = document.querySelectorAll('.font-box');
    const intruderPara = intruderFontBox.item(intruderPosition);
    let intruderLetter = intruderPara.firstElementChild;

    // console.log(intruderPosition);
    // console.log(intruderPara);

    intruderLetter.setAttribute('style', 'font-family');
    intruderLetter.style.fontFamily=(intruderFontName);

}

intruderFont();