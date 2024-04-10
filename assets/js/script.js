const topHeader = document.querySelector(".top-header");
const bottomFooter = document.querySelector("footer");
const mainSection = document.querySelector("main");


let homeAllSection = document.querySelectorAll(".homePage");


topHeader.addEventListener("click",(e)=>{
    let tabName = e.target.innerText;
    tabName == "NEWS" ? document.documentElement.style.setProperty("--tabChangeAnime", "50%") : document.documentElement.style.setProperty("--tabChangeAnime", "0");

    homeAllSection.forEach((item)=>{
        item.style.display="none";
    });

    let homeSelectedSection = document.querySelector(`#${tabName.toLowerCase()}-section`);
    homeSelectedSection.style.display="flex";
});
