const {
  addNotesHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNotesByIdHandler,
  deleteNotesById,
} = require('./handler');

const route = [
  {
    path: '/notes',
    method: 'POST',
    handler: addNotesHandler,
  },
  {
    path: '/notes',
    method: 'GET',
    handler: getAllNotesHandler,
  },
  {
    path: '/notes/{id}',
    method: 'GET',
    handler: getNotesByIdHandler,
  },
  {
    path: '/notes/{id}',
    method: 'PUT',
    handler: editNotesByIdHandler,
  },
  {
    path: '/notes/{id}',
    method: 'DELETE',
    handler: deleteNotesById,
  },
];

module.exports = route;
