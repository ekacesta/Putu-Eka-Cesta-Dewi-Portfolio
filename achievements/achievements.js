/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle("show");

        }
    );

}


document
    .querySelectorAll(".nav-menu a")
    .forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    if (navMenu) {

                        navMenu.classList.remove("show");

                    }

                }
            );

        }
    );



/* =========================================================
   LANGUAGE DROPDOWN
========================================================= */

const languageDropdown =
    document.querySelector(
        ".language-dropdown"
    );

const languageSelected =
    document.querySelector(
        ".language-selected"
    );


if (
    languageSelected &&
    languageDropdown
) {

    languageSelected.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            languageDropdown.classList.toggle(
                "open"
            );

            languageSelected.setAttribute(
                "aria-expanded",
                languageDropdown.classList.contains(
                    "open"
                )
            );

        }
    );

}


document.addEventListener(
    "click",
    function () {

        if (languageDropdown) {

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

    }
);



/* =========================================================
   LANGUAGE SWITCHER
========================================================= */

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


function setLanguage(language) {

    document
        .querySelectorAll(
            "[data-id][data-en]"
        )
        .forEach(
            function (element) {

                const value =
                    element.getAttribute(
                        `data-${language}`
                    );


                if (value !== null) {

                    element.textContent =
                        value;

                }

            }
        );


    languageButtons.forEach(
        function (button) {

            button.classList.toggle(
                "active",
                button.dataset.language === language
            );

        }
    );


    if (selectedLanguage) {

        selectedLanguage.textContent =
            language === "en"
                ? "EN"
                : "ID";

    }


    if (selectedFlag) {

        selectedFlag.textContent =
            language === "en"
                ? "🇬🇧"
                : "🇮🇩";

    }


    document.documentElement.lang =
        language;


    localStorage.setItem(
        "portfolioLanguage",
        language
    );


    if (languageDropdown) {

        languageDropdown.classList.remove(
            "open"
        );

    }


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


languageButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                setLanguage(
                    button.dataset.language
                );

            }
        );

    }
);


const savedLanguage =
    localStorage.getItem(
        "portfolioLanguage"
    );


setLanguage(
    savedLanguage === "en"
        ? "en"
        : "id"
);



/* =========================================================
   IMAGE PLACEHOLDER
========================================================= */

const mediaImages =
    document.querySelectorAll(
        ".media-placeholder img"
    );


mediaImages.forEach(
    function (image) {

        function showImage() {

            if (
                image.complete &&
                image.naturalWidth > 0
            ) {

                image
                    .closest(
                        ".media-placeholder"
                    )
                    .classList.add(
                        "has-image"
                    );

            }

        }


        function hideImage() {

            const parent =
                image.closest(
                    ".media-placeholder"
                );


            if (parent) {

                parent.classList.remove(
                    "has-image"
                );

            }

        }


        image.addEventListener(
            "load",
            showImage
        );


        image.addEventListener(
            "error",
            hideImage
        );


        showImage();

    }
);



/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const observer =
        new IntersectionObserver(
            function (
                entries,
                obs
            ) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "active"
                            );

                            obs.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .1
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}
else {

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "active"
            );

        }
    );

}



/* =========================================================
   RESPONSIVE NAV RESET
========================================================= */

window.addEventListener(
    "resize",
    function () {

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



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const currentPage =
    window.location.pathname;


document
    .querySelectorAll(
        ".nav-menu a"
    )
    .forEach(
        function (link) {

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

        }
    );