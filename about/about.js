/* =====================================================
   LANGUAGE ELEMENTS
===================================================== */

const languageDropdown =
    document.getElementById("languageDropdown");

const languageSelected =
    document.getElementById("languageSelected");

const languageOptions =
    document.querySelectorAll(".language-option");

const selectedFlag =
    document.getElementById("selectedFlag");

const selectedLanguage =
    document.getElementById("selectedLanguage");



/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");



/* =====================================================
   LANGUAGE DATA
===================================================== */

const languageData = {

    id: {

        flag: "🇮🇩",

        code: "ID"

    },

    en: {

        flag: "🇬🇧",

        code: "EN"

    }

};



/* =====================================================
   APPLY LANGUAGE
===================================================== */

function applyLanguage(language) {

    const elements =
        document.querySelectorAll(
            "[data-id][data-en]"
        );


    elements.forEach(element => {

        const text =
            language === "en"

                ? element.getAttribute("data-en")

                : element.getAttribute("data-id");


        if (text !== null) {

            element.textContent = text;

        }

    });


    selectedFlag.textContent =
        languageData[language].flag;


    selectedLanguage.textContent =
        languageData[language].code;


    languageOptions.forEach(option => {

        option.classList.toggle(

            "active",

            option.getAttribute(
                "data-language"
            ) === language

        );

    });


    document.documentElement.lang =
        language;


    localStorage.setItem(
        "portfolioLanguage",
        language
    );


    /* Refresh Twemoji */

    if (window.twemoji) {

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
   LANGUAGE DROPDOWN
===================================================== */

languageSelected.addEventListener(

    "click",

    function (event) {

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



languageOptions.forEach(option => {

    option.addEventListener(

        "click",

        function () {

            const language =
                this.getAttribute(
                    "data-language"
                );


            applyLanguage(language);


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



/* Close language dropdown */

document.addEventListener(

    "click",

    function (event) {

        if (
            !languageDropdown.contains(
                event.target
            )
        ) {

            languageDropdown.classList.remove(
                "open"
            );


            languageSelected.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }

);



/* =====================================================
   MOBILE MENU
===================================================== */

menuToggle.addEventListener(

    "click",

    function () {

        const isOpen =
            navMenu.classList.toggle(
                "show"
            );


        this.setAttribute(
            "aria-expanded",
            isOpen
        );

    }

);



/* Close mobile menu when link clicked */

document
    .querySelectorAll(".nav-menu a")
    .forEach(link => {

        link.addEventListener(

            "click",

            function () {

                navMenu.classList.remove(
                    "show"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        );

    });



/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


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

            threshold: 0.12,

            rootMargin:
                "0px 0px -40px 0px"

        }

    );



revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =====================================================
   INITIAL LANGUAGE
===================================================== */

const savedLanguage =
    localStorage.getItem(
        "portfolioLanguage"
    ) || "id";


applyLanguage(
    savedLanguage
);



/* =====================================================
   TWEMOJI ON PAGE LOAD
===================================================== */

window.addEventListener(

    "load",

    function () {

        if (window.twemoji) {

            twemoji.parse(

                document.body,

                {

                    folder: "svg",

                    ext: ".svg"

                }

            );

        }

    }

);