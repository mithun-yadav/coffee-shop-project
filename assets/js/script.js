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
const menuContainerUlLi = document.querySelectorAll(".menuContainer-ul li");
const menuContainer = document.querySelectorAll(".menuContainer");


let menuIds = undefined;

scrollImage.forEach((item,index)=>{

    item.addEventListener("click",(e)=>{

        menuimgDiv.forEach((item)=>{
            item.style.display="none";
        });

        menuIds = item.dataset.menuimg;
        let singleMenuDiv = document.querySelector(`#${menuIds}`);
        singleMenuDiv.style.display="block"

        menuContainer.forEach((item)=>{
            item.style.display="none";
        });
        document.querySelector(`.menuContainer${index+1}1`).style.display="grid";
        console.log(`#menuContainer${index+1}`)


    });

});






menuContainerUlLi.forEach((item)=>{
    item.addEventListener("click",()=>{

        menuContainer.forEach((item)=>{
            item.style.display="none";
        })

        let menuContainerClass = item.dataset.menulistcount;
        
        let selectedMenuContainer = document.querySelector(`#${menuContainerClass}`);
        selectedMenuContainer.style.display="grid";

        console.log(menuContainerClass)
    })
})

/*::::::::::::::::::::::::::::::::menu Section end:::::::::::::::::::::::::::::::::::::::*/


/*::::::::::::::::::::::::::::::::Product Details Section start:::::::::::::::::::::::::::::::::::::::*/

const productDetailsClose = document.querySelector(".DetailsBackBtn");
const productDetails = document.querySelector("#productDetails");
const productImage = document.querySelector(".productImage");


productDetailsClose.addEventListener("click",()=>{
    productDetails.style.display="none";
});


const menuContainerImg = document.querySelectorAll(".menuContainer-img");
let detailsImage = undefined
menuContainerImg.forEach((item)=>{

    item.addEventListener("click",function(){


        detailsImage = this.children[0].getAttribute('src');
        productImage.setAttribute("src",detailsImage);

        productDetails.style.display="block";
    })
});


/*::::::::::::::::::::::::::::::::Product Details Section end:::::::::::::::::::::::::::::::::::::::*/




