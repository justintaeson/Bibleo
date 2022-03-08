var $newButton = document.querySelector('#new-button');
$newButton.addEventListener('click', generatePage);

var $homePage = document.querySelector('#home-page');
var $generatePage = document.querySelector('#generate-page');
var $journalPage = document.querySelector('#journal-page');
var $editPage = document.querySelector('#edit-page');

function generatePage(event) {
  $homePage.className = 'hidden';
  $generatePage.className = 'container flex-wrap align-content-center';
  data.view = 'generate-page';
  getVerse();
}

// randomizes a verse to the user
function getVerse() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://labs.bible.org/api/?passage=random&type=json');
  xhr.send();
  xhr.addEventListener('load', function () {
    var response = JSON.parse(xhr.response);
    var $li = document.createElement('li');
    var $h3 = document.createElement('h3');
    $h3.id = 'verse-title';
    var $p = document.createElement('p');
    $p.id = 'verse';

    var $ul = document.querySelector('ul');
    $ul.appendChild($li);
    $li.appendChild($h3);
    $h3.textContent = response[0].bookname + ' ' + response[0].chapter + ':' + response[0].verse;
    $li.appendChild($p);
    $p.textContent = '"' + response[0].text + '" ';

  });
}

// regenerates a verse whenever the user was already given a verse or searched for a verse
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

// universal function to view swap whenver needed
function viewSwapper() {
  if (data.view === 'home-page') {
    $generatePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $journalPage.className = 'hidden';
    $homePage.className = 'container';
  } else if (data.view === 'generate-page') {
    $homePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $journalPage.className = 'hidden';
    $generatePage.className = 'container flex-wrap align-content-center';
  } else if (data.view === 'search-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'hidden';
    $journalPage.className = 'hidden';
    $searchPage.className = 'container flex-wrap align-content-center';
  } else if (data.view === 'journal-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $journalPage.className = 'container flex-wrap';
  } else if (data.view === 'edit-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $journalPage.className = 'hidden';
    $editPage.className = 'container flex-wrap';

  }
}

// allows the user to search for a specific verse
var $searchBar = document.querySelector('#search-bar');
var $form = document.querySelector('#search-form');
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
    $h3.id = 'verse-title';
    var $p = document.createElement('p');
    $p.id = 'verse';

    var $ul = document.querySelector('ul');
    $ul.appendChild($li);
    $li.appendChild($h3);
    $h3.textContent = response.reference;
    $li.appendChild($p);
    $p.textContent = '"' + response.text + '" ';

    $form.reset();
  });
}

// function that sets the link of 'continue reading' to the verse you searched for or received whenever you click on it
var $continueReading = document.querySelector('#continue-reading');
$continueReading.addEventListener('click', function (event) {
  var $verseTitle = document.getElementById('verse-title').textContent;
  $continueReading.setAttribute('href', 'https://www.biblegateway.com/passage/?search=' + $verseTitle + '&version=WEB');
});

// clicking save and creating the DOM tree for that verse
var $saveButton = document.querySelector('#save-button');
$saveButton.addEventListener('click', saveVerse);

function saveVerse(event) {
  var $ul = document.querySelector('#saved-entries');

  var $li = document.createElement('li');
  var $verseDiv = document.createElement('div');
  var $verseP = document.createElement('p');
  var $entryDiv = document.createElement('div');
  var $newEntryButton = document.createElement('button');

  $ul.appendChild($li);
  $li.appendChild($verseDiv);
  $li.appendChild($entryDiv);
  $verseDiv.appendChild($verseP);
  $entryDiv.appendChild($newEntryButton);

  $li.className = 'desktop-display-flex';
  $verseDiv.className = 'column-half';
  $verseP.className = 'saved-verse-box';
  $entryDiv.className = 'column-half margin-auto';
  $newEntryButton.className = 'margin-auto bold cursor-pointer black-button padding-around';
  $newEntryButton.textContent = 'New';
  $newEntryButton.id = 'new-entry';

  var $verse = document.getElementById('verse').textContent;
  var $verseTitle = document.getElementById('verse-title').textContent;
  $verseP.textContent = $verse + ' - ' + $verseTitle;

  var entry = {};
  entry.verse = $verseP.textContent;
  data.entries.push(entry);

  data.view = 'journal-page';
  data.editing = document.getElementById('new-entry');
  viewSwapper();
}

document.addEventListener('click', function (event) {
  data.view = 'edit-page';
  if (event.target === data.editing) {
    viewSwapper();
  }
});
