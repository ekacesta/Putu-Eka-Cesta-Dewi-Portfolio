// =====================================================
// MOBILE MENU
// =====================================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");


// Open / close mobile menu

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

}


// Close mobile menu after clicking navigation link

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu) {
            navMenu.classList.remove("show");
        }

    });

});


// =====================================================
// LANGUAGE DROPDOWN
// =====================================================

const languageDropdown =
    document.querySelector(".language-dropdown");

const languageSelected =
    document.querySelector(".language-selected");


// Open / close language dropdown

if (languageSelected && languageDropdown) {

    languageSelected.addEventListener("click", (event) => {

        event.stopPropagation();

        languageDropdown.classList.toggle("open");

    });

}


// Close dropdown when clicking outside

document.addEventListener("click", () => {

    if (languageDropdown) {

        languageDropdown.classList.remove("open");

    }

});


// =====================================================
// LANGUAGE ELEMENTS
// =====================================================

const languageButtons =
    document.querySelectorAll(".language-option");

const selectedLanguage =
    document.getElementById("selectedLanguage");

const selectedFlag =
    document.getElementById("selectedFlag");


// =====================================================
// TWEMOJI
// =====================================================

function renderTwemoji() {

    if (typeof twemoji !== "undefined") {

        twemoji.parse(document.body, {

            folder: "svg",

            ext: ".svg"

        });

    }

}


// =====================================================
// SET LANGUAGE
// =====================================================

function setLanguage(language) {

    // ---------------------------------------------
    // Change all translated text
    // ---------------------------------------------

    const translatedElements =
        document.querySelectorAll("[data-id][data-en]");


    translatedElements.forEach((element) => {

        const translation =
            element.getAttribute(`data-${language}`);


        if (translation !== null) {

            element.textContent = translation;

        }

    });


    // ---------------------------------------------
    // Update active language option
    // ---------------------------------------------

    languageButtons.forEach((button) => {

        const isActive =
            button.dataset.language === language;

        button.classList.toggle(
            "active",
            isActive
        );

    });


    // ---------------------------------------------
    // Update selected language in navbar
    // ---------------------------------------------

    if (language === "en") {

        if (selectedLanguage) {
            selectedLanguage.textContent = "EN";
        }

        if (selectedFlag) {
            selectedFlag.textContent = "🇬🇧";
        }

    } else {

        if (selectedLanguage) {
            selectedLanguage.textContent = "ID";
        }

        if (selectedFlag) {
            selectedFlag.textContent = "🇮🇩";
        }

    }


    // ---------------------------------------------
    // Update HTML language attribute
    // ---------------------------------------------

    document.documentElement.lang = language;


    // ---------------------------------------------
    // Save selected language
    // ---------------------------------------------

    localStorage.setItem(
        "portfolioLanguage",
        language
    );


    // ---------------------------------------------
    // Close language dropdown
    // ---------------------------------------------

    if (languageDropdown) {

        languageDropdown.classList.remove("open");

    }


    // ---------------------------------------------
    // Render Twemoji
    // ---------------------------------------------

    renderTwemoji();

}


// =====================================================
// LANGUAGE BUTTON CLICK
// =====================================================

languageButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.stopPropagation();


        const selectedLanguage =
            button.dataset.language;


        setLanguage(selectedLanguage);

    });

});


// =====================================================
// LOAD SAVED LANGUAGE
// =====================================================

const savedLanguage =
    localStorage.getItem("portfolioLanguage");


if (savedLanguage === "en") {

    setLanguage("en");

} else {

    setLanguage("id");

}


// =====================================================
// INITIAL TWEMOJI RENDER
// =====================================================

renderTwemoji();