/* exported data */
var data = {
  view: 'home-page',
  entries: [],
  editing: null,
  EntryId: 1
};

function beforeLoad(event) {
  var entriesJSON = JSON.stringify(data);
  localStorage.setItem('bible-local-storage', entriesJSON);
}

var storedData = localStorage.getItem('bible-local-storage');
if (storedData !== null) {
  data = JSON.parse(storedData);
}

window.addEventListener('beforeunload', beforeLoad);
