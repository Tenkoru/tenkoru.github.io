var loginPopupBtn = document.querySelector(".login");
var mapPopupBtn = document.querySelector(".map-modal-btn");
var loginPopup = document.querySelector(".login-popup");
var loginPopupClose = loginPopup.querySelector(".login-popup-close");
var mapPopup = document.querySelector(".modal-content-map");
var mapPopupClose = mapPopup.querySelector(".modal-content-close");
var overlay = document.querySelector(".modal-overlay");
var loginForm = loginPopup.querySelector(".login-form");
var login = loginPopup.querySelector("[name=login]");
var password = loginPopup.querySelector("[name=password]");
var storage = localStorage.getItem("login");

loginPopupBtn.addEventListener("click", function(event) {
	event.preventDefault();
	overlay.classList.add("shown");
	loginPopup.classList.add("login-popup-show");
  if (storage) {
    login.value = storage;
    password.focus();
  } else {
    login.focus();
  }
})

overlay.addEventListener("click", function(event) {
  loginPopup.classList.remove("login-popup-show");
  mapPopup.classList.remove("shown");
  overlay.classList.remove("shown");
})

loginPopupClose.addEventListener("click", function(event) {
  event.preventDefault();
  loginPopup.classList.remove("login-popup-show");
  overlay.classList.remove("shown");
})

mapPopupClose.addEventListener("click", function(event) {
  event.preventDefault();
  mapPopup.classList.remove("shown");
  overlay.classList.remove("shown");
})

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    overlay.classList.remove("shown");
    loginPopup.classList.remove("login-popup-show");
    loginPopup.classList.remove("login-error");
  }
})

loginForm.addEventListener("submit", function(event) {
  if (!login.value || !password.value) {
    event.preventDefault();
    loginPopup.classList.add("login-error");
    
  } else {
    if (!storage) {
      localStorage.setItem("login", login.value);
    }
  }
})

mapPopupBtn.addEventListener("click", function(event) {
  event.preventDefault();
  mapPopup.classList.add("shown");
  overlay.classList.add("shown");
})

