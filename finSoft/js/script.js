'use strict';
var xhr = new XMLHttpRequest();
var URL = '/js/data.json';

function getConfig() {
  var container = document.querySelector('.table');

  xhr.open('GET', URL, true);
  xhr.send();

  function renderTable(data, tableContext) {
    var templateContainer = container.querySelector(tableContext);
    var template = templateContainer.querySelector('.table__row');
    var rowFragment = document.createDocumentFragment();
    var totalAmount = 0;

    data.forEach(function(item) {
      var element = template.cloneNode(true);
      var tableCount = element.querySelector('.table__values--count');
      var tableTotal = element.querySelector('.table__values--total');
      var tableAmount = element.querySelector('.table__values--amount');
      var tablePrice = element.querySelector('.table__values--price');
      tableCount.textContent = item.numberOfOrders;
      tablePrice.textContent = item.price;
      tableAmount.textContent = item.quantity;
      tableTotal.textContent = totalAmount += item.quantity;
      rowFragment.appendChild(element);
    })
    if (template.parentNode) {
      template.parentNode.removeChild(template);
    }
    templateContainer.appendChild(rowFragment);
    setTableHeight();
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState != 4) return;
    if (xhr.status == 200) {
      var serverResponse = xhr.responseText;
      var serverJsonParsed = JSON.parse(serverResponse);
      renderTable(serverJsonParsed.asks, '.table__rows--asks');
      renderTable(serverJsonParsed.bids, '.table__rows--bids');
    } else {
      console.log('Ошибка соединения');
    }
  }
}

function setTableHeight() {
  var tableRowsContainer = document.querySelector(".table__rows-container");
  tableRowsContainer.style.height = getViewportHeight() - 150 + 'px';
}

function getViewportHeight() {
  if(window.innerWidth !== undefined && window.innerHeight !== undefined) {
    var windowHeight = window.innerHeight;
  } else {
    var windowHeight = document.documentElement.clientHeight;
  }
  return windowHeight;
}

getConfig();
