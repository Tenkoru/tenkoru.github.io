$(document).ready(function(){

  /*jq formstyler*/
  (function($) {
    $(function() {
      $('input, select').styler()
    });
  })(jQuery);

    /*мобильный хедер */
  $(".mobile-header__phone-icon").click(function() {
  $('.mobile-header__phone-toggled').toggle();
  });
$(document).on('click', function(e) {
  if (!$(e.target).closest(".mobile-header__phone").length) {
    $('.mobile-header__phone-toggled').hide();
  }
  e.stopPropagation();
});


$(".mobile-header__search-icon").click(function() {
  $('.mobile-header__search-toggled').toggle();
  });

$(document).on('click', function(e) {
  if (!$(e.target).closest(".mobile-header__search").length) {
    $('.mobile-header__search-toggled').hide();
  }
  e.stopPropagation();
});

$(".toggler").click(function (e) {
  $(this).toggleClass('toggler--close');
  $('.mobile-header__nav').toggle();
  });

  $(document).on('click', function(e) {
  if (!$(e.target).closest(".mobile-header__menu").length) {
    $('.mobile-header__nav').hide();
    $('.toggler').removeClass('toggler--close');

  }
  e.stopPropagation();
});


/*slider */

$(".slider__inner").owlCarousel({
    items:2,
    smartSpeed: 500,
    loop: true,
    nav: true,
    autoWidth: true,
    margin: 30,
    mouseDrag: false,
    autoplay: true
  });

  /*отражение */
  $('.slider__inner .projects__item').each(function() {
    var par = $(this).closest('.owl-item');
    $(this).clone().addClass('projects__item--gradient').appendTo(par);
  });

  /*calc */

  $(".calculator__view-photo").click(function (e) {
     $(".calculator__view-item").removeClass('checked');
     $(this).closest(".calculator__view-item").toggleClass('checked');
  });

    $(".calculator__type-photo").click(function (e) {
     $(".calculator__type-item").removeClass('checked');
     $(this).closest(".calculator__type-item").toggleClass('checked');
  });

    /*table */
     $(".table0, .table1, .table2").wrap("<div class='table__container'></div>");

    (function($){
        $(window).on("load",function(){
            $(".table__container").mCustomScrollbar({
               axis:"x",
               setWidth: true
            });
        });
    })(jQuery);


  /*accordion */
  $('.faq__name').on('click', function(){
  $(this).closest('.faq__item').toggleClass('active');
})




/* end*/
});





