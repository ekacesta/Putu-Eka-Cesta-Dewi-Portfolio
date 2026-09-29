const menuToggle=document.getElementById("menuToggle");
const navMenu=document.getElementById("navMenu");
if(menuToggle&&navMenu){menuToggle.addEventListener("click",()=>{navMenu.classList.toggle("show");});}
document.querySelectorAll(".nav-menu a").forEach(link=>link.addEventListener("click",()=>{if(navMenu)navMenu.classList.remove("show");}));
const languageDropdown=document.querySelector(".language-dropdown");
const languageSelected=document.querySelector(".language-selected");
if(languageSelected&&languageDropdown){languageSelected.addEventListener("click",event=>{event.stopPropagation();languageDropdown.classList.toggle("open");languageSelected.setAttribute("aria-expanded",languageDropdown.classList.contains("open"));});}
document.addEventListener("click",()=>{if(languageDropdown){languageDropdown.classList.remove("open");if(languageSelected)languageSelected.setAttribute("aria-expanded","false");}});
const languageButtons=document.querySelectorAll(".language-option");
const selectedLanguage=document.getElementById("selectedLanguage");
const selectedFlag=document.getElementById("selectedFlag");
function setLanguage(language){document.querySelectorAll("[data-id][data-en]").forEach(element=>{const value=element.getAttribute(`data-${language}`);if(value!==null)element.textContent=value;});languageButtons.forEach(button=>button.classList.toggle("active",button.dataset.language===language));if(selectedLanguage)selectedLanguage.textContent=language==="en"?"EN":"ID";if(selectedFlag)selectedFlag.textContent=language==="en"?"🇬🇧":"🇮🇩";document.documentElement.lang=language;localStorage.setItem("portfolioLanguage",language);if(languageDropdown)languageDropdown.classList.remove("open");if(window.twemoji)twemoji.parse(document.body,{folder:"svg",ext:".svg"});}
languageButtons.forEach(button=>button.addEventListener("click",event=>{event.stopPropagation();setLanguage(button.dataset.language);}));
const savedLanguage=localStorage.getItem("portfolioLanguage");setLanguage(savedLanguage==="en"?"en":"id");
const revealElements=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window){const observer=new IntersectionObserver((entries,obs)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("active");obs.unobserve(entry.target);}})},{threshold:.12});revealElements.forEach(element=>observer.observe(element));}else{revealElements.forEach(element=>element.classList.add("active"));}
window.addEventListener("resize",()=>{if(window.innerWidth>800&&navMenu&&menuToggle)navMenu.classList.remove("show");});
const currentPage=window.location.pathname;document.querySelectorAll(".nav-menu a").forEach(link=>{const linkPath=new URL(link.href,window.location.href).pathname;if(linkPath===currentPage)link.classList.add("active");});
