window.onload = function () {
  let video = document.querySelector("video");
  video.addEventListener("timeupdate", function () {
    localStorage.setItem("currentTime", video.currentTime);
  });
  if (localStorage.currentTime) {
    video.currentTime = localStorage.currentTime;
  }
};
let bodyAboutUs = document.getElementsByTagName("body")[0];

function openModal() {
  document.getElementById("myModal").style.display = "block";
  bodyAboutUs.classList.add("body_block");
}

function closeModal() {
  document.getElementById("myModal").style.display = "none";
  bodyAboutUs.classList.remove("body_block");
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
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
  captionText.innerHTML = dots[slideIndex - 1].alt;
}
