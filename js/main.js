const $ul = document.querySelector('#saved-entries');
const $homePage = document.querySelector('#home-page');
const $generatePage = document.querySelector('#generate-page');
const $journalPage = document.querySelector('#journal-page');
const $editPage = document.querySelector('#edit-page');
const $continueReading = document.querySelector('#continue-reading');
const $saveButton = document.querySelector('#save-button');
const $loader = document.querySelector('.lds-dual-ring');
const $verseBox = document.querySelector('#verse-box');
const $form = document.querySelector('#search-form');
const $journalForm = document.querySelector('#journal-form');
const $newButton = document.querySelector('#new-button');
const $regenerateVerse = document.querySelector('#regenerate-button');
const $generateLink = document.querySelector('#generate-link');
const $searchPage = document.querySelector('#search-page');
const $searchLink = document.querySelector('#search-link');
const $searchBar = document.querySelector('#search-bar');

$newButton.addEventListener('click', generatePage);
function generatePage(event) {
  data.view = 'generate-page';
  viewSwapper();
  getVerse();
}

function getVerse() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://labs.bible.org/api/?passage=random&type=json');
  if (xhr.readyState < 4) {
    $loader.className = 'lds-dual-ring';
  }
  xhr.send();
  xhr.addEventListener('load', function () {
    $loader.className = 'lds-dual-ring hidden';
    const response = JSON.parse(xhr.response);
    const $li = document.createElement('li');
    const $h3 = document.createElement('h3');
    $h3.id = 'verse-title';
    const $p = document.createElement('p');
    $p.id = 'verse';
    const $ul = document.querySelector('ul');
    $ul.appendChild($li);
    $li.appendChild($h3);
    $li.appendChild($p);
    if (response.error) {
      $h3.textContent = 'Unable to get verse. Please try again.';
    }
    $h3.textContent = response[0].bookname + ' ' + response[0].chapter + ':' + response[0].verse;
    $p.textContent = '"' + response[0].text + '" ';
    $continueReading.className = '';
    $saveButton.className = 'margin-auto bold cursor-pointer new-button width-rem';
  });
}

$regenerateVerse.addEventListener('click', regenerateVerse);
function regenerateVerse(event) {
  while ($verseBox.firstChild) {
    $verseBox.removeChild($verseBox.firstChild);
  }
  getVerse();
}
const $homeLink = document.querySelector('#home-link');
$homeLink.addEventListener('click', showHome);
function showHome(event) {
  data.view = 'home-page';
  while ($verseBox.firstChild) {
    $verseBox.removeChild($verseBox.firstChild);
  }
  viewSwapper();
}

$generateLink.addEventListener('click', showGenerate);
function showGenerate(event) {
  data.view = 'generate-page';
  viewSwapper();
  while ($verseBox.hasChildNodes() === true) {
    $verseBox.removeChild($verseBox.firstChild);
  }
  getVerse();
}

const $journalLink = document.querySelector('#journal-link');
$journalLink.addEventListener('click', showJournals);
function showJournals(event) {
  data.view = 'journal-page';
  viewSwapper();
}

$searchLink.addEventListener('click', showSearch);
function showSearch(event) {
  data.view = 'search-page';
  viewSwapper();
}

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
    $editPage.className = 'container flex-wrap';
  }
}

$form.addEventListener('submit', searchVerse);
function searchVerse(event) {
  event.preventDefault();
  if ($searchBar.value === '') {
    return;
  }
  data.view = 'generate-page';
  viewSwapper();
  while ($verseBox.firstChild) {
    $verseBox.removeChild($verseBox.firstChild);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://bible-api.com/' + $searchBar.value);
  if (xhr.readyState < 4) {
    $loader.className = 'lds-dual-ring';
  }
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
    $li.appendChild($p);
    $loader.className = 'lds-dual-ring hidden';
    if (response.error) {
      $h3.textContent = 'Invalid Verse';
      $p.textContent = 'Please make sure your verse is in correct format i.e. "John 3:16"';
      $continueReading.className = 'hidden';
      $saveButton.className = 'hidden';
    } else {
      $h3.textContent = response.reference;
      $p.textContent = '"' + response.text + '" ';
    }
    $form.reset();
  });
}

$continueReading.addEventListener('click', function (event) {
  var $verseTitle = document.getElementById('verse-title').textContent;
  $continueReading.setAttribute('href', 'https://www.biblegateway.com/passage/?search=' + $verseTitle + '&version=WEB');
});

function renderEntry(entry) {
  var $li = document.createElement('li');
  var $verseDiv = document.createElement('div');
  var $verseP = document.createElement('p');
  var $entryDiv = document.createElement('div');
  var $innerEntryDiv = document.createElement('div');
  var $innerButtonDiv = document.createElement('div');
  var $newEntryButton = document.createElement('button');
  $li.appendChild($verseDiv);
  $li.appendChild($entryDiv);
  $verseDiv.appendChild($verseP);
  $entryDiv.appendChild($innerEntryDiv);
  $entryDiv.appendChild($innerButtonDiv);
  $innerButtonDiv.appendChild($newEntryButton);
  $li.className = 'desktop-display-flex';
  $verseDiv.className = 'column-half margin-auto';
  $verseP.className = 'saved-verse-box';
  $verseP.id = 'id' + data.EntryId;
  $entryDiv.className = 'column-half margin-auto';
  $innerEntryDiv.id = 'saved-journals';
  $innerEntryDiv.textContent = entry.entry;
  $newEntryButton.textContent = 'Write Journal Entry';
  $newEntryButton.className = 'margin-auto bold cursor-pointer black-button padding-around';
  $newEntryButton.id = 'journal-buttons';
  if ($innerEntryDiv.textContent !== '') {
    $newEntryButton.textContent = 'Edit';
  }
  var $verse = entry.verse;
  var $verseTitle = entry.title;
  $verseP.textContent = $verse + ' - ' + $verseTitle;
  return $li;
}

$saveButton.addEventListener('click', saveVerse);
function saveVerse(event) {
  var $verse = document.querySelector('#verse');
  var $verseTitle = document.querySelector('#verse-title');
  var entryObject = {};
  entryObject.verse = $verse.textContent;
  entryObject.title = $verseTitle.textContent;
  entryObject.id = data.EntryId;
  var newEntry = renderEntry(entryObject);
  $ul.prepend(newEntry);
  data.EntryId++;
  data.entries.push(entryObject);
  data.view = 'journal-page';
  viewSwapper();
}

document.addEventListener('DOMContentLoaded', loadedDOMContent);
function loadedDOMContent(event) {
  var $ul = document.querySelector('#saved-entries');
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntry(data.entries[i]);
    $ul.append(renderedEntry);
  }
  data.view = 'home-page';
  viewSwapper();
}

document.addEventListener('click', function (event) {
  if (event.target.id === 'journal-buttons') {
    data.editing = event.target.closest('li');
    data.view = 'edit-page';
    var $ul = document.querySelector('#journal-entries');
    var $textArea = document.querySelector('textarea');
    var $currentVerse = data.editing.querySelector('.saved-verse-box');
    var $entryContainer = data.editing.querySelector('#saved-journals');
    $ul.className = 'padding-bottom';
    if ($ul.firstChild === null) {
      var $li = document.createElement('li');
      var $p = document.createElement('p');
      $ul.appendChild($li);
      $li.appendChild($p);
      $p.className = 'editPageVerse';
      $p.textContent = $currentVerse.textContent;
      $textArea.value = $entryContainer.textContent;
    } else {
      var $editPage = document.querySelector('#edit-page');
      var $editPageVerse = $editPage.querySelector('.editPageVerse');
      $editPageVerse.textContent = $currentVerse.textContent;
      $textArea.value = $entryContainer.textContent;
    }
    viewSwapper();
  }
});

var $deleteButton = document.querySelector('#delete-entry');
$deleteButton.addEventListener('click', () => {
  if (event.target.id === 'delete-entry') {
    const verse = data.editing.firstChild.firstChild.textContent;
    data.editing.remove();
    for (let i = 0; i < data.entries.length; i++) {
      const verseWithTitle = data.entries[i].verse + ' - ' + data.entries[i].title;
      if (verseWithTitle === verse) {
        data.entries.splice(i, 1);
        data.view = 'journal-page';
        viewSwapper();
      }
    }
  }
});

$journalForm.addEventListener('submit', saveEntry);
function saveEntry(event) {
  event.preventDefault();
  var $textArea = document.querySelector('textarea');
  var $journalContent = data.editing.lastChild.firstChild;
  $journalContent.textContent = $textArea.value;
  $journalContent.className = 'margin-bottom padding-sides';
  data.entries[getEntryIndex()].entry = $textArea.value;
  if ($textArea.value.length > 0) {
    data.editing.querySelector('button').textContent = 'Edit';
  } else {
    data.editing.querySelector('button').textContent = 'Write Journal Entry';
  }
  data.view = 'journal-page';
  viewSwapper();
  $journalForm.reset();
}

function getEntryIndex() {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.firstChild.textContent === data.entries[i].verse + ' - ' + data.entries[i].title) {
      return i;
    }
  }
}
