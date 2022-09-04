let productArray = [];

$(function () {
  $("#products_text").mousemove(function () {
    $("#productsImg").animate({ marginLeft: "20px" }, 1000);
    $("#productsImg").animate({ marginLeft: "0px" }, 1000);
  });
  let nameforCart = $("#nameforCart");
  let phoneforCart = $("#phoneforCart");
  let emailforCart = $("#emailforCart");

  $(".order-modal__form").submit(function (event) {
    event.preventDefault();
    if (
      validateNameForCart() &&
      validatePhoneForCart() &&
      validateEmailForCart()
    ) {
      let self = event.currentTarget;

      let formData = new FormData();
      let name = self.querySelector('[name="nameforCart"]').value;
      let tel = self.querySelector('[name="phoneforCart"]').value;
      let mail = self.querySelector('[name="emailforCart"]').value;
      formData.set("Товары", JSON.stringify(productArray));
      formData.set("Имя", name);
      formData.set("Телефон", tel);
      formData.set("Email", mail);
      formData.set("admin_email[]", "alexandra.mladinova@gmail.com");
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            window.location.href = "products.html";
            console.log("Отправлено");
          }
        }
      };
      xhr.open("POST", "cart.php", true);
      xhr.send(formData);

      self.reset();
      localStorage.removeItem("products");
    }
  });
  function validateNameForCart() {
    $(".text-error").remove();
    let valid_nameForCart = nameforCart.val().length > 10;
    if (!valid_nameForCart) {
      nameforCart.after(
        '<span class="text-error error_nameForCart">Некоректні дані</span>'
      );
      nameforCart.css("border", "2px solid red");
      nameforCart.css("margin-top", "5px");
      $(".error_nameForCart").css("color", "red");
      $(".error_nameForCart").css("font-size", "large");
    } else {
      nameforCart.css("border", "2px solid #41BF3F");
    }
    nameforCart.toggleClass("error", valid_nameForCart);
    return valid_nameForCart;
  }

  function validatePhoneForCart() {
    $(".text-error").remove();

    let templatePhoneForCart = /^[\d\+][\d\(\)\ -]{10,14}\d$/;
    let valid_phoneForCart = templatePhoneForCart.test(phoneforCart.val());
    if (!valid_phoneForCart) {
      phoneforCart.after(
        '<span class="text-error error_phoneForCart">Номер введений некоректно</span>'
      );
      phoneforCart.css("border", "2px solid red");
      phoneforCart.css("margin-top", "5px");
      $(".error_phoneForCart").css("color", "red");
      $(".error_phoneForCart").css("font-size", "large");
    } else {
      phoneforCart.css("border", "2px solid #41BF3F");
    }
    phoneforCart.toggleClass("error", valid_phoneForCart);
    return valid_phoneForCart;
  }

  function validateEmailForCart() {
    $(".text-error").remove();

    let templateEmailForCart = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    let valid_emailForCart = templateEmailForCart.test(emailforCart.val());
    if (!valid_emailForCart) {
      emailforCart.after(
        '<span class="text-error error_emailForCart">Email введений некоректно</span>'
      );
      emailforCart.css("border", "2px solid red");
      emailforCart.css("margin-top", "5px");
      $(".error_emailForCart").css("color", "red");
      $(".error_emailForCart").css("font-size", "large");
    } else {
      emailforCart.css("border", "2px solid #41BF3F");
    }
    emailforCart.toggleClass("error", valid_emailForCart);
    return valid_emailForCart;
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const productsBtn = document.querySelectorAll(".product__btn");
  const cartProductsList = document.querySelector(".cart-content__list");
  const cart = document.querySelector(".cart");
  const cartQuantity = document.querySelector(".cart__quantity");
  const fullPrice = document.querySelector(".fullprice");
  const orderModalOpenProd = document.querySelector(".order-modal__btn");
  const orderModalList = document.querySelector(".order-modal__list");
  let price = 0;
  let randomId = 0;
  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, "");
  };

  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  };

  const plusFullPrice = (currentPrice) => {
    return (price += currentPrice);
  };

  const minusFullPrice = (currentPrice) => {
    return (price -= currentPrice);
  };

  const printQuantity = () => {
    let productsListLength =
      cartProductsList.querySelector(".simplebar-content").children.length;
    cartQuantity.textContent = productsListLength;
    productsListLength > 0
      ? cart.classList.add("activeCart")
      : cart.classList.remove("activeCart");
  };

  const printFullPrice = () => {
    fullPrice.textContent = `${normalPrice(price)} грн`;
  };

  const generateCartProduct = (img, title, price, id) => {
    return `<li class="cart-content__item">
			<article class="cart-content__product cart-product" data-id="${id}">
				<img src="${img}" alt="" class="cart-product__img">
				<div class="cart-product__text">
					<h3 class="cart-product__title">${title}</h3>
					<span class="cart-product__price">${normalPrice(price)}</span>
				</div>
        <button class="cart-product__delete" aria-label="Удалить товар"></button>
			</article>
		</li>`;
  };

  const deleteProducts = (productParent) => {
    let id = productParent.querySelector(".cart-product").dataset.id;
    document
      .querySelector(`.product[data-id="${id}"]`)
      .querySelector(".product__btn").disabled = false;

    let currentPrice = parseInt(
      priceWithoutSpaces(
        productParent.querySelector(".cart-product__price").textContent
      )
    );
    minusFullPrice(currentPrice);
    printFullPrice();
    productParent.remove();

    printQuantity();

    updateStorage();
  };
  productsBtn.forEach((el) => {
    el.closest(".product").setAttribute("data-id", randomId++);

    el.addEventListener("click", (e) => {
      let self = e.currentTarget;
      let parent = self.closest(".product");
      let id = parent.dataset.id;
      let img = parent.querySelector(".image-switch__img");
      let imgRef = img.getAttribute("src");
      let title = parent.querySelector(".product__title").textContent;
      let priceString = priceWithoutSpaces(
        parent.querySelector(".product-price__current").textContent
      );
      let priceNumber = parseInt(
        priceWithoutSpaces(
          parent.querySelector(".product-price__current").textContent
        )
      );

      plusFullPrice(priceNumber);
      printFullPrice();

      let generatedCartProduct = generateCartProduct(
        imgRef,
        title,
        priceString,
        id
      );
      selectedSimplebar = cartProductsList.querySelector(".simplebar-content");
      selectedSimplebar.insertAdjacentHTML("afterbegin", generatedCartProduct);
      printQuantity();

      updateStorage();

      self.disabled = true;
    });
  });
  cartProductsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-product__delete")) {
      deleteProducts(e.target.closest(".cart-content__item"));
    }
  });

  let flag = 0;
  orderModalOpenProd.addEventListener("click", (e) => {
    if (flag == 0) {
      orderModalOpenProd.classList.add("open");
      orderModalList.style.display = "block";
      flag = 1;
    } else {
      orderModalOpenProd.classList.remove("open");
      orderModalList.style.display = "none";
      flag = 0;
    }
  });

  const generateModalProduct = (img, title, price, id) => {
    return `
		<li class="order-modal__item">
			<article class="order-modal__product order-product" data-id="${id}">
				<img src="${img}" alt="" class="order-product__img">
				<div class="order-product__text">
					<h3 class="order-product__title">${title}</h3>
					<span class="order-product__price">${normalPrice(price)}</span>
				</div>
			</article>
		</li>
	`;
  };

  const modalCart = new GraphModal({
    isOpen: (modalCart) => {
      console.log("opened");
      let array = cartProductsList.querySelector(".simplebar-content").children;
      let fullprice = fullPrice.textContent;
      let length = array.length;

      document.querySelector(
        ".order-modal__quantity span"
      ).textContent = `${length} шт`;
      document.querySelector(
        ".order-modal__summ span"
      ).textContent = `${fullprice}`;
      orderModalList.innerHTML = "";
      for (item of array) {
        console.log(item);
        let img = item.querySelector(".cart-product__img").getAttribute("src");
        let title = item.querySelector(".cart-product__title").textContent;
        let priceString = priceWithoutSpaces(
          item.querySelector(".cart-product__price").textContent
        );
        let id = item.querySelector(".cart-product").dataset.id;

        orderModalList.insertAdjacentHTML(
          "afterbegin",
          generateModalProduct(img, title, priceString, id)
        );

        let obj = {};
        obj.title = title;
        obj.price = priceString;
        productArray.push(obj);
      }
    },
    isClose: () => {
      console.log("closed");
    },
  });

  let modal__close = document.getElementsByClassName("modal__close");
  let modal_cart = document.getElementsByClassName(".modalCart");
  modal__close.onclick = function () {
    modal_cart.classList.add("closeModalCart");
  };
  const countSumm = () => {
    document.querySelectorAll(".cart-content__item").forEach((el) => {
      price += parseInt(
        priceWithoutSpaces(el.querySelector(".cart-product__price").textContent)
      );
    });
  };

  const initialState = () => {
    if (localStorage.getItem("products") !== null) {
      cartProductsList.querySelector(".simplebar-content").innerHTML =
        localStorage.getItem("products");
      printQuantity();
      countSumm();
      printFullPrice();
    }
  };
  initialState();
  const updateStorage = () => {
    let parent = cartProductsList.querySelector(".simplebar-content");
    let html = parent.innerHTML;
    html = html.trim();
    if (html.length) {
      localStorage.setItem("products", html);
    } else {
      localStorage.removeItem("products");
    }
  };
});
