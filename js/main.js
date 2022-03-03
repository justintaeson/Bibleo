var $newButton = document.querySelector('#new-button');
$newButton.addEventListener('click', generatePage);

var $homePage = document.querySelector('#home-page');
var $generatePage = document.querySelector('#generate-page');

function generatePage(event) {
  if (data.view === 'home-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'container';
    data.view = 'generate-page';
  } else if (data.view === 'generate-page') {
    document.createElement('li');
  }
}

function getVerse() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.scripture.api.bible/v1/bibles/66c22495370cdfc0-01/books');
  xhr.setRequestHeader('api-key', 'f1390b6091f5f3451d5251d499968db3');
  xhr.responseType = 'json';
  xhr.send();
}

getVerse();
