var $ul = document.querySelector('#saved-entries');

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

var $journalLink = document.querySelector('#journal-link');
$journalLink.addEventListener('click', showJournals);
function showJournals(event) {
  data.view = 'journal-page';
  viewSwapper();
}

var $searchPage = document.querySelector('#search-page');
var $searchLink = document.querySelector('#search-link');
$searchLink.addEventListener('click', showSearch);
function showSearch(event) {
  data.view = 'search-page';
  viewSwapper();
}

// global function to view swap pages whenver needed
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
  $newEntryButton.className = 'margin-auto bold cursor-pointer black-button padding-around';
  $newEntryButton.textContent = 'Edit';

  var $verse = entry.verse;
  var $verseTitle = entry.title;
  $verseP.textContent = $verse + ' - ' + $verseTitle;

  return $li;
}

var $saveButton = document.querySelector('#save-button');
$saveButton.addEventListener('click', saveVerse);

function saveVerse(event) { // function that runs when user decides to save the verse that's generated to them
  var $verse = document.querySelector('#verse'); // select the element that's going to hold the verse
  var $verseTitle = document.querySelector('#verse-title'); // select the element that's going to hold the verse title
  var entryObject = {}; // create a object to store the verse and verse title
  entryObject.verse = $verse.textContent; // create a verse property in entryObject; assign the textContent of $verse to the verse property
  entryObject.title = $verseTitle.textContent; // create a title property in entryObject; assign the textContent of $verseTitle to the title property
  entryObject.id = data.EntryId; // create a id property in entryObject; assign the current entryid of the data model id property

  var newEntry = renderEntry(entryObject); // render that entryObject so that it shows on the journal page
  $ul.prepend(newEntry); // prepend the rendered object onto to the ul element

  data.EntryId++; // increment the EntryId property by one so the next verse will be assigned this Id
  data.entries.push(entryObject); // push that object into the entries property array of the data model

  data.view = 'journal-page'; // set the data view to 'journal-page' so it only shows the journal entries
  viewSwapper(); // run the viewSwapper function
}

document.addEventListener('DOMContentLoaded', loadedDOMContent);

function loadedDOMContent(event) {
  var $ul = document.querySelector('#saved-entries');
  for (var i = 0; i < data.entries.length; i++) {
    var renderedEntry = renderEntry(data.entries[i]);
    $ul.append(renderedEntry);
  }
}

// listens for clicks on the new/edit button while calling an anonymous function.
document.addEventListener('click', function (event) {
  if (event.target.textContent === 'Edit') { // if the user clicks the button and the text content says 'Edit'...
    var currentDiv = event.target.closest('li').firstElementChild; // grab the closest li element and its first child which should be a div that is a parent of the element which holds the verse
    var currentVerse = currentDiv.firstElementChild.textContent; // grab the first child of that div which should be a p element and get its text content
    data.editing = event.target.closest('li'); // set the editing property of our data model to the event.target which is the button element that you clicked so we can access the id
    var $ul = document.querySelector('#journal-entries'); // grab the ul element so we can append the verse that's been selected
    var $textArea = document.querySelector('textarea'); // grab the textarea element so we can use to update the textarea box
    $ul.className = 'padding-bottom'; // add some padding to the bottom of $ul so we can add some spacing between the verse & textarea

    data.view = 'edit-page'; // set property of view to 'edit-page' in the data model so we can change views
    viewSwapper(); // change the page view

    if ($ul.hasChildNodes() === false) { // if this is the first new entry...
      var $li = document.createElement('li'); // create a new 'li' element
      var $p = document.createElement('p'); // create a new 'p' element

      $p.id = 'journal-verse'; // set the id of 'p' to 'journal-verse'
      $p.textContent = data.editing.firstChild.textContent; // get the verse in the data entry and set it as the shown verse

      $ul.appendChild($li); // append $li to $ul
      $li.appendChild($p); // append $p to $li
    } else { // if this is not a new entry aka you're editing...
      var $editPageVerse = document.getElementById('journal-verse'); // grab the p element that is used to show the verse
      $editPageVerse.textContent = currentVerse; // set the p element that shows the current verse you decided to journal in the edit page
      $textArea.value = data.editing.lastChild.firstChild.textContent;
    }
  }
});

var $journalForm = document.querySelector('#journal-form');
$journalForm.addEventListener('submit', saveEntry);

function saveEntry(event) {
  event.preventDefault(); // prevent the form from reloading
  var $textArea = document.querySelector('textarea'); // select the text area element
  var $journalContent = data.editing.lastChild.firstChild;
  $journalContent.textContent = $textArea.value;
  $journalContent.className = 'margin-bottom padding-sides';

  data.entries[getEntryIndex()].entry = $textArea.value;

  data.view = 'journal-page';
  viewSwapper();
  $journalForm.reset();
}

// function that gets the current index of the verse you're deciding to edit
function getEntryIndex() {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.firstChild.textContent === data.entries[i].verse + ' - ' + data.entries[i].title) {
      return i;
    }
  }
}
