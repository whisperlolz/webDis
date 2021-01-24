window.addEventListener("DOMContentLoaded", function () {
  ("use strict");

  //Backgroung-color nav
  let nav = document.querySelector("nav");

  window.onscroll = function () {
    if (nav.offsetTop > 100) {
      nav.style.backgroundColor = "#000";
      nav.style.color = "#fff";
    } else {
      nav.style.backgroundColor = "transparent";
      nav.style.color = "#000";
    }
  };

  // MODAL open/close
  let overlay = document.querySelector(".overlay"),
    popupClose = overlay.querySelector(".popup-close"),
    more = document.querySelector(".main-btn");

  more.onclick = function () {
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
  };
  popupClose.onclick = function () {
    overlay.style.display = "none";
    document.body.style.overflow = "";
  };

  // SLIDER

  let slideIndex = 1,
    slides = document.querySelectorAll(".review-item"),
    dotsWrap = document.querySelector(".slider-dots"),
    dots = document.querySelectorAll(".dot");

  showSlides(slideIndex);

  function showSlides(n) {
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    slides.forEach((item) => {
      item.style.display = "none";
    });

    dots.forEach((item) => {
      item.classList.remove("dot-active");
    });

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("dot-active");
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  dotsWrap.onclick = function (event) {
    for (let i = 0; i < dots.length + 1; i++) {
      let target = event.target;
      if (target.classList.contains("dot") && target == dots[i - 1]) {
        currentSlide(i);
      }
    }
  };

  // FORM
  let message = {
    loading: "Loaded...",
    success: "Thank you! We will call you back soon",
    failure: "Oups...",
  };

  let form = document.querySelector(".main-form"),
    statusMessage = document.createElement("div");
  statusMessage.classList.add("status"),
    (contactForm = document.querySelector("#form"));

  function postForm(formName) {
    formName.addEventListener("submit", function (event) {
      event.preventDefault(); // отменяем стандартное обновление страницы при отправке
      formName.appendChild(statusMessage);
      let formData = new FormData(formName);

      function postData(data) {
        return new Promise(function (resolve, reject) {
          let request = new XMLHttpRequest();
          request.open("POST", "server.php");
          // request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");// Заголовок для отправки на PHP
          request.setRequestHeader(
            "Content-type",
            "application/json; charset=utf-8"
          );

          let obj = {};
          formData.forEach(function (value, key) {
            obj[key] = value;
          });

          let json = JSON.stringify(obj);
          request.onreadystatechange = function () {
            if (request.readyState < 4) {
              resolve();
            } else if (request.readyState === 4 && request.status === 200) {
              resolve();
            } else {
              reject();
            }
          };
          request.send(json);
        });
      }
      //function clear input
      function clearInput() {
        for (
          let i = 0;
          i < formName.getElementsByTagName("input").length;
          i++
        ) {
          formName.getElementsByTagName("input")[i].value = "";
        }
      }

      postData(formData)
        .then(() => (statusMessage.innerHTML = message.loading))
        .then(() => (statusMessage.innerHTML = message.success))
        .catch(() => (statusMessage.innerHTML = message.failure))
        .then(clearInput());
    });
  }
  //function clear input

  postForm(form);
  postForm(contactForm);
});
