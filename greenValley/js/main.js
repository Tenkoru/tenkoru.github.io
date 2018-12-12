(function () {
  'use strict';

  function restTabsHandler() {
    const restBlock = document.querySelector(`.rest`);
    if (restBlock) {
      const restButtonsContainer = restBlock.querySelector(`.rest__tab-buttons`);
      const restButtons = [].slice.call(restButtonsContainer.querySelectorAll(`.rest__button`));
      const restTabsContainer = restBlock.querySelector(`.rest__tabs`);
      const restTabs = [].slice.call(restTabsContainer.querySelectorAll(`.rest__content`));
      const activeButtonClass = `rest__button--active`;
      const buttonClass = `rest__button`;
      const activeTabClass = `rest__content--active`;

      function restButtonsHandler (event) {
        const targetButton = event.target;
        const targetIndex = restButtons.indexOf(targetButton);
        if (event.target.classList.contains(buttonClass)) {
          restButtons.forEach(function(item) {
            item.classList.remove(activeButtonClass);
          });
          restTabs.forEach(function(item) {
            item.classList.remove(activeTabClass);
          });
          event.target.classList.add(activeButtonClass);
          restTabs[targetIndex].classList.add(activeTabClass);
        }
      }

      restButtonsContainer.addEventListener(`click`, restButtonsHandler);
    }
  }

  function mainNavHandler() {
    const mainNav = document.querySelector(`.main-nav`);
    if (mainNav) {
      const mainNavButton = mainNav.querySelector(`.main-nav__button`);
      const mainNavList = mainNav.querySelector(`.main-nav__list`);
      const mainNavListActiveClass = `main-nav__list--active`;

      function mainNavHandler(event) {
        if (mainNavList.classList.contains(mainNavListActiveClass)) {
          mainNavList.classList.remove(mainNavListActiveClass);
        } else {
          mainNavList.classList.add(mainNavListActiveClass);
        }
      }

      mainNavButton.addEventListener(`click`, mainNavHandler);
    }
  }

  let utils = {
    delegation: function (eventTarget, className, parent) {
      while (eventTarget != parent) {
        if (eventTarget.classList.contains(className)) {
          return eventTarget;
        }
        eventTarget = eventTarget.parentNode;
      }
    }
  };

  function formHandler() {
    const formContainer = document.querySelector(`.form`);
    if (formContainer) {
      const placeTypeContainer = formContainer.querySelector(`.place-type`);
      const houseTypeContainer = formContainer.querySelector(`.house-type`);

      function placeTypeHandler(event) {
        const placeTypeItems = [].slice.call(placeTypeContainer.querySelectorAll(`.place-type__type`));
        const placeTypeClass = `place-type__type`;
        const placeTypeActiveClass = `place-type__type--active`;
        const targetElement = utils.delegation(event.target, placeTypeClass, this);

        if (targetElement) {
          placeTypeItems.forEach(function(item) {
            item.classList.remove(placeTypeActiveClass);
            item.querySelector(`.place-type__input`).checked = false;
          });
          targetElement.classList.add(placeTypeActiveClass);
          targetElement.querySelector(`.place-type__input`).checked = true;
        }
      }

      function houseTypeHandler(event) {
        const houseTypeItems = [].slice.call(houseTypeContainer.querySelectorAll(`.house-type__title`));
        const houseTypeClass = `house-type__title`;
        const houseTypeActiveClass = `house-type__title--active`;
        const targetElement = utils.delegation(event.target, houseTypeClass, this);
        const stepContainer = formContainer.querySelector(`.step--3`);
        const featuresArray = [].slice.call(stepContainer.querySelectorAll(`.house-features`));
        const featuresActiveClass = `house-features--active`;

        if (targetElement) {
          const indexOfHouseType = houseTypeItems.indexOf(targetElement);
          houseTypeItems.forEach(function(item) {
            item.classList.remove(houseTypeActiveClass);
            item.querySelector(`.house-type__type`).checked = false;
          });
          featuresArray.forEach(function(item) {
            item.classList.remove(featuresActiveClass);
          });
          targetElement.classList.add(houseTypeActiveClass);
          targetElement.querySelector(`.house-type__type`).checked = true;
          featuresArray[indexOfHouseType].classList.add(featuresActiveClass);
        }
      }

      placeTypeContainer.addEventListener(`click`, placeTypeHandler);
      houseTypeContainer.addEventListener(`click`, houseTypeHandler);
    }
  }

  restTabsHandler();
  mainNavHandler();
  formHandler();

  $(document).ready(function() {
    $('.main-gallery__list').lightSlider({
      gallery: true,
      item: 1,
      loop: true,
      thumbItem: 6,
      slideMargin: 0,
      galleryMargin: 0,
      thumbMargin: 0,
      enableDrag: false,
      speed: 400,
      currentPagerPosition:'middle',
      onSliderLoad: function(el) {
        $('.main-gallery__list').removeClass('cS-hidden');
        el.lightGallery({
          selector: '.main-gallery__list .lslide'
        });
      },
      responsive : [
        {
          breakpoint:768,
          settings: {
            gallery: false,
            pager: false,
            controls: false
          }
        }
      ]
    });

    $('.feedback__items').lightSlider({
      item: 2,
      pager: false,
      adaptiveHeight: true,
      onSliderLoad: function() {
        $('#autoWidth').removeClass('cS-hidden');
      },
      responsive : [
        {
          breakpoint:769,
          settings: {
            item: 1,
            gallery: false,
            pager: false,
            controls: false
          }
        }
      ]
    });

    $('.offers__slider').lightSlider({
      item: 1,
      pager: true,
      adaptiveHeight: true,
      controls: false,
      onAfterSlide: function (el) {
        var index = el.find('.lslide.active').index();
        $('.offers__button').removeClass('offers__button--active');
        $('.offers__button').eq(index).addClass('offers__button--active');
      },
    });

    $('.offers__button').click(function() {
      var $this = $(this);
      var index = $this.index();
      $('.offers__button').removeClass('offers__button--active');
      $this.addClass('offers__button--active');
      $('.offers .lSPager li').eq(index).click();
    });

    $('.room__images').lightSlider({
      item: 1,
      pager: false,
      onSliderLoad: function(el) {
        el.lightGallery({
          selector: '.room__images .lslide'
        });
      },
    });

    $('.steps').validate({
      rules: {
        tel: {
          required: true,
          digits: true
        }
      }
    });
  });

}());

//# sourceMappingURL=main.js.map
