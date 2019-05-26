$(document).ready(function(){

  $('input, select').styler();

  $('.products__items--recommend').owlCarousel({
    items:2,
    smartSpeed: 500,
    margin: 38,
    nav: true,
    loop: true,
    dots: false,
    autoplay: true,
    responsive : {
      0 : {
        items:1,
        center: true
      },
      600 : {
        items: 2,
        margin: 10
      },
      1024 : {
        items: 2,
        margin: 38
      },
      1920 : {
        items: 3,
        margin: 115
      }
    }
  });


  $('.products__filter').on('click', '.products__filter-item ', function() {
    $(this).toggleClass('active').siblings().removeClass('active');
  });

  function changeSlider(numOfSlide) {
      $('.hero__tab').removeClass('hero__tab--active');
      $('.hero__tab-button').removeClass('hero__tab-button--active');
      $('.hero__tab').eq(numOfSlide).addClass('hero__tab--active');
      $('.hero__tab-button').eq(numOfSlide).addClass('hero__tab-button--active');
    }
  $('.hero__tab-buttons').on('click', '.hero__tab-button', function() {
    var curIndex = $(this).index();
    changeSlider(curIndex);
  })
  $('.hero__tab-controls').on('click', '.hero__tab-arrow', function() {
    var currentSlideIndex = $('.hero__tab--active').index();
    if ($(this).hasClass('hero__tab-arrow--left')) {
      if (currentSlideIndex === 0) {
        currentSlideIndex = $('.hero__tab').length - 1;
      } else {
        currentSlideIndex--;
      }
    } else {
      if (currentSlideIndex === $('.hero__tab').length - 1) {
        currentSlideIndex = 0;
      } else {
        currentSlideIndex++;
      }
    }
    changeSlider(currentSlideIndex);
  });
  $('.side-menu').on('click', '.side-menu__select, .side-menu__item', function(event) {
    $('.side-menu__list').toggleClass('side-menu__list--active');
    if ($(event.target).hasClass('side-menu__link')) {
      $('.side-menu__item').removeClass('side-menu__item--active');
      $(this).addClass('side-menu__item--active');
      $('.side-menu__select').text($(this).text());
    }
  })
  $('.page-header__top').on('click', '.page-header__burger', function(event) {
    $(this).toggleClass('page-header__burger--active');
    $('.page-header__nav').toggleClass('page-header__nav--active');
  })
  $('.page-header__top').on('click', '.page-header__search-btn, .page-header__top-close-search', function(event) {
    $('.page-header__top-form').toggleClass('page-header__top-form--active');
  })
  function calcHeight() {
    if (window.matchMedia('(max-width: 1023px)').matches) {
      $('.page-header__top').removeClass('page-header__top--wide');
    } else if (window.matchMedia('(min-width: 1024px) and (max-width: 1100px)').matches) {
      $('.page-header__top').addClass('page-header__top--wide');
    } else if (window.matchMedia('(min-width: 1101px)').matches) {
      $('.page-header__top').removeClass('page-header__top--wide');
    }

  }
  calcHeight();
  $(window).on('resize', calcHeight);
});





