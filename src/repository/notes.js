// NOTE we use localStorage in this example to simplify/mock a backend.
// Also we use to illustrate how frontend code can be used on the backend.
// In production you should use a proper data store i.e. mySql, redis, couchdb etc.
const { LocalStorage } = require('node-localstorage');
const uuid = require('uuid/v4');

const localStorage = new LocalStorage('./scratch');

const notes = (localStorage.getItem('noteList')) ?
  JSON.parse(localStorage.getItem('noteList')) : {};

function save() {
  localStorage.setItem('noteList', JSON.stringify(notes));
}

const publicAPI = {};

publicAPI.add = (value) => {
  const guid = uuid();
  notes[guid] = {
    value,
  };
  save();
  return guid;
};

publicAPI.get = id => notes[id];

publicAPI.remove = (id) => {
  delete notes[id];
  save();
};

publicAPI.getAll = () => {
  const notesArray = [];
  Object.keys(notes).forEach((id) => {
    notesArray.push({
      id,
      value: notes[id].value,
    });
  });
  return notesArray;
};

module.exports = publicAPI;
