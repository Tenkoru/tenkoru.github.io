"use strict";
const mobileStatus = window.matchMedia("(max-width: 1000px)").matches;
const greetingList = document.querySelector(".devices-list");
const scenarios = document.querySelector(".scenarios");
const scenariosContent = scenarios.querySelector(".scenarios__content");
const scenariosList = scenariosContent.querySelector(".scenarios-list");
const scenariosPagination = scenarios.querySelector(".scenarios__pagination");
const scenariosNextBtn = scenariosPagination.querySelector(".pagination__button--next");
const scenariosPrevBtn = scenariosPagination.querySelector(".pagination__button--prev");
const mainNav = document.querySelector(".main-nav");
const mainNavBtn = mainNav.querySelector(".main-nav__button");
const mainNavList = mainNav.querySelector(".main-nav__list");
const devicesBlock = document.querySelector(".devices");
const devicesFilterBtn = devicesBlock.querySelector(".devices__filter-button");
const devicesFilterList = devicesBlock.querySelector(".devices__filter");
const devicesList = devicesBlock.querySelector(".devices-list");
const devicesListItem = devicesList.querySelector(".devices-list__item");
const devicesPagination = devicesBlock.querySelector(".devices__pagination");
const devicesPaginationNextBtn = devicesPagination.querySelector(".pagination__button--next");
const devicesPaginationPrevBtn = devicesPagination.querySelector(".pagination__button--prev");
const popupRadial = document.querySelector(".popup--radial");
const popupTemperature = document.querySelector(".popup--temperature");
const popupLight = document.querySelector(".popup--light");
const radialOutter = popupRadial.querySelector('.radial__outter');

function radialHandler(e) {
  e.preventDefault();
  const radialArrow = radialOutter.querySelector('.radial__arrow');
  const arrowPostitons = {
    startMin: -135,
    startMax: -180,
    endMin: -180,
    endMax: -225
  }
  function moveList(e) {
    const currentCoordX = e.changedTouches[0].pageX;
    const currentCoordY = e.changedTouches[0].pageY;
    const centerX = (this.offsetWidth / 2) + this.getBoundingClientRect().left;
    const centerY = (this.offsetHeight / 2) + this.getBoundingClientRect().top;
    const deltaY =  centerY - currentCoordY;
    const deltaX = centerX - currentCoordX;
    let calculatedArrowPosition = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    calculatedArrowPosition -= 90;

    if (calculatedArrowPosition < arrowPostitons.startMin && calculatedArrowPosition > arrowPostitons.startMax) {
      calculatedArrowPosition = arrowPostitons.startMin;
    };
    if (calculatedArrowPosition < arrowPostitons.endMin && calculatedArrowPosition > arrowPostitons.endMax) {
      calculatedArrowPosition = arrowPostitons.endMax;
    };
    radialArrow.style.transform = 'rotate(' + (calculatedArrowPosition - 90) + 'deg) translate(435%) rotate(180deg)';
  }

  this.addEventListener("touchmove", moveList);
  this.addEventListener("touchend", function() {
    this.removeEventListener("touchmove", moveList);
  })
}

function animatePopupFilter(e) {
  const startCoord = e.changedTouches[0].pageX;
  const startMargin = parseInt(window.getComputedStyle(this).marginLeft);
  const popup = this.parentNode;
  const popupPaddingLeft = parseInt(window.getComputedStyle(popup).paddingLeft);
  const popupPaddingRight = parseInt(window.getComputedStyle(popup).paddingRight);
  const popupWidth = popup.offsetWidth;
  const popupInnerWidth = popupWidth - popupPaddingLeft - popupPaddingRight;
  const listWidht = parseInt(window.getComputedStyle(this).width);
  const minMargin = 0;
  let maxMargin = -(listWidht - popupInnerWidth);
  if (maxMargin > 0) {maxMargin = 0};

  function moveList() {
    const currentCoord = event.changedTouches[0].pageX;
    let calculatedMargin = startMargin + (currentCoord - startCoord);
    if (calculatedMargin > minMargin) {calculatedMargin = minMargin};
    if (calculatedMargin < maxMargin) {calculatedMargin = maxMargin} ;
    this.style.marginLeft = calculatedMargin + "px";
  }

  this.addEventListener("touchmove", moveList);
  this.addEventListener("touchend", function() {
    this.removeEventListener("touchmove", moveList);
  })
}

function changePopupFilter(e) {
  const targetClassList = e.target.classList;
  if (targetClassList.contains("filter__button")) {
    const allFilters = [].slice.call(this.querySelectorAll(".filter__button"));
    allFilters.forEach(function(item) {
      item.classList.remove("filter__button--active");
    });
    targetClassList.add("filter__button--active");
    devicesFilterList.classList.remove("devices__filter--active");
  }
}

function rangeHandler(e) {
  e.preventDefault();
  const popupTemperature = this.parentNode.parentNode.querySelector(".popup__temperature");
  let rangeSize = this.parentNode.offsetWidth;
  let controllerSize = this.offsetWidth;
  let startCoord = e.changedTouches[0].pageX;
  let startPostition = parseInt(window.getComputedStyle(this).left);
  if (mobileStatus) {
    rangeSize = this.parentNode.offsetHeight;
    controllerSize = this.offsetHeight;
    startCoord = e.changedTouches[0].pageY;
    startPostition = parseInt(window.getComputedStyle(this).top);
  }
  const minPostion = 0;
  const maxPosition = (rangeSize - controllerSize);
  const onePercentPixel = 40 / maxPosition;

  function moveList(event) {
    let currentCoord = event.changedTouches[0].pageX;
    if (mobileStatus) {
      currentCoord = event.changedTouches[0].pageY;
    }
    let calculatedWidth = startPostition + (currentCoord - startCoord);
    if (calculatedWidth > maxPosition) {calculatedWidth = maxPosition};
    if (calculatedWidth < minPostion) {calculatedWidth = minPostion};
    if (mobileStatus) {
      this.style.top = calculatedWidth + "px";
    } else {
      this.style.left = calculatedWidth + "px";
    }
    if (popupTemperature) {
       const resultTemperature = parseInt(calculatedWidth * onePercentPixel) - 10;
       popupTemperature.textContent = resultTemperature > 0 ? "+" + resultTemperature : resultTemperature;
    }
  }

  this.addEventListener("touchmove", moveList);
  this.addEventListener("touchend", function() {
    this.removeEventListener("touchmove", moveList);
  })
}

function popupFilter(e) {
  const listItem = e.target;
  function popupHandler(popup) {
    popup.classList.add("popup--active");
    popupCloser(popup);
    popup.addEventListener("click", changePopupFilter);
    const popupFilter = popup.querySelector(".popup__filter");
    const popupRangeController = popup.querySelector(".range__controller");
    if (popupRangeController) {
      popupRangeController.addEventListener("touchstart", rangeHandler);
    }
    if (popupFilter) {
      popupFilter.addEventListener("touchstart", animatePopupFilter);
    }
  }

  if (delegationHelper(listItem, "devices-list__item", this)) {
    if (delegationHelper(listItem, "device--light", this)) {
      popupHandler(popupLight);
    } else if (delegationHelper(listItem, "device--temperature", this)) {
      popupHandler(popupTemperature);
    } else if (delegationHelper(listItem, "device--radial", this)) {
      radialOutter.addEventListener('touchstart', radialHandler);
      popupHandler(popupRadial);
    }
    toggleOverlay();
  }
}

function delegationHelper(target, className, parent) {
  while (target != parent) {
    if (target.classList.contains(className)) {
      return target;
    }
    target = target.parentNode;
  }
}

function popupCloser(popup) {
  function popupButtonHandler(e) {
    if (e.target.classList.contains("popup__button")) {
      this.classList.remove("popup--active");
      toggleOverlay();
      popup.removeEventListener("click", popupButtonHandler);
    }
  }
  popup.addEventListener("click", popupButtonHandler);
}

function toggleOverlay() {
  const wrapper = document.querySelector(".wrapper");
  const overlay = document.querySelector(".overlay");
  wrapper.classList.toggle("wrapper--overlay");
  overlay.classList.toggle("overlay--active");
}

function favoriteDevicesHandler(e) {
  if(!e.detail || e.detail == 1) {
    const numOfItems = devicesList.childElementCount;
    const startMargin = parseInt(window.getComputedStyle(devicesList).marginLeft);
    const listStyle = window.getComputedStyle(devicesList);
    const listItemStyle = window.getComputedStyle(devicesListItem);
    const listItemWidth = devicesListItem.offsetWidth;
    const listItemMarginRight = parseInt(listItemStyle.marginRight);
    const listItemOffsetWidth = listItemWidth + listItemMarginRight;
    const pageWidth = listItemOffsetWidth * 6;
    const targetClassList = e.target.classList;

    function paginationCheck() {
      const maxMargin = Math.floor(numOfItems / 6) * pageWidth;
      if (parseInt(listStyle.marginLeft) > -pageWidth) {
        devicesPaginationPrevBtn.classList.remove("pagination__button--active");
        devicesList.style.marginLeft = 0 + "px";
      } else {
        devicesPaginationPrevBtn.classList.add("pagination__button--active");
      }

      if (parseInt(listStyle.marginLeft) < -maxMargin - -pageWidth) {
        devicesPaginationNextBtn.classList.remove("pagination__button--active");
        devicesPaginationPrevBtn.classList.add("pagination__button--active");
        devicesList.style.marginLeft = -maxMargin + "px";
      } else {
        devicesPaginationNextBtn.classList.add("pagination__button--active");
      }
    }

    if (targetClassList.contains("pagination__button--active")) {
      if (targetClassList.contains("pagination__button--next")) {
        devicesList.style.marginLeft = startMargin + (-pageWidth) + "px";
      } else if (targetClassList.contains("pagination__button--prev")) {
        devicesList.style.marginLeft = startMargin + (pageWidth) + "px";
      }
      setTimeout(paginationCheck, 500);
    }
  }
}

function scenariousPaginationHandler(e) {
  if(!e.detail || e.detail == 1) {
    const targetClassList = e.target.classList;
    const contentStyle = window.getComputedStyle(scenariosContent);
    const startMargin = parseInt(contentStyle.marginLeft);
    const listWidth = scenariosList.offsetWidth;
    const listMarginRight = parseInt(window.getComputedStyle(scenariosList).marginRight);
    const listOffsetWidth = listWidth + listMarginRight;

    function paginationCheck() {
      const scenariosListsNum = scenariosContent.childElementCount;
      const contentMaxMargin = listOffsetWidth * (scenariosListsNum - 1);
      if (parseInt(contentStyle.marginLeft) > -listOffsetWidth) {
        scenariosPrevBtn.classList.remove("pagination__button--active");
        scenariosContent.style.marginLeft = 0 + "px";
        paginationCheckList();
      } else {
        scenariosPrevBtn.classList.add("pagination__button--active");
      }
      if (parseInt(contentStyle.marginLeft) < -contentMaxMargin - -listOffsetWidth) {
        scenariosNextBtn.classList.remove("pagination__button--active");
        scenariosPrevBtn.classList.add("pagination__button--active");
        scenariosContent.style.marginLeft = -contentMaxMargin + "px";
      } else {
        scenariosNextBtn.classList.add("pagination__button--active");
      }
    }

    if (targetClassList.contains("pagination__button--active")) {
      if (targetClassList.contains("pagination__button--next")) {
        scenariosContent.style.marginLeft = startMargin + -(listOffsetWidth) + "px";
      } else if (targetClassList.contains("pagination__button--prev")) {
        scenariosContent.style.marginLeft = startMargin + (listOffsetWidth) + "px";
      }
      setTimeout(paginationCheck, 500);
    }
  }
}

function paginationCheckList() {
  const scenariosListsNum = scenariosContent.childElementCount;
  if (scenariosListsNum > 1) {
    scenariosNextBtn.classList.add("pagination__button--active");
  }
  if (parseInt(window.getComputedStyle(devicesList).width) > 1290) {
    devicesPaginationNextBtn.classList.add("pagination__button--active");
  }
};

function animateListDesktop() {
  function animateGreetingList(e) {
    const startCoord = event.changedTouches[0].pageY;
    const startMargin = parseInt(window.getComputedStyle(this).marginTop);
    const minMargin = 20;
    const maxMargin = (this.childElementCount * -135) + 285;

    function moveList() {
      const currentCoord = event.changedTouches[0].pageY;
      let calculatedMargin = startMargin + (currentCoord - startCoord);
      if (calculatedMargin > minMargin) {calculatedMargin = minMargin};
      if (calculatedMargin < maxMargin) {calculatedMargin = maxMargin} ;
      this.style.marginTop = calculatedMargin + "px";
    }

    this.addEventListener("touchmove", moveList);
    this.addEventListener("touchend", function() {
      this.removeEventListener("touchmove", moveList);
    })
  }
  paginationCheckList();
  greetingList.addEventListener("touchstart", animateGreetingList);
  devicesPagination.addEventListener("click", favoriteDevicesHandler);
  mainNavBtn.addEventListener("click", mainNavHandler);
  scenariosPagination.addEventListener("click", scenariousPaginationHandler);
}

function devicesFilterHandler(e) {
  devicesFilterList.classList.toggle("devices__filter--active");
}

function changeFilter(e) {
  const targetClassList = e.target.classList;
  if (targetClassList.contains("filter__button")) {
    const targetValue = e.target.textContent;
    const allFilters = [].slice.call(devicesFilterList.querySelectorAll(".filter__button"));
    allFilters.forEach(function(item) {
      item.classList.remove("filter__button--active");
    });
    targetClassList.add("filter__button--active");
    devicesFilterBtn.textContent = targetValue;
    devicesFilterList.classList.remove("devices__filter--active");
  }
}

function mainNavHandler(e) {
  mainNavList.classList.toggle("main-nav__list--active");
}

function animateListMobile() {
  function animateHorizontal(e) {
    const startCoord = event.changedTouches[0].pageX;
    const startMargin = parseInt(window.getComputedStyle(this).marginLeft);
    const minMargin = 20;
    const maxMargin = (this.childElementCount * -215) + 230;

    function moveList() {
      const currentCoord = event.changedTouches[0].pageX;
      let calculatedMargin = startMargin + (currentCoord - startCoord);
      if (calculatedMargin > minMargin) {calculatedMargin = minMargin};
      if (calculatedMargin < maxMargin) {calculatedMargin = maxMargin} ;
      this.style.marginLeft = calculatedMargin + "px";
    }

    this.addEventListener("touchmove", moveList);
    this.addEventListener("touchend", function() {
      this.removeEventListener("touchmove", moveList);
    })
  }
  function animateDevicesList(e) {
    const startCoord = event.changedTouches[0].pageX;
    const startMargin = parseInt(window.getComputedStyle(this).marginLeft);
    const minMargin = 0;
    const maxMargin = (this.childElementCount * -215) + 210;

    function moveList() {
      const currentCoord = event.changedTouches[0].pageX;
      let calculatedMargin = startMargin + (currentCoord - startCoord);
      if (calculatedMargin > minMargin) {calculatedMargin = minMargin};
      if (calculatedMargin < maxMargin) {calculatedMargin = maxMargin} ;
      this.style.marginLeft = calculatedMargin + "px";
    }

    this.addEventListener("touchmove", moveList);
    this.addEventListener("touchend", function() {
      this.removeEventListener("touchmove", moveList);
    })
  }

  function animateScenariousList(e) {
    const scenariousPages = [].slice.call(scenariosContent.querySelectorAll(".scenarios-list"));
    let scenariousItemsNum = 0;
    scenariousPages.forEach(function(item) {
      scenariousItemsNum += item.childElementCount;
    })
    const startCoord = event.changedTouches[0].pageX;
    const startMargin = parseInt(window.getComputedStyle(this).marginLeft);
    const minMargin = 0;
    const maxMargin = (scenariousItemsNum * -215) + scenariousPages.length * -15 + 225;

    function moveList() {
      const currentCoord = event.changedTouches[0].pageX;
      let calculatedMargin = startMargin + (currentCoord - startCoord);
      if (calculatedMargin > minMargin) {calculatedMargin = minMargin};
      if (calculatedMargin < maxMargin) {calculatedMargin = maxMargin} ;
      this.style.marginLeft = calculatedMargin + "px";
    }

    this.addEventListener("touchmove", moveList);
    this.addEventListener("touchend", function() {
      this.removeEventListener("touchmove", moveList);
    })
  }
  paginationCheckList();
  mainNav.addEventListener("click", mainNavHandler);
  devicesFilterBtn.addEventListener("click", devicesFilterHandler);
  greetingList.addEventListener("touchstart", animateHorizontal);
  scenariosContent.addEventListener("touchstart", animateScenariousList);
  devicesList.addEventListener("touchstart", animateDevicesList);
}

devicesFilterList.addEventListener("click", changeFilter);
devicesList.addEventListener("click", popupFilter);

if (mobileStatus) {
  animateListMobile();
} else {
  animateListDesktop();
}



