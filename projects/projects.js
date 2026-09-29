/* =====================================================
   PROJECTS PAGE — EKA CESTA
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("show");

    });

}


/* Close mobile menu after clicking navigation link */

const navLinks =
    document.querySelectorAll(".nav-menu a");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("show");

        }

    });

});



/* =====================================================
   LANGUAGE DROPDOWN
===================================================== */

const languageDropdown =
    document.querySelector(".language-dropdown");

const languageSelected =
    document.querySelector(".language-selected");


/* Open / close language dropdown */

if (languageSelected && languageDropdown) {

    languageSelected.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            languageDropdown.classList.toggle(
                "open"
            );

        }
    );

}


/* Close dropdown when clicking outside */

document.addEventListener("click", () => {

    if (languageDropdown) {

        languageDropdown.classList.remove(
            "open"
        );

    }

});



/* =====================================================
   LANGUAGE ELEMENTS
===================================================== */

const languageButtons =
    document.querySelectorAll(
        ".language-option"
    );

const selectedLanguage =
    document.getElementById(
        "selectedLanguage"
    );

const selectedFlag =
    document.getElementById(
        "selectedFlag"
    );



/* =====================================================
   SET LANGUAGE
===================================================== */

function setLanguage(language) {


    /* ---------------------------------------------
       CHANGE ALL TRANSLATED TEXT
    --------------------------------------------- */

    const translatedElements =
        document.querySelectorAll(
            "[data-id][data-en]"
        );


    translatedElements.forEach((element) => {

        const translation =
            element.getAttribute(
                `data-${language}`
            );


        if (translation !== null) {

            element.textContent =
                translation;

        }

    });



    /* ---------------------------------------------
       UPDATE ACTIVE LANGUAGE OPTION
    --------------------------------------------- */

    languageButtons.forEach((button) => {

        const isActive =
            button.dataset.language ===
            language;


        button.classList.toggle(
            "active",
            isActive
        );

    });



    /* ---------------------------------------------
       UPDATE NAVBAR LANGUAGE
    --------------------------------------------- */

    if (language === "en") {

        if (selectedLanguage) {

            selectedLanguage.textContent =
                "EN";

        }


        if (selectedFlag) {

            selectedFlag.textContent =
                "🇬🇧";

        }

    } else {

        if (selectedLanguage) {

            selectedLanguage.textContent =
                "ID";

        }


        if (selectedFlag) {

            selectedFlag.textContent =
                "🇮🇩";

        }

    }



    /* ---------------------------------------------
       UPDATE HTML LANGUAGE
    --------------------------------------------- */

    document.documentElement.lang =
        language;



    /* ---------------------------------------------
       SAVE LANGUAGE
       
       IMPORTANT:
       SAME KEY AS HOME
    --------------------------------------------- */

    localStorage.setItem(
        "portfolioLanguage",
        language
    );



    /* ---------------------------------------------
       CLOSE DROPDOWN
    --------------------------------------------- */

    if (languageDropdown) {

        languageDropdown.classList.remove(
            "open"
        );

    }



    /* ---------------------------------------------
       TWEMOJI
    --------------------------------------------- */

    renderTwemoji();

}



/* =====================================================
   LANGUAGE BUTTON CLICK
===================================================== */

languageButtons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            const language =
                button.dataset.language;


            setLanguage(language);

        }
    );

});



/* =====================================================
   LOAD SAVED LANGUAGE
===================================================== */


/*
    IMPORTANT:

    Home menggunakan:

        portfolioLanguage

    Jadi Projects juga harus membaca:

        portfolioLanguage

    BUKAN:

        preferredLanguage
*/

const savedLanguage =
    localStorage.getItem(
        "portfolioLanguage"
    );


if (savedLanguage === "en") {

    setLanguage("en");

} else {

    setLanguage("id");

}



/* =====================================================
   TWEMOJI
===================================================== */

function renderTwemoji() {

    if (
        typeof twemoji !==
        "undefined"
    ) {

        twemoji.parse(
            document.body,
            {
                folder: "svg",
                ext: ".svg"
            }
        );

    }

}



/* =====================================================
   INITIAL TWEMOJI
===================================================== */

renderTwemoji();



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".project-detail, " +
        ".documentation-section, " +
        ".project-content-grid, " +
        ".tech-section, " +
        ".project-results"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "is-visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.08
            }
        );


    revealElements.forEach(
        (element) => {

            element.classList.add(
                "reveal"
            );


            revealObserver.observe(
                element
            );

        }
    );

}



/* =====================================================
   CLOSE MOBILE MENU WHEN RESIZING
===================================================== */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 800 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove(
                "show"
            );

        }

    }
);



/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const currentPage =
    window.location.pathname;


const currentLinks =
    document.querySelectorAll(
        ".nav-menu a"
    );


currentLinks.forEach((link) => {

    const linkPath =
        new URL(
            link.href,
            window.location.href
        ).pathname;


    if (
        linkPath === currentPage
    ) {

        link.classList.add(
            "active"
        );

    }

});