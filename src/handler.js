const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNotes = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNotes);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const res = h
      .response({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: {
          noteId: id,
        },
      })
      .code(201);

    return res;
  }

  const res = h
    .response({
      status: 'failed',
      message: 'Catatan gagal ditambahkan',
    })
    .code(500);

  return res;
};

const getAllNotesHandler = (req, h) => {
  const res = h
    .response({
      status: 'success',
      data: {
        notes,
      },
    })
    .code(200);

  return res;
};

const getNotesByIdHandler = (req, h) => {
  const { id } = req.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    const res = h
      .response({
        status: 'success',
        data: {
          note,
        },
      })
      .code(200);

    return res;
  }

  const res = h
    .response({
      status: 'failed',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);

  return res;
};

const editNotesByIdHandler = (req, h) => {
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

    const res = h
      .response({
        status: 'success',
        message: 'Catatan berhasil di edit',
      })
      .code(200);

    return res;
  }

  const res = h
    .response({
      status: 'failed',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);

  return res;
};

const deleteNotesById = (req, h) => {
  const { id } = req.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    const res = h
      .response({
        status: 'success',
        message: 'Catatan berhasil di hapus',
      })
      .code(200);

    return res;
  }

  const res = h
    .response({
      status: 'failed',
      message: 'Catatan tidak ditemukan',
    })
    .code(404);

  return res;
};

module.exports = {
  addNotesHandler,
  getAllNotesHandler,
  getNotesByIdHandler,
  editNotesByIdHandler,
  deleteNotesById,
};
