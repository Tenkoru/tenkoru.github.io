'use strict';

var servicesContentLeft = document.querySelector(".services-content-left");
var listOfServicesContentLeftButtons = servicesContentLeft.querySelectorAll("li");

var servicesContentRight = document.querySelector(".services-content-right");
var listOfServicesContentRight = document.querySelectorAll(".services-content-right-item");

servicesContentLeft.addEventListener('click', function(event) {
  if (event.target.tagName === 'LI') {
    listOfServicesContentLeftButtons.forEach(function(item) {
      item.classList.remove("services-content-left-active");
    });
    var keyWord = event.target.className;
    event.target.classList.add("services-content-left-active");
    listOfServicesContentRight.forEach(function(item) {
      item.classList.remove("services-content-right-item--active");
    });
    var servicesContentRightTarget = servicesContentRight.querySelector("." + keyWord);
    servicesContentRightTarget.classList.add("services-content-right-item--active");
  }
})