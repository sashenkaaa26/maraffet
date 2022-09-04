$(function () {
  $("#contacts_container").mousemove(function () {
    $("#contactsImg").animate({ marginLeft: "20px" }, 1000);
    $("#contactsImg").animate({ marginLeft: "0px" }, 1000);
  });
});
