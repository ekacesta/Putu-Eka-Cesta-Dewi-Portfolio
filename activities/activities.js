/* =========================================================
   ACTIVITIES PAGE — JAVASCRIPT
========================================================= */


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

const languageDropdown =
    document.getElementById(
        "languageDropdown"
    );

const languageSelected =
    document.getElementById(
        "languageSelected"
    );

const languageOptions =
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


function setLanguage(language) {

    document.documentElement.lang =
        language === "id"
            ? "id"
            : "en";


    const elements =
        document.querySelectorAll(
            "[data-id][data-en]"
        );


    elements.forEach(element => {

        element.textContent =
            language === "id"
                ? element.dataset.id
                : element.dataset.en;

    });


    if (language === "id") {

        selectedLanguage.textContent =
            "ID";

        selectedFlag.textContent =
            "🇮🇩";

    } else {

        selectedLanguage.textContent =
            "EN";

        selectedFlag.textContent =
            "🇬🇧";

    }


    languageOptions.forEach(option => {

        option.classList.toggle(
            "active",
            option.dataset.language === language
        );

    });


    localStorage.setItem(
        "portfolioLanguage",
        language
    );

}


/* =========================================================
   INITIAL LANGUAGE
========================================================= */

const savedLanguage =
    localStorage.getItem(
        "portfolioLanguage"
    ) || "id";

setLanguage(savedLanguage);


/* =========================================================
   LANGUAGE DROPDOWN
========================================================= */

if (languageSelected) {

    languageSelected.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            const isOpen =
                languageDropdown.classList.toggle(
                    "open"
                );

            languageSelected.setAttribute(
                "aria-expanded",
                isOpen
            );

        }
    );

}


languageOptions.forEach(option => {

    option.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            setLanguage(
                option.dataset.language
            );

            languageDropdown.classList.remove(
                "open"
            );

            languageSelected.setAttribute(
                "aria-expanded",
                "false"
            );

        }
    );

});


document.addEventListener(
    "click",
    () => {

        if (!languageDropdown) {
            return;
        }

        languageDropdown.classList.remove(
            "open"
        );

        if (languageSelected) {

            languageSelected.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navMenu =
    document.getElementById(
        "navMenu"
    );


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        () => {

            navMenu.classList.toggle(
                "show"
            );

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "show"
                    );

                }
            );

        });

}


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}