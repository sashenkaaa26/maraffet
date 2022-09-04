$(function () {
  $("#reviews_text").mousemove(function () {
    $("#reviewsImg").animate({ marginLeft: "20px" }, 1000);
    $("#reviewsImg").animate({ marginLeft: "0px" }, 1000);
  });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlide() {
  showSlides((slideIndex += 1));
}

function minusSlide() {
  showSlides((slideIndex -= 1));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("item");
  let dots = document.getElementsByClassName("slider-dots_item");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

function startComm() {
  let form = document.forms.addCommentForm;
  let name = form.elements.user_comment_name.value;
  let comment = form.elements.user_comment.value;

  createCommentElement(name, comment);
  form.reset();
}

function createCommentElement(name, comment) {
  let nameElement = document.createElement("h4");
  nameElement.style.fontWeight = "bold";
  nameElement.textContent = name;

  let dateElement = document.createElement("p");
  dateElement.style.marginTop = "20px";
  dateElement.style.marginBottom = "10px";
  dateElement.style.color = "white";

  let today = new Date();
  let day = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();
  dateElement.textContent = `${day}.${month}.${year}`;

  let commentElement = document.createElement("p");
  commentElement.textContent = comment;

  let slider = document.getElementById("slider");
  let items = slider.querySelectorAll(".item");
  let last_item = items[items.length - 1];
  let last_item_item_blocks = last_item.querySelectorAll("#item_blocks");
  let last_testimonial =
    last_item_item_blocks[last_item_item_blocks.length - 1].querySelectorAll(
      "#testimonials"
    );

  if (last_testimonial.length == 3) {
    AddNewItem(slider, nameElement, dateElement, commentElement);
  } else {
    AddTestimonialToItemBlock(
      last_item_item_blocks[last_item_item_blocks.length - 1],
      nameElement,
      dateElement,
      commentElement
    );
  }
}

function AddNewItem(slider, nameElement, dateElement, commentElement) {
  let item = document.createElement("div");
  item.setAttribute("class", "item");
  item.style.display = "none";
  slider.appendChild(item);
  let item_blocks = document.createElement("div");
  item_blocks.setAttribute("id", "item_blocks");
  let testimonal = document.createElement("div");
  testimonal.setAttribute("id", "testimonials");
  let slide_text = document.createElement("div");
  slide_text.setAttribute("class", "slideText");

  item.appendChild(item_blocks);
  AddTestimonialToItemBlock(
    item_blocks,
    nameElement,
    dateElement,
    commentElement
  );
}

function AddTestimonialToItemBlock(
  itemBlock,
  nameElement,
  dateElement,
  commentElement
) {
  let testimonal = document.createElement("div");
  testimonal.setAttribute("id", "testimonials");
  let slide_text = document.createElement("div");
  slide_text.setAttribute("class", "slideText");

  itemBlock.appendChild(testimonal);
  testimonal.appendChild(slide_text);
  slide_text.appendChild(nameElement);
  slide_text.appendChild(dateElement);
  slide_text.appendChild(commentElement);
}
