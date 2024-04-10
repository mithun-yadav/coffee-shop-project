const topHeader = document.querySelector(".top-header");
const bottomFooter = document.querySelector("footer");
const mainSection = document.querySelector("main");
const footerIconDivs = document.querySelectorAll(".footer-icon");
const impFourSections = document.querySelectorAll(".impFourSections");


/*:::::::::::::::::::::::::::::Home page start:::::::::::::::::::::::::::::::::::*/

let homeAllSection = document.querySelectorAll(".homePage");


topHeader.addEventListener("click",(e)=>{
    let tabName = e.target.innerText;
    tabName == "NEWS" ? document.documentElement.style.setProperty("--tabChangeAnime", "50%") : document.documentElement.style.setProperty("--tabChangeAnime", "0");

    homeAllSection.forEach((item)=>{
        item.style.display="none";
    });

    let homeSelectedSection = document.querySelector(`#${tabName.toLowerCase()}-section`);
    homeSelectedSection.style.display="flex";
    window.scrollTo({
        top: 0,
        left: 0,
      });
});

/*:::::::::::::::::::::::::::::Home page end:::::::::::::::::::::::::::::::::::*/




/*:::::::::::::::::::::::::::::Footer page start:::::::::::::::::::::::::::::::::::*/

footerIconDivs.forEach((item)=>{
    item.addEventListener("click",(e)=>{
        
        impFourSections.forEach((item)=>{
            item.style.display="none";
        });
        

        let selectedFooterBtnName = e.target.dataset.divname;
        let selectedFooterBtn = document.querySelector(`#${selectedFooterBtnName}`);
        selectedFooterBtn.style.display="block";
        
    },true);
})
    /*:::::::::::::::::::::::::::::Footer page end:::::::::::::::::::::::::::::::::::*/



/*::::::::::::::::::::::::::::::::Menu Section start:::::::::::::::::::::::::::::::::::::::*/


const scrollImage = document.querySelectorAll(".scroll-image");
const menuimgDiv = document.querySelectorAll(".menuimgDiv");


let menuIds = undefined;

scrollImage.forEach((item)=>{

    item.addEventListener("click",(e)=>{

        menuimgDiv.forEach((item)=>{
            item.style.display="none";
        });


        menuIds = item.dataset.menuimg;
        let singleMenuDiv = document.querySelector(`#${menuIds}`);
        singleMenuDiv.style.display="block"


        
    });

});





const menuContainerUlLi = document.querySelectorAll(".menuContainer-ul li");
const menuContainer = document.querySelectorAll(".menuContainer");

menuContainerUlLi.forEach((item)=>{
    item.addEventListener("click",()=>{

        menuContainer.forEach((item)=>{
            item.style.display="none";
        })

        let menuContainerClass = item.dataset.menulistcount;
        
        let selectedMenuContainer = document.querySelector(`#${menuContainerClass}`);
        selectedMenuContainer.style.display="grid"

    })
})

/*::::::::::::::::::::::::::::::::menu Section end:::::::::::::::::::::::::::::::::::::::*/



