const notes = require('../../../repository/notes');

// Get Rest
const get = (req, res) => {
  const id = req.params.id;
  const note = notes.get(id);
  if (note) {
    res.json(notes.get(id));
  } else {
    res.status(404).json({
      type: 'error',
      message: `Note ${id} not found` });
  }
};
// Get All Rest
const getAll = (req, res) => {
  res.json(notes.getAll());
};
// Remove Rest
const remove = (req, res) => {
  const id = req.params.id;
  notes.remove(id);
  res.status(204).send();
};
// Add Rest
const add = (req, res) => {
  const title = req.body.title;
  const infoList = req.body.infoList;
  const color = req.body.color;
  const id = notes.add(title, infoList, color);
  res.status(201).json({ id });
};
// Update Rest
const update = (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const infoList = req.body.infoList;
  const color = req.body.color;
  notes.update({ id, title, infoList, color });
  res.status(202).send();
};

module.exports = {
  get,
  getAll,
  remove,
  add,
  update,
};
