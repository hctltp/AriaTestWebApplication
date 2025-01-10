let state = {};


/** ScreenReader Starts*/
let isScreenReaderActive = false;

function enableScreenReader() {
    isScreenReaderActive = !isScreenReaderActive;

    const button = document.getElementById('screenReaderToggleButton');

    if (isScreenReaderActive) {
        /*alert('Screen Reader enabled');*/
        button.classList.remove('btn-passive');
        button.classList.add('btn-active');
        startScreenReader();
    } else {
        button.classList.remove('btn-active');
        button.classList.add('btn-passive');
        stopScreenReader();
    }
}

let synth = window.speechSynthesis;
let textQueue = [];

function startScreenReader() {
    const elementsToRead = document.querySelectorAll('h1, h2, h3, p, a');
    elementsToRead.forEach(el => {
        const textToRead = el.tagName === 'A' ? `Link: ${el.textContent}` : el.textContent;
        textQueue.push(textToRead);
    });

    readNext();
}

function stopScreenReader() {
    synth.cancel();
    textQueue = [];
}

function readNext() {
    if (textQueue.length === 0 || !isScreenReaderActive) return;

    const textToRead = textQueue.shift();
    const speech = new SpeechSynthesisUtterance(textToRead);

    speech.onend = function () {
        readNext();
    };

    synth.speak(speech);
}


/** SelectedFieldReader Starts*/
let isSelectedFieldReaderActive = false;

function enableSelectedFieldReader() {
    isSelectedFieldReaderActive = !isSelectedFieldReaderActive;

    const button = document.getElementById('selectedFieldReaderToggleButton');

    if (isSelectedFieldReaderActive) {
        /*alert('Selected Field Reader enabled');*/
        button.classList.remove('btn-passive');
        button.classList.add('btn-active');
        enableFieldSelection();
    } else {
        //alert('Selected Field Reader disabled');
        button.classList.remove('btn-active');
        button.classList.add('btn-passive');
        disableFieldSelection();
    }
}

function enableFieldSelection() {
    const selectableElements = document.querySelectorAll('.selectable');
    selectableElements.forEach(element => {
        element.addEventListener('click', readSelectedField);
        element.classList.add('highlighted');
    });
}

function disableFieldSelection() {
    const selectableElements = document.querySelectorAll('.selectable');
    selectableElements.forEach(element => {
        element.removeEventListener('click', readSelectedField);
        element.classList.remove('highlighted');
    });
}

function readSelectedField(event) {
    const textToRead = event.target.textContent.trim();
    const speech = new SpeechSynthesisUtterance(textToRead);
    window.speechSynthesis.speak(speech);
}


//function toggleFeature(feature, className) {
//    document.body.classList.toggle(className);
//    state[feature] = !state[feature];
//    console.log(`${feature} is now ${state[feature] ? 'enabled' : 'disabled'}`);
//}

// General toggle function for features
function toggleFeature(feature, className, buttonId) {
    // Toggle the feature class on the body
    document.body.classList.toggle(className);

    // Update the state for the feature
    state[feature] = !state[feature];

    // Update the button's class and text
    const button = document.getElementById(buttonId);

    if (state[feature]) {
        button.classList.remove('btn-passive');
        button.classList.add('btn-active');
        
    } else {
        button.classList.remove('btn-active');
        button.classList.add('btn-passive');
        
    }

    // Log the new state
    console.log(`${feature} is now ${state[feature] ? 'enabled' : 'disabled'}`);
}




function highlightLinks() {
    toggleFeature('highlightLinks', 'highlight', 'highlightLinksToggleButton' );
}

function makeTextBigger() {
    toggleFeature('makeTextBigger', 'bigger-text', 'makeTextBiggerToggleButton');
}

function alignTextLeft() {
    document.body.style.textAlign = document.body.style.textAlign === 'left' ? 'initial' : 'left';
}

function makeCursorBigger() {
    toggleFeature('makeCursorBigger', 'bigger-cursor', 'makeCursorBiggerToggleButton');
}

function addReadingGuide() {
    document.querySelector('.reading-guide').classList.toggle('active');
}

function addReadingMask() {
    document.querySelector('.reading-mask').classList.toggle('active');
}

function setDyslexicFriendlyFont() {
    toggleFeature('setDyslexicFriendlyFont', 'dyslexia-font', 'setDyslexicFriendlyFontToggleButton');
}

function toggleHighContrast() {
    toggleFeature('toggleHighContrast', 'high-contrast', 'highContrastToggleButton');
}

function desaturateColors() {
    toggleFeature('desaturateColors', 'desaturate', 'desaturateColorsToggleButton');
}

function reduceSaturation() {
    toggleFeature('reduceSaturation', 'low-saturation', 'reduceSaturationToggleButton');
}

function increaseSaturation() {
    toggleFeature('increaseSaturation', 'high-saturation', 'increaseSaturationToggleButton');
}

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('show');
}

//function enableScreenReader() {
//    const textToRead = $("body").text();
//    const speech = new SpeechSynthesisUtterance(textToRead);
//    window.speechSynthesis.speak(speech);
//}

//function enableSelectedFieldReader() {
//    $("input, textarea").on("focus", function () {
//        const textToRead = $(this).val() || $(this).attr("placeholder") || "No content available";
//        const speech = new SpeechSynthesisUtterance(textToRead);
//        window.speechSynthesis.speak(speech);
//    });
//}

//function highlightLinks() {
//    $("a").css({
//        "background-color": "yellow",
//        "color": "red",
//        "font-weight": "bold",
//    });
//}

//function makeTextBigger() {
//    $("body").css("font-size", "1.5em");
//}

//function alignTextLeft() {
//    $("body").css("text-align", "left");
//}

//function makeCursorBigger() {
//    $("body").css("cursor", "pointer");
//}

//function addReadingGuide() {
//    if (!$("#reading-guide").length) {
//        $("body").append('<div id="reading-guide" style="position: fixed; top: 50%; width: 100%; height: 2px; background: black; z-index: 9999;"></div>');
//    }
//}

//function addReadingMask() {
//    if (!$("#reading-mask").length) {
//        $("body").append('<div id="reading-mask" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 9999;"></div>');
//    }
//}

//function setDyslexicFriendlyFont() {
//    $("body").css("font-family", "Arial, sans-serif");
//}

//function toggleHighContrast() {
//    $("body").css({
//        "background-color": "black",
//        "color": "white",
//    });
//}

//function desaturateColors() {
//    $("body").css("filter", "grayscale(100%)");
//}

//function reduceSaturation() {
//    $("body").css("filter", "saturate(50%)");
//}

//function increaseSaturation() {
//    $("body").css("filter", "saturate(200%)");
//}


//document.addEventListener("DOMContentLoaded", function () {
//    const menuToggle = document.getElementById("menu-toggle");
//    const accessibilityMenu = document.getElementById("accessibility-menu");

//    // Toggle the menu visibility
//    menuToggle.addEventListener("click", function () {
//        const isMenuVisible = accessibilityMenu.style.display === "block";
//        accessibilityMenu.style.display = isMenuVisible ? "none" : "block";
//        menuToggle.style.display = isMenuVisible ? "block" : "none";
//    });

//    // Close the menu when clicking outside
//    document.addEventListener("click", function (event) {
//        if (!menuToggle.contains(event.target) && !accessibilityMenu.contains(event.target)) {
//            accessibilityMenu.style.display = "none";
//            menuToggle.style.display = "block";
//        }
//    });
//});


//// Toggle Menu Visibility
//const menuToggle = document.getElementById("menu-toggle");
//const accessibilityMenu = document.getElementById("accessibility-menu");

//menuToggle.addEventListener("click", () => {
//    if (accessibilityMenu.style.display === "none") {
//        accessibilityMenu.style.display = "block";
//    } else {
//        accessibilityMenu.style.display = "none";
//    }
//});
