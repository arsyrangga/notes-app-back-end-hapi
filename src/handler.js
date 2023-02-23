const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotehandler = (req, res) => {
  const { title, tags, body } = req.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = res.response({
      status: 'success',
      message: 'Catatan Berhasil Di Tambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = res.response({
    status: 'fail',
    message: 'Catatan gagal Di Tambahkan',
    data: {
      noteId: id,
    },
  });
  response.code(500);
  return response;
};

const getNoteHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNoteByHandler = (req, res) => {
  const { id } = req.params;

  const note = notes.find((n) => n.id === id);

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = res.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editNoteByHandler = (req, res) => {
  const { id } = req.params;

  const { title, tags, body } = req.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = res.response({
      status: 'success',
      message: 'Catatan Berhasil Diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = res.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((item) => item.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = res.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = res.response({
    status: 'Fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addNotehandler, getNoteHandler, getNoteByHandler, editNoteByHandler, deleteNoteByIdHandler,
};
