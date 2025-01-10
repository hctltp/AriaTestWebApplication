function enableScreenReader() {
    const textToRead = $("body").text();
    const speech = new SpeechSynthesisUtterance(textToRead);
    window.speechSynthesis.speak(speech);
}

function enableSelectedFieldReader() {
    $("input, textarea").on("focus", function () {
        const textToRead = $(this).val() || $(this).attr("placeholder") || "No content available";
        const speech = new SpeechSynthesisUtterance(textToRead);
        window.speechSynthesis.speak(speech);
    });
}

function highlightLinks() {
    $("a").css({
        "background-color": "yellow",
        "color": "red",
        "font-weight": "bold",
    });
}

function makeTextBigger() {
    $("body").css("font-size", "1.5em");
}

function alignTextLeft() {
    $("body").css("text-align", "left");
}

function makeCursorBigger() {
    $("body").css("cursor", "pointer");
}

function addReadingGuide() {
    if (!$("#reading-guide").length) {
        $("body").append('<div id="reading-guide" style="position: fixed; top: 50%; width: 100%; height: 2px; background: black; z-index: 9999;"></div>');
    }
}

function addReadingMask() {
    if (!$("#reading-mask").length) {
        $("body").append('<div id="reading-mask" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.8); z-index: 9999;"></div>');
    }
}

function setDyslexicFriendlyFont() {
    $("body").css("font-family", "Arial, sans-serif");
}

function toggleHighContrast() {
    $("body").css({
        "background-color": "black",
        "color": "white",
    });
}

function desaturateColors() {
    $("body").css("filter", "grayscale(100%)");
}

function reduceSaturation() {
    $("body").css("filter", "saturate(50%)");
}

function increaseSaturation() {
    $("body").css("filter", "saturate(200%)");
}


document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const accessibilityMenu = document.getElementById("accessibility-menu");

    // Toggle the menu visibility
    menuToggle.addEventListener("click", function () {
        const isMenuVisible = accessibilityMenu.style.display === "block";
        accessibilityMenu.style.display = isMenuVisible ? "none" : "block";
        menuToggle.style.display = isMenuVisible ? "block" : "none";
    });

    // Close the menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menuToggle.contains(event.target) && !accessibilityMenu.contains(event.target)) {
            accessibilityMenu.style.display = "none";
            menuToggle.style.display = "block";
        }
    });
});


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
