$(function () {
  function SetAllDisplayNone() {
    $("#hair_coloring_cost").css("display", "none");
    $("#hair_procedure_cost").css("display", "none");
    $("#laser_cost").css("display", "none");
    $("#sugaring_cost").css("display", "none");
    $("#haircut_cost").css("display", "none");
  }
  function DisplayCurrent(element) {
    $(element).css("display", "grid");
    $(element).css("grid-template-columns", "1fr 1fr");
  }
  $("#price_text").mousemove(function () {
    $("#priceImg").animate({ marginLeft: "20px" }, 1000);
    $("#priceImg").animate({ marginLeft: "0px" }, 1000);
  });
  $("#name1").click(function () {
    SetAllDisplayNone();
    DisplayCurrent("#haircut_cost");
  });
  $("#name2").click(function () {
    SetAllDisplayNone();
    DisplayCurrent("#hair_procedure_cost");
  });
  $("#name3").click(function () {
    SetAllDisplayNone();
    DisplayCurrent("#hair_coloring_cost");
  });
  $("#name4").click(function () {
    SetAllDisplayNone();
    DisplayCurrent("#laser_cost");
  });
  $("#name5").click(function () {
    SetAllDisplayNone();
    DisplayCurrent("#sugaring_cost");
  });
});

function SeedData() {
  let prices = [
    new Price("price1", 150, true),
    new Price("price2", 200, true),
    new Price("price3", 350, true),
    new Price("price4", 400, true),
    new Price("price5", 800, false),
    new Price("price6", 1200, false),
    new Price("price7", 1400, false),
    new Price("price8", 1500, false),
    new Price("price9", 750, false),
    new Price("price10", 1500, false),
    new Price("price11", 2000, false),
    new Price("price12", 2200, false),
    new Price("price13", 650, true),
    new Price("price14", 1200, true),
    new Price("price15", 350, true),
    new Price("price16", 450, true),
    new Price("price17", 300, true),
    new Price("price18", 100, true),
    new Price("price19", 350, true),
    new Price("price20", 200, true),
  ];
  return prices;
}

let procedure_names = document.getElementById("procedure_names");
let slide = procedure_names.getElementsByClassName("slide");
for (let i = 0; i < slide.length; i++) {
  slide[i].addEventListener("click", function () {
    let active = document.getElementsByClassName("active");
    active[0].className = active[0].className.replace(" active", "");
    this.className += " active";
  });
}

let request;
if (window.XMLHttpRequest) {
  request = new XMLHttpRequest();
} else {
  request = new ActiveXObject("Microsoft.XMLHTTP");
}

request.open(
  "GET",
  "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
);
request.onload = function () {
  if (request.status == 200) {
    let prices = SeedData();
    console.log(request.response);
    allResponse = JSON.parse(request.response);
    prices.forEach((price) => {
      price.SetPriceToElement(allResponse[0].sale);
    });
  }
};
request.send();

class Price {
  constructor(elementId, price, isFixed) {
    this.elementId = elementId;
    this.price = price;
    this.isFixed = isFixed;
  }

  SetPriceToElement(rate) {
    if (this.isFixed) {
      document.getElementById(this.elementId).innerText =
        this.price + " грн / " + (this.price / +rate).toFixed(1) + "$";
    } else {
      document.getElementById(this.elementId).innerText =
        "від " + this.price + " грн / " + (this.price / +rate).toFixed(1) + "$";
    }
  }
}
