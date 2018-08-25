'use strict';

var heroSlider = document.querySelector('.hero-header__slider'); /*контейнер со всем*/
var sliderItems = [].slice.call(heroSlider.querySelectorAll('.hero-header__item')); /*массив с слайдами*/
var dotsContainer = heroSlider.querySelector('.hero-header__dots'); /*контейнер с точками*/
var dots = [].slice.call(dotsContainer.querySelectorAll('.hero-header__dot')); /*массив с точками*/
var arrowsContainer = heroSlider.querySelector('.hero-header__arrows'); /*контейнер с стрелками*/
var loader = document.querySelector('.configs__loader');

function getConfig() {
  var container = document.querySelector('.configs__table');
  var templateHtml = '<div class="configs__table-row"><div class="column column--big"><div class="configs__name">Процессор</div><div class="column__text configs__processor">Intel Xeon E5-1650v4 3.6 ГГц</div></div><div class="column column--middle"><div class="configs__name">Жесткий диск</div><div class="column__text configs__hdd">512 ГБ</div></div><div class="column column--middle"><div class="configs__name">Память</div><div class="column__text configs__memory">512 ГБ</div></div><div class="column column--large"><div class="configs__name">Цена</div><div class="column__text configs__price">12 000 ₽/мес.</div></div><div class="column column--small"><a class="btn" href="https://selectel.ru/ " target="_blank">Заказать</a></div></div>';

  var template = document.createElement('div');
  var xhr = new XMLHttpRequest();
  var URL = 'https://api.jsonbin.io/b/5b683d097b212953678c03dd';
  template.innerHTML = templateHtml;
  template = template.firstElementChild;
  xhr.open('GET', URL, true);
  xhr.send();

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    loader.classList.add('configs__loader--hidden');
    if (xhr.status == 200) {
      var serverResponse = xhr.responseText;
      var serverJsonParsed = JSON.parse(serverResponse);
      renderConfig(serverJsonParsed);
    } else {
      var error = document.createElement('div');
      error.classList.add('errorMessage');
      error.textContent = "Ошибка соединения";
      container.appendChild(error);
    }
  }

  function renderConfig(configData) {
    const fragment = document.createDocumentFragment();
    configData.forEach(function(item) {
      const element = template.cloneNode(true);
      const processor = element.querySelector('.configs__processor');
      const hdd = element.querySelector('.configs__hdd');
      const memory = element.querySelector('.configs__memory');
      const price = element.querySelector('.configs__price');
      processor.textContent = item.cpu;
      hdd.textContent = item.hdd + ' ГБ';
      memory.textContent = item.ram + ' ГБ';
      price.textContent = item.price / 100 + ' ₽/мес.';
      fragment.appendChild(element);
    });
    container.appendChild(fragment);
  }
}

function heroSwipeHandler(event) { /*функция свайпа*/
  var startCoordX = event.changedTouches[0].clientX;

  function swipeEndHandler(e) { /*срабатывает когда свайп закончен*/
    var endCoordX = e.changedTouches[0].clientX;
    handleSwipe(endCoordX);
    this.removeEventListener('touchend', swipeEndHandler);
  }

  function handleSwipe(endCoordX) { /*сравнивает начальную координату и конечную*/
    if (startCoordX < endCoordX) {
      sliderHandler(true);
    } else if (startCoordX > endCoordX) {
      sliderHandler();
    }
  }
  this.addEventListener('touchend', swipeEndHandler);
}

function arrowsClickHandler(event) { /*обработчик клика по стрелкам*/
  if (event.target.classList.contains('hero-header__arrow')) {
    if (event.target.classList.contains('hero-header__arrow--right')) {
      sliderHandler();
    } else if (event.target.classList.contains('hero-header__arrow--left')) {
      sliderHandler(true);
    }
  }
}
function dotsClickHandler(event) { /*обработчик клика по точкам*/
  if (event.target.classList.contains('hero-header__dot')) {
    var currentIndex = dots.indexOf(event.target);
    sliderItems.forEach(function(item) {
      item.classList.remove('hero-header__item--active');
    });
    changeSliderAndDots(currentIndex);
  }
}

function changeSliderAndDots(index) { /*меняет слайдер и точки*/
  sliderItems[index].classList.add('hero-header__item--active');
  changeDots(index);
}

function delegationHelper(target, className, parent) { /*делегатор вечности*/
  while (target != parent) {
    if (target.classList.contains(className)) {
      return target;
    }
    target = target.parentNode;
  }
}

function changeDots(index) { /*меняет точки*/
  dots.forEach(function(item) {
    item.classList.remove('hero-header__dot--active');
  });
  dots[index].classList.add('hero-header__dot--active');
}

function getSliderIndex() { /*узнает индекс активного слайда*/
  var currentSlideIndex;
    sliderItems.forEach(function(item, index) {
      if (item.classList.contains('hero-header__item--active')) {
        currentSlideIndex = index;
      }
      item.classList.remove('hero-header__item--active');
    });
    return currentSlideIndex;
  }

function sliderHandler(backward) { /*смещает слайд вперед или назад*/
  var currentSlideIndex = getSliderIndex();

  function changeSlider(backward) {
    if (backward) {
      currentSlideIndex -= 1;
    } else {
      currentSlideIndex += 1;
    }
  }

  function checkForBounds() { /*проверяет не вышел ли индекс за пределы массива*/
    if (currentSlideIndex === sliderItems.length) {
      currentSlideIndex = 0;
    } else if (currentSlideIndex === -1) {
      currentSlideIndex = sliderItems.length - 1;
    }
  }

  changeSlider(backward);
  checkForBounds();
  changeSliderAndDots(currentSlideIndex);
}
getConfig();
setInterval(sliderHandler, 5000); /*интервал для автопереключения*/
dotsContainer.addEventListener('click', dotsClickHandler);
arrowsContainer.addEventListener('click', arrowsClickHandler);
heroSlider.addEventListener('touchstart', heroSwipeHandler);