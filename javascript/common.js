$(function () {
  setTimeout(function () {
    $("body").addClass("loaded");
  }, 2000);
  $("#nav-menu").click(function () {
    $("ul#list_menu").addClass("nav-open").slideToggle("300");
  });

  $("#datepicker").datepicker();
  $("#datepicker").datepicker("option", "showAnim", "clip");

  let name = $("#user_name");
  let phone = $("#user_phone");
  let email = $("#user_email");
  let date = $("#datepicker");

  $("form").submit(function (event) {
    if (
      !validateName() ||
      !validatePhone() ||
      !validateEmail() ||
      !validateDate()
    ) {
      event.preventDefault();
    }
  });
  function validateName() {
    $(".text-error").remove();
    let valid_name = name.val().length > 10;
    if (!valid_name) {
      name.before('<span class="text-error error_name">Некоректні дані</span>');
      name.css("border", "2px solid red");
      name.css("margin-top", "5px");
      $(".error_name").css("color", "red");
      $(".error_name").css("font-size", "large");
    } else {
      name.css("border", "2px solid #41BF3F");
    }
    name.toggleClass("error", valid_name);
    return valid_name;
  }

  function validatePhone() {
    $(".text-error").remove();

    let templatePhone = /^[\d\+][\d\(\)\ -]{10,14}\d$/;
    let valid_phone = templatePhone.test(phone.val());
    if (!valid_phone) {
      phone.before(
        '<span class="text-error error_phone">Номер введений некоректно</span>'
      );
      phone.css("border", "2px solid red");
      phone.css("margin-top", "5px");
      $(".error_phone").css("color", "red");
      $(".error_phone").css("font-size", "large");
    } else {
      phone.css("border", "2px solid #41BF3F");
    }
    phone.toggleClass("error", valid_phone);
    return valid_phone;
  }

  function validateEmail() {
    $(".text-error").remove();

    let templateEmail = /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i;
    let valid_email = templateEmail.test(email.val());
    if (!valid_email) {
      email.before(
        '<span class="text-error error_email">Email введений некоректно</span>'
      );
      email.css("border", "2px solid red");
      email.css("margin-top", "5px");
      $(".error_email").css("color", "red");
      $(".error_email").css("font-size", "large");
    } else {
      email.css("border", "2px solid #41BF3F");
    }
    email.toggleClass("error", valid_email);
    return valid_email;
  }
  function validateDate() {
    $(".text-error").remove();
    let valid_date = date.val() != "";
    if (!valid_date) {
      date.before('<span class="text-error error_date">Некоректні дані</span>');
      date.css("border", "2px solid red");
      date.css("margin-top", "5px");
      $(".error_date").css("color", "red");
      $(".error_date").css("font-size", "large");
    } else {
      date.css("border", "2px solid #41BF3F");
    }
    date.toggleClass("error", valid_date);
    return valid_date;
  }
});

function AddAppointmentModal() {
  let open_modal = document.querySelectorAll(".open_modal");
  let close_modal = document.getElementById("close_modal");
  let modal = document.getElementById("modal");
  let body = document.getElementsByTagName("body")[0];
  for (let i = 0; i < open_modal.length; i++) {
    open_modal[i].onclick = function () {
      modal.classList.add("modal_vis");
      body.classList.add("body_block");
    };
  }
  close_modal.onclick = function () {
    window.setTimeout(function () {
      modal.classList.remove("modal_vis");
      body.classList.remove("body_block");
    }, 500);
  };
}

AddAppointmentModal();
