reRenderDocs();

/*::::::::::::::::::::::::::::::::Profile Section start:::::::::::::::::::::::::::::::::::::::*/

/*::::::::::::::::::::::::::::::::Profile Section end:::::::::::::::::::::::::::::::::::::::*/

function reRenderDocs() {
  const langListLi = document.querySelectorAll(".lang-list li");
  const loginBtn = document.querySelector(".login-btn");
  const logoutBtn = document.querySelector(".logout-btn");
  const mobileNumberForm = document.querySelector(".mobile-number-form");
  const closeMobileForm = document.querySelector(".close-mobile-form");
  const submitPhoneBtn = document.querySelector(".submit-phone-btn");
  const otpSubmitForm = document.querySelector(".otp-submit-form");
  const otpInput = document.querySelector("#otp-input");
  const otpNotValidMessage = document.querySelector(".otpNotValidMessage");
  const userInfo = document.querySelector(".userInfo");
  const loginSignupDiv = document.querySelector(".login-signup-div");
  const logoutConfirm = document.querySelector(".logout-confirm ");
  const logoutConfirmBtns = document.querySelectorAll(
    ".confirm-logout-btns button"
  );
  const generateQrBtn = document.querySelector(".generate-qr-btn");
  const barcodeDiv = document.querySelector(".barcode-div");
  const showPointsSpan = document.querySelector(".show-points span");
  const qrCodeDiv = document.querySelector(".qr-code-div");
  const mobileInvalid = document.querySelector(".mobile-invalid");
  const phoneSignin = document.querySelector("#phone-signin");
  const signupBtn = document.querySelector(".signup-btn");
  const signUpSection = document.querySelector(".sign-up-section");
  const signUpBackBtn = document.querySelector(".sign-up-back-btn");
  const signUpForm = document.querySelector(".sign-up-form");
  const signUpFormBtn = document.querySelector(".sign-up-form button");
  const signUpPhone = document.querySelector(".signUp-phone");
  const userExist = document.querySelector(".userExist");

  langListLi.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (item.textContent.trim() === "English") {
        document.querySelectorAll(".th").forEach((item) => {
          item.classList.remove("display");
        });
        document.querySelectorAll(".th").forEach((item, index) => {
          item.classList.add("noDisplay");
        });

        document.querySelectorAll(".en").forEach((item) => {
          item.classList.remove("noDisplay");
        });
        document.querySelectorAll(".en").forEach((item, index) => {
          item.classList.add("display");
        });
      } else {
        document.querySelectorAll(".en").forEach((item) => {
          item.classList.remove("display");
        });
        document.querySelectorAll(".en").forEach((item, index) => {
          item.classList.add("noDisplay");
        });

        document.querySelectorAll(".th").forEach((item) => {
          item.classList.remove("noDisplay");
        });
        document.querySelectorAll(".th").forEach((item, index) => {
          item.classList.add("display");
        });
      }
    });
  });

  let temproryDataStore = {};
  let temproryOtp = "";
  let phoneNumberValue = "";
  // let phoneNumberSignUp = ""
  let temproryDataStoreLocal = JSON.parse(
    localStorage.getItem("userInfoLogin")
  );
  let getBonousPoints = localStorage.getItem("bonusPoints");
  checkLocalStorage();

  let qrCodeString = localStorage.getItem("qrCodeString");
  qrCodeString && generateQRFunc(qrCodeString);
  console.log(qrCodeString);

  function generateQRFunc(qrCodeString) {
    qrCodeString = localStorage.getItem("qrCodeString");
    console.log(qrCodeString, "developing test");
    new QRCode(qrCodeDiv, {
      text: qrCodeString,
      width: 256,
      height: 256,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    console.log(qrCodeString, "ccccccc");
  }

  generateQrBtn.addEventListener("click", () => {
    phoneNumberValue = localStorage.getItem("mobileNumberSet");
    console.log(phoneNumberValue);
    fetchData("generateBarcode", phoneNumberValue).then((res) => {
      console.log(phoneNumberValue);
      let qrString = res["return_data"][0]["random_barcode"];
      localStorage.setItem("qrCodeString", qrString);
      qrCodeDiv.innerHTML = "";
      generateQRFunc(qrCodeString);
      //let qrString = res["return_data"][0]["random_barcode"];
      // localStorage.setItem("qrCodeString",qrString);
      // localStorage.getItem("qrCodeString") && generateQRFunc(qrString);
      console.log(res);
      barcodeDiv.classList.remove("noDisplay");
    });
  });

  function userInfoFunc() {
    temproryDataStoreLocal = JSON.parse(localStorage.getItem("userInfoLogin"));

    getBonousPoints = localStorage.getItem("bonusPoints");
    userInfo.insertAdjacentHTML(
      "afterbegin",
      `
        <p><span class="info-icons"><i class="fa-solid fa-user"></i></span>${temproryDataStoreLocal.firstName} ${temproryDataStoreLocal.lastName}</p>
        <div class="more-user-info">
        <p><span class="info-icons"><i class="fa-solid fa-phone"></i></span>${temproryDataStoreLocal.username}</p>
        <p><span class="info-icons"><i class="fa-solid fa-envelope"></i></span>${temproryDataStoreLocal.email}</p>
        </div>
    `
    );
    showPointsSpan.innerText = `${getBonousPoints}`;
  }

  function checkLocalStorage() {
    if (temproryDataStoreLocal) {
      console.log(temproryDataStoreLocal);
      loginSignupDiv.classList.add("noDisplay");
      userInfo.classList.remove("noDisplay");
      userInfoFunc();
      barcodeDiv.classList.remove("noDisplay");
      logoutBtn.classList.remove("noDisplay");
    } else {
      logoutBtn.classList.add("noDisplay");
    }
  }

  logoutBtn.addEventListener("click", () => {
    logoutConfirm.classList.remove("noDisplay");
  });

  logoutConfirmBtns.forEach((item) => {
    item.addEventListener("click", () => {
      console.log(item.dataset.logout);
      if (item.dataset.logout == "yes") {
        localStorage.removeItem("userInfoLogin");
        localStorage.removeItem("bonusPoints");
        localStorage.removeItem("qrCodeString");
        localStorage.removeItem("mobileNumberSet");

        qrCodeDiv.innerHTML = "";
        showPointsSpan.innerHTML = "";
        barcodeDiv.classList.add("noDisplay");
        mobileNumberForm.classList.add("noDisplay");
        otpSubmitForm.classList.add("noDisplay");
        phoneSignin.value = "";
        otpInput.value = "";
        logoutConfirm.classList.add("noDisplay");
        loginSignupDiv.classList.remove("noDisplay");
        userInfo.classList.add("noDisplay");
        userInfo.innerHTML = "";
        logoutBtn.classList.add("noDisplay");
      } else {
        logoutConfirm.classList.add("noDisplay");
      }
    });
  });

  mobileNumberForm.addEventListener("submit", (e) => {
    e.preventDefault();
    phoneNumberValue = phoneSignin.value;
    function temporaryFunction(res) {
      console.log(res);
      const { return_data } = res;
      temproryOtp = return_data[0].otp;
      console.log("OTP", temproryOtp);
      temproryDataStore = {
        username: return_data[0].username,
        firstName: return_data[0].first_name,
        lastName: return_data[0].last_name,
        email: return_data[0].email,
      };
      otpSubmitForm.classList.toggle("noDisplay");
      localStorage.setItem("mobileNumberSet", phoneNumberValue);
    }

    if (
      phoneNumberValue != "" &&
      phoneNumberValue.length === 10 &&
      isFinite(phoneNumberValue)
    ) {
      console.log(phoneNumberValue);
      // submitPhoneBtn.disabled = false;
      fetchData("userLoginWithUsername", phoneNumberValue).then((res) => {
        temporaryFunction(res, phoneNumberValue);
      });
    } else {
      // submitPhoneBtn.disabled = true;
      mobileInvalid.classList.add("noDisplay");
    }
  });

  otpSubmitForm.addEventListener("submit", () => {
    if (temproryOtp == otpInput.value) {
      otpNotValidMessage.classList.add("noDisplay");
      //console.log(phoneNumberValue);
      fetchData("generateBarcode", phoneNumberValue).then((res) => {
        console.log(res);
        console.log(res["return_data"][0]["random_barcode"], "barcode");
        let qrString = res["return_data"][0]["random_barcode"];
        localStorage.setItem("bonusPoints", res.return_data[0].bonus);
        localStorage.setItem("qrCodeString", qrString);
        userInfoShow(qrString);
        loginSignupDiv.classList.add("noDisplay");
        userInfo.classList.remove("noDisplay");
        barcodeDiv.classList.remove("noDisplay");
        userInfo.innerHTML = "";

        userInfoFunc();
        logoutBtn.classList.remove("noDisplay");
        // window.location.reload();
      });
    } else {
      otpNotValidMessage.classList.remove("noDisplay");
      e.preventDefault();
    }
  });

  function userInfoShow(qrString) {
    localStorage.setItem("userInfoLogin", JSON.stringify(temproryDataStore));
    checkLocalStorage();
    otpSubmitForm.classList.add("noDisplay");
    mobileNumberForm.classList.add("noDisplay");
    generateQRFunc(qrString);
  }

  loginBtn.addEventListener("click", () => {
    mobileNumberForm.classList.toggle("noDisplay");
  });

  closeMobileForm.addEventListener("click", () => {
    mobileNumberForm.classList.toggle("noDisplay");
  });

  /*::::::::::::::::::::::Sign Up start:::::::::::::::::::::::::: */
  function validatePhoneNumber() {
    // Get and trim phone number input
    const phoneNumber = signUpPhone.value.trim();

    // Regex pattern for 10-digit phone number
    const pattern = /^\d{10}$/;

    // Validate phone number and update message
    const isValid = pattern.test(phoneNumber);
    document.getElementById("phoneValidationMsg").textContent = isValid
      ? ""
      : "Please enter a valid 10-digit phone number.";

    if (!isValid) {
      signUpFormBtn.disabled = true;
    } else {
      signUpFormBtn.disabled = false;
    }
    // Return validation status
    return isValid;
  }

  let formEl = document.forms.BookPackageForm;
  var formData = new FormData(formEl);
  var name = formData.get("firstname");
  // var name = formData.get('la');
  // var name = formData.get('firstname');
  // var name = formData.get('firstname');
  console.log(name);

  function handleSignUpFunction(res) {
    if (res.return_status == "success") {
      console.log(res);
      console.log(res.return_data[0].otp);
      let registerData = res?.return_data[0];
      temproryOtp = registerData.otp;
      phoneNumberValue = registerData.tel_no;
      phoneNumberValue = "0802211925";
      signUpSection.classList.add("noDisplay");
      otpSubmitForm.classList.remove("noDisplay");
      signUpForm.reset();
    } else {
      console.log(res);
      userExist.classList.remove("noDisplay");
    }
  }

  signUpPhone.addEventListener("keyup", validatePhoneNumber);

  signupBtn.addEventListener("click", (e) => {
    signUpSection.classList.remove("noDisplay");
  });

  signUpBackBtn.addEventListener("click", (e) => {
    signUpSection.classList.add("noDisplay");
    signUpForm.reset();
  });

  signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();
    //console.log(e.target);
    let formEl = document.forms.BookPackageForm;
    let formData = new FormData(formEl);
    let firstname = formData.get("firstname");
    let lastname = formData.get("lastname");
    let email = formData.get("email");
    let phone = formData.get("phone");
    let dob = "01-Jan-1990";
    console.log(firstname, lastname, email, phone, dob);
    fetchData("saveUser", "", firstname, lastname, email, phone, dob).then(
      (res) => {
        handleSignUpFunction(res);
      }
    );
  });
  /*:::::::::::::::::::::::::Sign Up end::::::::::::::::::::::: */

  const urlParams = new URLSearchParams(window.location.search);

  const paramValue = urlParams.get("module");

  // Function to fetch data from the API

  async function fetchData(
    diffEndPoints,
    diffType = "",
    firstname = "",
    lastname = "",
    email = "",
    phone = "",
    dob = ""
  ) {
    console.log(firstname, lastname, email, phone, dob);

    const url = `https://app.doichaangcorporate.com/app/api/${diffEndPoints}`; // Replace this with your API endpoint
    const accessToken = "f58acd6bfd116ef3401808fc25220cb5"; // Your access token
    const app_version = "1.0.0"; // Your API version
    // const type = "news"; // Your type

    // Create a new FormData object
    const formData = new FormData();
    formData.append("access_token", accessToken);
    formData.append("app_version", app_version);
    formData.append("category_type", diffType);
    formData.append("username", diffType);
    formData.append("first_name", firstname);
    formData.append("last_name", lastname);
    formData.append("email", email);
    formData.append("mobile", phone);
    formData.append("birth_data", dob);

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
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  /*:::::::::::::::::::::::::::::Fetching data end:::::::::::::::::::::::::::::::::::*/

  const topHeader = document.querySelector(".top-header");
  const footerIconDivs = document.querySelectorAll(".footer-icon");
  const impFourSections = document.querySelectorAll(".impFourSections");

  const contentProductImage = document.querySelector(".contentProductImage");
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

      promotionLoaded = true;
      imageArray.forEach((item, index) => {
        const newsHtml = `
                <section id="" class="contentdetailsSection" data-contentdetails="${
                  index + 1
                }">
                    <img src="${
                      item.icon_filename_url
                    }" alt="img" class="mainSectionImg">

                    <div class="detailsImgDesc">
                      <p class="en">
                        <span class="en">${
                          item.product_item[0].description_en
                        }</span><span class="th">${
          item.product_item[0].description_th
        }</span>
                      </p>
                      <img src="${
                        item.product_item[0].icon_filename_url
                      }" alt="ll">
                    </div>  
                </section>
            `;
        newsSection.insertAdjacentHTML("beforeend", newsHtml);
      });
      contentProductFunc();
      promotionFetch();
    })
  );

  /*:::::::::::::::::::::::::::::News page end:::::::::::::::::::::::::::::::::::*/

  /*:::::::::::::::::::::::::::::Promotion page start:::::::::::::::::::::::::::::::::::*/

  function promotionFetch() {
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
                        <p>
                          <span class="en">${
                            item.product_item[0].description_en
                          }</span>
                          <span class="th">${
                            item.product_item[0].description_th
                          }</span>
                        </p>
                        <img src="${
                          item.product_item[0].icon_filename_url
                        }" alt="ll">
                  </div> 
              </section>
          `;
        promotionsSection.insertAdjacentHTML("beforeend", newsHtml);
      });

      contentProductFunc();
      menuFetch();
    });
  }

  /*:::::::::::::::::::::::::::::Promotion page end:::::::::::::::::::::::::::::::::::*/

  /*:::::::::::::::::::::::::::::Footer page start:::::::::::::::::::::::::::::::::::*/

  if (footerIconDivs[0]) {
    footerIconDivs[0].style.color = "#008DDA";
  }

  footerIconDivs.forEach((item) => {
    item.addEventListener(
      "click",
      (e) => {
        footerIconDivs.forEach((item, index) => {
          item.style.color = "#000";
        });

        item.style.color = "#008DDA";

        impFourSections.forEach((item) => {
          item.style.display = "none";
        });

        window.scrollTo({
          top: 0,
          left: 0,
        });

        let selectedFooterBtnName =
          e.target.closest(".footer-icon").dataset.divname;
        let selectedFooterBtn = document.querySelector(
          `#${selectedFooterBtnName}`
        );
        selectedFooterBtn.style.display = "block";
      },
      true
    );
  });

  impFourSections.forEach((item) => {
    item.style.display = "none";
  });

  footerIconDivs.forEach((item, index) => {
    item.style.color = "#000";
  });

  try {
    let selectFromQuery = document.querySelector(`#${paramValue}`);
    selectFromQuery.style.display = "block";

    footerIconDivs.forEach((item, index) => {
      if (item.dataset.divname == paramValue) {
        item.style.color = "#008DDA";
      }
    });
  } catch (err) {
    let selectFromQuery = document.querySelector("#home");
    selectFromQuery.style.display = "block";
  }

  /*:::::::::::::::::::::::::::::Footer page end:::::::::::::::::::::::::::::::::::*/

  /*::::::::::::::::::::::::::::::::Menu Section start:::::::::::::::::::::::::::::::::::::::*/
  function menuFetch() {
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

        let menuimgDivsHtml =
          `
          <div id="menuimgDiv${indexMain + 1}" class="menuimgDiv">
          <ul class="menuContainer-ul">` +
          `<span class="en">${itemMain.name_en}</span><span class="th">${itemMain.name_th}</span>` +
          itemMain.product_group
            .map((item, index) => {
              return `<li class="en" data-menulistcount='menuContainer${
                indexMain + 1
              }${index + 1}'>${
                item.name_en
              }</li><li class="th" data-menulistcount='menuContainer${
                indexMain + 1
              }${index + 1}'>${item.name_th}</li>`;
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
                                <p class="beverage-name en">${item.name_en}</p>
                                <p class="beverage-name th">${item.name_th}</p>
                                <p class="beverage-description">
                                  <span class="en">${item.description_en}</span>
                                  <span class="th">${item.description_th}</span>
                                </p>
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

        document.querySelectorAll(".th").forEach((item, index) => {
          item.classList.add("noDisplay");
        });

        document.querySelectorAll(".en").forEach((item, index) => {
          item.classList.add("display");
        });

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
        const menuContainerImg =
          document.querySelectorAll(".menuContainer-img");

        menuContainerImg.forEach((item) => {
          item.addEventListener("click", function () {
            contentProductDescPara.innerText = item.children[2].innerText;
            contentProductImage.setAttribute(
              "src",
              this.children[0].getAttribute("src")
            );
            contentDetails.style.display = "block";

            contentDetailsBackBtn.addEventListener("click", () => {
              contentDetails.style.display = "none";
            });
          });
        });

        /*=========================|||||||||||||||||||=========================== */
      });
    });

    shopFetch();
  }

  /*::::::::::::::::::::::::::::::::menu Section end:::::::::::::::::::::::::::::::::::::::*/

  /*::::::::::::::::::::::::::::::::contentProduct Details Section start:::::::::::::::::::::::::::::::::::::::*/

  function contentProductFunc() {
    const contentdetailsSection = document.querySelectorAll(
      ".contentdetailsSection"
    );

    contentdetailsSection.forEach((item) => {
      item.addEventListener("click", () => {
        contentProductDescPara.innerText =
          item.children[1].children[0].innerText;
        contentProductImage.setAttribute(
          "src",
          item.children[1].children[1].getAttribute("src")
        );
        contentDetails.style.display = "block";
      });
    });

    contentDetailsBackBtn.addEventListener("click", () => {
      contentDetails.style.display = "none";
    });
  }

  /*::::::::::::::::::::::::::::::::contentProduct Details Section end:::::::::::::::::::::::::::::::::::::::*/

  /*::::::::::::::::::::::::::::::::Shop Section start:::::::::::::::::::::::::::::::::::::::*/
  function shopFetch() {
    const shop = document.querySelector("#shop");
    fetchData("getShopAddress", "promotion").then((data) => {
      const { return_data } = data;
      return_data.forEach((item, index) => {
        const newsHtml = `
            <div class="addreses-phoneNo-div first-info-div">
            <h3 class="en">${item.name_en}</h3>
            <h3 class="th">${item.name_th}</h3>
            <p class="en">${item.full_address_en}</p>
            <p class="th">${item.full_address_th}</p>
            <div class="addreses-phoneNo">
                <div class="mobileNo"><a href="tel:${item.tel_no}">${item.tel_no}</a></div>
                <div class="shop-location"><a href="https://www.google.com/maps?q=${item.lat},${item.lon}" target="_blank"><i class="fa-solid fa-location-dot"></i></a></div>
            </div>
            </div>
        `;
        shop.insertAdjacentHTML("beforeend", newsHtml);
      });

      contentProductFunc();
      document.querySelectorAll(".th").forEach((item, index) => {
        item.classList.add("noDisplay");
      });
    });
  }

  /*::::::::::::::::::::::::::::::::Shop Section end:::::::::::::::::::::::::::::::::::::::*/
}
