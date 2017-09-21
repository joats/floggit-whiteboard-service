// NOTE we use localStorage in this example to simplify/mock a backend.
// Also we use to illustrate how frontend code can be used on the backend.
// In production you should use a proper data store i.e. mySql, redis, couchdb etc.
const { LocalStorage } = require('node-localstorage');

const localStorage = new LocalStorage('./scratch');

const notes = (localStorage.getItem('noteList')) ?
  JSON.parse(localStorage.getItem('noteList')) : {};

//function generateId(a) {
  //return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,generateId);
//}
const generateId = Guid.create();

function save() {
  localStorage.setItem('noteList', JSON.stringify(notes));
}

const publicAPI = {};

publicAPI.add = (value) => {
  const uniqueId = generateId.value;
  notes[uniqueId] = {
    value,
  };
  save();
  return uniqueId;
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
