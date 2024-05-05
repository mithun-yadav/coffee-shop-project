let languageChange1 = true;

reRenderDocs(languageChange1=true);

/*::::::::::::::::::::::::::::::::Profile Section start:::::::::::::::::::::::::::::::::::::::*/
  const langListLi = document.querySelectorAll(".lang-list li");
  console.log(langListLi)
  langListLi.forEach((item,index)=>{
    item.addEventListener("click",()=>{
      console.log(item.textContent)
      if(item.textContent === "English"){
        console.log("mmmm");
      }
      else{
        console.log("yyyy");
      }
    })
  });
  /*::::::::::::::::::::::::::::::::Profile Section end:::::::::::::::::::::::::::::::::::::::*/

function reRenderDocs(languageChange) {
  //console.log(languageChange)
  // Function to fetch data from the API
  async function fetchData(diffEndPoints, diffType) {
    const url = `https://app.doichaangcorporate.com/app/api/${diffEndPoints}`; // Replace this with your API endpoint
    const accessToken = "f58acd6bfd116ef3401808fc25220cb5"; // Your access token
    const app_version = "1.0.0"; // Your API version
    const type = "news"; // Your type

    // Create a new FormData object
    const formData = new FormData();
    formData.append("access_token", accessToken);
    formData.append("app_version", app_version);
    formData.append("category_type", diffType);

    let data = undefined;

    // Make the POST request with fetch
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      data = await response.json();

      // Do something with the data
      console.log(data)
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  /*:::::::::::::::::::::::::::::Fetching data end:::::::::::::::::::::::::::::::::::*/

  const topHeader = document.querySelector(".top-header");
  const footerIconDivs = document.querySelectorAll(".footer-icon");
  const impFourSections = document.querySelectorAll(".impFourSections");


  const contentProductImage = document.querySelector(
    ".contentProductImage"
  );
  const contentDetails = document.querySelector("#contentDetails");

  const contentDetailsBackBtn = document.querySelector(
    ".contentDetailsBackBtn"
  );
  const contentProductDescPara = document.querySelector(
    ".contentProductDesc p"
  );

  /*:::::::::::::::::::::::::::::Home page start:::::::::::::::::::::::::::::::::::*/

  let homeAllSection = document.querySelectorAll(".homePage");

  topHeader.addEventListener("click", (e) => {
    let tabName = e.target.innerText;
    tabName == "NEWS"
      ? document.documentElement.style.setProperty("--tabChangeAnime", "50%")
      : document.documentElement.style.setProperty("--tabChangeAnime", "0");

    homeAllSection.forEach((item) => {
      item.style.display = "none";
    });

    let homeSelectedSection = document.querySelector(
      `#${tabName.toLowerCase()}-section`
    );
    homeSelectedSection.style.display = "flex";
    window.scrollTo({
      top: 0,
      left: 0,
    });
  });

  /*:::::::::::::::::::::::::::::Home page end:::::::::::::::::::::::::::::::::::*/

  /*:::::::::::::::::::::::::::::News page start:::::::::::::::::::::::::::::::::::*/

  const newsSection = document.querySelector("#news-section");

  document.addEventListener(
    "DOMContentLoaded",
    fetchData("getProductDetail", "news").then((data) => {
      const { return_data } = data;
      const imageArray = return_data[0].product_group;

      newsLoaded = true;

      imageArray.forEach((item, index) => {
        const newsHtml = `
                <section id="" class="contentdetailsSection" data-contentdetails="${
                  index + 1
                }">
                    <img src="${
                      item.icon_filename_url
                    }" alt="img" class="mainSectionImg">

                    <div class="detailsImgDesc">
                      <p>${
                        languageChange
                          ? item.product_item[0].description_en
                          : item.product_item[0].description_th
                      }</p>
                      <img src="${
                        item.product_item[0].icon_filename_url
                      }" alt="ll">
                    </div>  
                </section>
            `;
        newsSection.insertAdjacentHTML("beforeend", newsHtml);
      });
      contentProductFunc();
    })
  );

  /*:::::::::::::::::::::::::::::News page end:::::::::::::::::::::::::::::::::::*/

  /*:::::::::::::::::::::::::::::Promotion page start:::::::::::::::::::::::::::::::::::*/

  const promotionsSection = document.querySelector("#promotions-section");
  fetchData("getProductDetail", "promotion").then((data) => {
    const { return_data } = data;
    const imageArray = return_data[0].product_group;

    imageArray.forEach((item, index) => {
      const newsHtml = `
            <section id="" class="contentdetailsSection" data-contentdetails="${
              index + 1
            }">
                <img src="${
                  item.icon_filename_url
                }" alt="img" class="mainSectionImg">

                <div class="detailsImgDesc">
                      <p>${
                        languageChange
                          ? item.product_item[0].description_en
                          : item.product_item[0].description_th
                      }</p>
                      <img src="${
                        item.product_item[0].icon_filename_url
                      }" alt="ll">
                </div> 
            </section>
        `;
      promotionsSection.insertAdjacentHTML("beforeend", newsHtml);
    });

    contentProductFunc();
  });

  /*:::::::::::::::::::::::::::::Promotion page end:::::::::::::::::::::::::::::::::::*/

  /*:::::::::::::::::::::::::::::Footer page start:::::::::::::::::::::::::::::::::::*/

  footerIconDivs.forEach((item) => {
    item.addEventListener(
      "click",
      (e) => {

        footerIconDivs.forEach((item,index)=>{
          item.childNodes.forEach((item,index)=>{
            item.style.color="#000";
          });
        })


        item.childNodes.forEach((item,index)=>{
          item.style.color="#008DDA";
        });

        impFourSections.forEach((item) => {
          item.style.display = "none";
        });

        window.scrollTo({
          top: 0,
          left: 0,
        });

        let selectedFooterBtnName = e.target.dataset.divname;
        let selectedFooterBtn = document.querySelector(
          `#${selectedFooterBtnName}`
        );
        selectedFooterBtn.style.display = "block";
      },
      true
    );
  });
  /*:::::::::::::::::::::::::::::Footer page end:::::::::::::::::::::::::::::::::::*/

  /*::::::::::::::::::::::::::::::::Menu Section start:::::::::::::::::::::::::::::::::::::::*/
  const scrollMenu = document.querySelector(".scroll-menu");
  const allMenusContainer = document.querySelector(".allMenusContainer");

  let menuIds = undefined;

 
    fetchData("getProductDetail", "product").then((data) => {
      const { return_data } = data;
  
      return_data.forEach((itemMain, indexMain) => {                                                                                                                                                
        let scrollElement = `
          <div class="scroll-image" data-menuimg="menuimgDiv${indexMain + 1}">
          <img src="${itemMain.icon_filename_url}" alt="img">
          </div>
      `;
        scrollMenu.insertAdjacentHTML("beforeend", scrollElement);
  
        //::::::::::::::::::::::===========||||||||||||||||||||||===========:::::::::::::::::::::::::://
  
        const scrollImage = document.querySelectorAll(".scroll-image");
        //console.log(itemMain);
  
        let menuimgDivsHtml =
          `
          <div id="menuimgDiv${indexMain + 1}" class="menuimgDiv">
          <ul class="menuContainer-ul">` +
          `<span>${languageChange ? itemMain.name_en : itemMain.name_th}</span>`+
          itemMain.product_group
            .map((item, index) => {
              return `<li data-menulistcount='menuContainer${indexMain + 1}${
                index + 1
              }'>${languageChange ? item.name_en : item.name_th}</li>`;
            })
            .join(" ") +
          `</ul>
  
          
          <div  id="menuContainer${indexMain + 1}">` +
          itemMain.product_group
            .map((item1, index) => {
              return (
                `<div class="menuContainer" id="menuContainer${indexMain + 1}${
                  index + 1
                }">` +
                item1.product_item
                  .map((item, index) => {
                    return `
                            <div class="menuContainer-img">
                                <img src="${item.icon_filename_url}" alt="img">
                                <p class="beverage-name">${
                                  languageChange ? item.name_en : item.name_th
                                }</p>
                                <p class="beverage-description">${
                                  languageChange
                                    ? item.description_en
                                    : item.description_th
                                }</p>
                            </div>
                            `;
                  })
                  .join(" ") +
                `</div>`
              );
            })
            .join(" ") +
          `</div>
          </div>
          `;
  
        allMenusContainer.insertAdjacentHTML("beforeend", menuimgDivsHtml);
  
        const menuimgDiv = document.querySelectorAll(".menuimgDiv");
  
        menuimgDiv.forEach((item) => {
          item.style.display = "none";
        });
  
        menuimgDiv[0].style.display = "grid";
  
        //:::::::::::::::::::::::::::::==========||||||||||||||||==========:::::::::::::::::::::::://
  
        const menuContainerSelect = document.querySelectorAll(
          "#menuContainer1 .menuContainer"
        );
        menuContainerSelect.forEach((item) => {
          item.style.display = "none";
        });
        menuContainerSelect[0].style.display = "grid";
  
        //:::::::::::::::::::::::::::::==========||||||||||||||||==========:::::::::::::::::::::::://
  
        const menuContainerUlLi = document.querySelectorAll(
          ".menuContainer-ul li"
        );
        const menuContainer = document.querySelectorAll(".menuContainer");
  
        menuContainerUlLi.forEach((item) => {
          item.addEventListener("click", (e) => {
            menuContainer.forEach((item) => {
              item.style.display = "none";
            });
  
            let menuContainerClass = item.dataset.menulistcount;
  
            let selectedMenuContainer = document.querySelector(
              `#${menuContainerClass}`
            );
            selectedMenuContainer.style.display = "grid";
          });
        });
  
        //:::::::::::::::::::::::::::::=========|||||||||||||||||===========:::::::::::::::::::::::://
  
        scrollImage.forEach((item, index) => {
          item.addEventListener("click", (e) => {
            menuimgDiv.forEach((item) => {
              item.style.display = "none";
            });
  
            menuIds = item.dataset.menuimg;
            let singleMenuDiv = document.querySelector(`#${menuIds}`);
            singleMenuDiv.style.display = "block";
  
            const menuContainerFirst = document.querySelector(`#${menuIds}`);
  
            [...menuContainerFirst.children[1].children].forEach((item) => {
              item.style.display = "none";
            });
  
            let magicValue = menuContainerFirst.children[1].children[0];
            magicValue.style.display = "grid";
          });
        });
  
        /*=========================|||||||||||||||||||=========================== */
        const menuContainerImg = document.querySelectorAll(".menuContainer-img");
  
        menuContainerImg.forEach((item) => {
       
          item.addEventListener("click", function () {
  
            contentProductDescPara.innerText = item.children[2].innerText;
            contentProductImage.setAttribute("src", this.children[0].getAttribute("src"));
            contentDetails.style.display = "block";
  
            contentDetailsBackBtn.addEventListener("click", () => {
              contentDetails.style.display = "none";
            });
          });
        });
  
        /*=========================|||||||||||||||||||=========================== */
      });
    });


  /*::::::::::::::::::::::::::::::::menu Section end:::::::::::::::::::::::::::::::::::::::*/

  /*::::::::::::::::::::::::::::::::contentProduct Details Section start:::::::::::::::::::::::::::::::::::::::*/

  function contentProductFunc() {

    const contentdetailsSection = document.querySelectorAll(
      ".contentdetailsSection"
    );

    contentdetailsSection.forEach((item) => {
      item.addEventListener("click", () => {
        contentProductDescPara.innerText = item.children[1].children[0].innerText;
        contentProductImage.setAttribute("src", item.children[1].children[1].getAttribute("src"));
        contentDetails.style.display = "block";
      });
    });

    contentDetailsBackBtn.addEventListener("click", () => {
      contentDetails.style.display = "none";
    });
  }

  /*::::::::::::::::::::::::::::::::contentProduct Details Section end:::::::::::::::::::::::::::::::::::::::*/

  /*::::::::::::::::::::::::::::::::Shop Section start:::::::::::::::::::::::::::::::::::::::*/
  const shop = document.querySelector("#shop");
  fetchData("getShopAddress", "promotion").then((data) => {
    const { return_data } = data;
    return_data.forEach((item, index) => {
      const newsHtml = `
            <div class="addreses-phoneNo-div first-info-div">
            <h3>${languageChange ? item.name_en : item.name_th}</h3>
            <p>${
              languageChange ? item.full_address_en : item.full_address_th
            }</p>
            <div class="addreses-phoneNo">
                <div class="mobileNo"><a href="tel:${item.tel_no}">${
        item.tel_no
      }</a></div>
                <div class="shop-location"><a href="https://www.google.com/maps?q=${
                  item.lat
                },${
        item.lon
      }" target="_blank"><i class="fa-solid fa-location-dot"></i></a></div>
            </div>
            </div>
        `;
      shop.insertAdjacentHTML("beforeend", newsHtml);
    });

    contentProductFunc();
  });
  /*::::::::::::::::::::::::::::::::Shop Section end:::::::::::::::::::::::::::::::::::::::*/
}