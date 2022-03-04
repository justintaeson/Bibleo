var $newButton = document.querySelector('#new-button');
$newButton.addEventListener('click', generatePage);

var $homePage = document.querySelector('#home-page');
var $generatePage = document.querySelector('#generate-page');

function generatePage(event) {
  $homePage.className = 'hidden';
  $generatePage.className = 'container flex-wrap align-content-center';
  data.view = 'generate-page';
  getVerse();
}

function getVerse() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://labs.bible.org/api/?passage=random&type=json');
  xhr.send();
  xhr.addEventListener('load', function () {
    var response = JSON.parse(xhr.response);
    var $li = document.createElement('li');
    var $h3 = document.createElement('h3');
    var $p = document.createElement('p');
    $p.className = 'verse';

    var $ul = document.querySelector('ul');
    $ul.appendChild($li);
    $li.appendChild($h3);
    $h3.textContent = response[0].bookname + ' ' + response[0].chapter + ':' + response[0].verse;
    $h3.appendChild($p);
    $p.textContent = '"' + response[0].text + '" ';

  });
}

var $regenerateVerse = document.querySelector('#regenerate-button');
$regenerateVerse.addEventListener('click', regenerateVerse);

function regenerateVerse(event) {
  var $ul = document.querySelector('ul');
  var $li = document.querySelector('li');
  if ($ul.hasChildNodes() === true) {
    $ul.removeChild($li);
  }
  getVerse();
}

var $homeLink = document.querySelector('#home-link');
$homeLink.addEventListener('click', showHome);
function showHome(event) {
  data.view = 'home-page';
  var $ul = document.querySelector('ul');
  while ($ul.firstChild) {
    $ul.removeChild($ul.firstChild);
  }
  viewSwapper();
}

var $generateLink = document.querySelector('#generate-link');
$generateLink.addEventListener('click', showGenerate);
function showGenerate(event) {
  if (data.view === 'home-page') {
    getVerse();
  }
  data.view = 'generate-page';
  viewSwapper();
}

var $searchPage = document.querySelector('#search-page');
var $searchLink = document.querySelector('#search-link');
$searchLink.addEventListener('click', showSearch);
function showSearch(event) {
  data.view = 'search-page';
  viewSwapper();
}

function viewSwapper() {
  if (data.view === 'home-page') {
    $generatePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $homePage.className = 'container';
  } else if (data.view === 'generate-page') {
    $homePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $generatePage.className = 'container flex-wrap align-content-center';
  } else if (data.view === 'search-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'hidden';
    $searchPage.className = 'container flex-wrap align-content-center';
  }
}

var $searchBar = document.querySelector('#search-bar');
var $form = document.querySelector('form');
$form.addEventListener('submit', searchVerse);

function searchVerse(event) {
  event.preventDefault();
  data.view = 'generate-page';
  viewSwapper();
  var $ul = document.querySelector('ul');
  while ($ul.firstChild) {
    $ul.removeChild($ul.firstChild);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://bible-api.com/' + $searchBar.value);
  xhr.send();
  xhr.addEventListener('load', function () {
    var response = JSON.parse(xhr.response);

    var $li = document.createElement('li');
    var $h3 = document.createElement('h3');
    var $p = document.createElement('p');
    $p.className = 'verse';

    var $ul = document.querySelector('ul');
    $ul.appendChild($li);
    $li.appendChild($h3);
    $h3.textContent = response.reference;
    $h3.appendChild($p);
    $p.textContent = '"' + response.text + '" ';

    $form.reset();
  });
}
