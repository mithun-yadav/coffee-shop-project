const topHeader = document.querySelector(".top-header");
const bottomFooter = document.querySelector("footer");
const mainSection = document.querySelector("main");





topHeader.addEventListener("click",(e)=>{
    let tabName = e.target.innerText;
    tabName == "NEWS" ? document.documentElement.style.setProperty("--tabChangeAnime", "50%") : document.documentElement.style.setProperty("--tabChangeAnime", "0");
});
