// Function to fetch data from the API
async function fetchData(diffEndPoints,diffType) {//getProductDetail
    const url = `https://app.doichaangcorporate.com/app/api/${diffEndPoints}`; // Replace this with your API endpoint
    const accessToken = 'f58acd6bfd116ef3401808fc25220cb5'; // Your access token
    const app_version = '1.0.0'; // Your API version
    const type = 'news'; // Your type
  
    // Create a new FormData object
    const formData = new FormData();
    formData.append('access_token', accessToken);
    formData.append('app_version', app_version);
    formData.append('category_type', diffType);

    let data= undefined;
  
    // Make the POST request with fetch
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });
  
      // Check if response is successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the JSON response
      data = await response.json();
  
      // Do something with the data
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }





/*:::::::::::::::::::::::::::::Fetching data end:::::::::::::::::::::::::::::::::::*/




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


/*:::::::::::::::::::::::::::::News page start:::::::::::::::::::::::::::::::::::*/

const newsSection = document.querySelector("#news-section");

    document.addEventListener("DOMContentLoaded",fetchData("getProductDetail","news").then((data)=>{
        console.log(data);
        const {return_data} = data;
        const imageArray = return_data[0].product_group;

        newsLoaded= true;

        imageArray.forEach((item,index)=>{
            const newsHtml = `
                <section id="" class="contentdetailsSection" data-contentdetails="${index + 1}">
                    <img src="${item.icon_filename_url}" alt="img" class="mainSectionImg">
                </section>
            `
            newsSection.insertAdjacentHTML("beforeend",newsHtml);
        })
    }));


/*:::::::::::::::::::::::::::::News page end:::::::::::::::::::::::::::::::::::*/



/*:::::::::::::::::::::::::::::Promotion page start:::::::::::::::::::::::::::::::::::*/

const promotionsSection = document.querySelector("#promotions-section");
fetchData("getProductDetail","promotion").then((data)=>{
    console.log(data);
    const {return_data} = data;
    const imageArray = return_data[0].product_group;

    imageArray.forEach((item,index)=>{
        const newsHtml = `
            <section id="" class="contentdetailsSection" data-contentdetails="${index + 1}">
                <img src="${item.icon_filename_url}" alt="img" class="mainSectionImg">
            </section>
        `
        promotionsSection.insertAdjacentHTML("beforeend",newsHtml);
    })

    contentProductFunc();
});


/*:::::::::::::::::::::::::::::Promotion page end:::::::::::::::::::::::::::::::::::*/




/*:::::::::::::::::::::::::::::Footer page start:::::::::::::::::::::::::::::::::::*/

footerIconDivs.forEach((item)=>{

    item.addEventListener("click",(e)=>{
        impFourSections.forEach((item)=>{
            item.style.display="none";
        });
        

        window.scrollTo({
            top: 0,
            left: 0,
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

    })
})

/*::::::::::::::::::::::::::::::::menu Section end:::::::::::::::::::::::::::::::::::::::*/


/*::::::::::::::::::::::::::::::::Product Details Section start:::::::::::::::::::::::::::::::::::::::*/

const productDetailsClose = document.querySelector(".detailsBackBtn");
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




/*::::::::::::::::::::::::::::::::contentProduct Details Section start:::::::::::::::::::::::::::::::::::::::*/

function contentProductFunc(){
    const contentDetails = document.querySelector("#contentDetails");
    const contentDetailsBackBtn = document.querySelector(".contentDetailsBackBtn");
    const contentdetailsSection = document.querySelectorAll(".contentdetailsSection");
    console.log(contentdetailsSection)
    const contentProductImage = document.querySelector(".contentProductImage");

    contentdetailsSection.forEach((item)=>{
        item.addEventListener("click",()=>{
            detailsImage = item.children[0].getAttribute('src');
            contentProductImage.setAttribute("src",detailsImage);

            contentDetails.style.display="block";
        })
    })



    contentDetailsBackBtn.addEventListener("click",()=>{
        contentDetails.style.display="none";
    });
};


/*::::::::::::::::::::::::::::::::contentProduct Details Section end:::::::::::::::::::::::::::::::::::::::*/




/*::::::::::::::::::::::::::::::::Shop Section start:::::::::::::::::::::::::::::::::::::::*/
const shop = document.querySelector("#shop");
fetchData("getShopAddress","promotion").then((data)=>{
    console.log(data);
    const {return_data} = data;
    // const imageArray = return_data[0].product_group;

    return_data.forEach((item,index)=>{
        const newsHtml = `
            <div class="addreses-phoneNo-div first-info-div">
            <h3>${item.name_en}</h3>
            <p>${item.full_address_en}</p>
            <div class="addreses-phoneNo">
                <div class="mobileNo"><a href="tel:${item.tel_no}">${item.tel_no}</a></div>
                <div class="shop-location"><a href="https://www.google.com/maps?q=${item.lat},${item.lon}" target="_blank"><i class="fa-solid fa-location-dot"></i></a></div>
            </div>
            </div>
        `
        shop.insertAdjacentHTML("beforeend",newsHtml);
    })

    contentProductFunc();
});
/*::::::::::::::::::::::::::::::::Shop Section end:::::::::::::::::::::::::::::::::::::::*/





