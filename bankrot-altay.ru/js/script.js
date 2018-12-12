$(document).ready(function(){

  /*jq formstyler*/
  (function($) {
    $(function() {
      $('input, select').styler();
       $('input[type="number"]').styler('destroy')
    });
  })(jQuery);

  /*slider */
  $('.our-command__items').owlCarousel({
    items:4,
    smartSpeed: 500,
    loop: true,
    nav: true,
    responsive : {
    0 : {
      items: 1,
      center: true
    },
    480 : {
      items: 2,
    },
    768 : {
      items: 3,
    },
    997 : {
      items: 4,
    },
}
  });

  $('.examples__items').owlCarousel({
    items:2,
    smartSpeed: 500,
    loop: true,
    nav: true,
    mouseDrag: false,
    autoWidth: true,
    margin: 10,
        responsive : {
    0 : {
      items: 1,
      autoWidth: false,
      center: true
    },
    480 : {
      items: 2,
      autoWidth: false,
      margin: 0
    },
    601 : {
      items: 1,
      autoWidth: false,
      margin: 0
    },
    997 : {
      items: 2
    },
}
  });

  $(".examples__photo-big").fancybox({
    type :'iframe',
  });

  /*tabs */
  $('.faq__question-text').on('click', function(event){
  event.preventDefault();
  $(this).closest('.faq__question').toggleClass('active');
})

/* end*/
});





