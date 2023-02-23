const {
  addNotehandler, getNoteHandler, getNoteByHandler, editNoteByHandler, deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNotehandler,

  },
  {
    method: 'GET',
    path: '/notes',
    handler: getNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByHandler,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
