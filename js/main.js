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
    $editPage.className = 'hidden';
    $homePage.className = 'container';
  } else if (data.view === 'generate-page') {
    $homePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $journalPage.className = 'hidden';
    $editPage.className = 'hidden';
    $generatePage.className = 'container flex-wrap align-content-center';
  } else if (data.view === 'search-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'hidden';
    $journalPage.className = 'hidden';
    $editPage.className = 'hidden';
    $searchPage.className = 'container flex-wrap align-content-center';
  } else if (data.view === 'journal-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $editPage.className = 'hidden';
    $journalPage.className = 'container flex-wrap';
  } else if (data.view === 'edit-page') {
    $homePage.className = 'hidden';
    $generatePage.className = 'hidden';
    $searchPage.className = 'hidden';
    $journalPage.className = 'hidden';
    $editPage.className = 'hidden';
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
  var $innerEntryDiv = document.createElement('div');
  var $innerButtonDiv = document.createElement('div');
  var $newEntryButton = document.createElement('button');

  $ul.prepend($li);
  $li.appendChild($verseDiv);
  $li.appendChild($entryDiv);
  $verseDiv.appendChild($verseP);
  $entryDiv.appendChild($innerEntryDiv);
  $entryDiv.appendChild($innerButtonDiv);
  $innerButtonDiv.appendChild($newEntryButton);

  $li.className = 'desktop-display-flex';
  $verseDiv.className = 'column-half margin-auto';
  $verseP.className = 'saved-verse-box';
  $entryDiv.className = 'column-half margin-auto';
  $innerEntryDiv.id = 'saved-journals';
  $newEntryButton.className = 'margin-auto bold cursor-pointer black-button padding-around';
  $newEntryButton.textContent = 'Edit';
  $newEntryButton.id = 'entry' + data.nextEntryId;

  var $verse = document.getElementById('verse').textContent;
  var $verseTitle = document.getElementById('verse-title').textContent;
  $verseP.textContent = $verse + ' - ' + $verseTitle;

  data.editing = document.getElementById($newEntryButton.id);

  var entry = {};
  entry.verse = $verseP.textContent;
  entry.title = $verseTitle;
  entry.ID = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(entry);

  data.view = 'journal-page';
  viewSwapper();
}

document.addEventListener('click', function (event) {
  data.view = 'edit-page';
  var $ul = document.querySelector('#journal-entries');
  var $textArea = document.querySelector('textarea');
  $ul.className = 'padding-bottom';
  if (event.target.textContent === 'Edit') {
    viewSwapper();

    if ($ul.hasChildNodes() === false) { // if this is a new entry...
      var $li = document.createElement('li'); // create a dom tree with the verse you got
      var $p = document.createElement('p');
      $p.id = 'journal-verse';

      $ul.appendChild($li);
      $li.appendChild($p);
      $p.textContent = data.entries[0].verse; // get the verse in the data entry and set it as the shown verse
    } else { // if this is not a new entry or you're editing...
      var currentDiv = event.target.closest('li').firstElementChild; // grab the closest li element and its first child which should be a div
      var currentVerse = currentDiv.firstElementChild.textContent; // grab the first child of that div which should be a p element and get its text content
      var $currentVerse = document.getElementById('journal-verse'); // grab the p elemennt that is used to show the verse
      $currentVerse.textContent = currentVerse; // set the p element that shows the verse to the current verse you decided to journal on

      if (data.entries[getEntryIndex()].entry === undefined) {
        $textArea.value = '';
      } else {
        $textArea.value = data.entries[getEntryIndex()].entry;
      }
    }
  }
});

var $journalForm = document.querySelector('#journal-form');
$journalForm.addEventListener('submit', saveEntry);

function saveEntry(event) {
  event.preventDefault(); // prevent the form from reloading
  var $textArea = document.querySelector('textarea'); // select the text area element
  var $innerEntryDiv = document.querySelector('#saved-journals');
  $innerEntryDiv.textContent = $textArea.value;
  $innerEntryDiv.className = 'margin-bottom padding-sides';

  var currentEntry = data.entries[getEntryIndex()].entry;
  if (currentEntry !== undefined) { // if the text area has something in it when you hit save...
    $textArea.value = currentEntry;
  } else {
    data.entries[getEntryIndex()].entry = $textArea.value;
  }
  data.view = 'journal-page';
  viewSwapper();
  $journalForm.reset();
}

// function that gets the current index of the verse you're deciding to edit
function getEntryIndex() {
  var $currentVerse = document.getElementById('journal-verse');
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].verse === $currentVerse.textContent) {
      return i;
    }
  }
}
