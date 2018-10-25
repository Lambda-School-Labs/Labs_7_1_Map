const express = require('express');
const router = express.Router();
const notesModel = require('./models/notesModel');

//Middleware to Handle Errors
const awaitErrorHandlerFactory = middleware => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

// Get Notes
router.get(
  '/api/notes',
  awaitErrorHandlerFactory(async (req, res, next) => {
    const note = await notesModels.NoteSchema.findAll({});
    return res.json({
      error: false,
      data: note
    });
  })
);

// Post Note
router.post(
  '/api/notes',
  awaitErrorHandlerFactory(async (req, res, next) => {
    const { text } = req.body;
    const note = notesModel.NoteSchema.save({
      text: text,
      user: {
        type: ObjectIdSchema,
        ref: 'User'
      },
      timestamps: timestamps
    });
    return res.status(201).json({
      error: false,
      data: note,
      message: 'Country note has been created.'
    });
  })
);

// Update Note
router.put(
  '/api/note/:id',
  awaitErrorHandlerFactory(async (req, res, next) => {
    const noteId = req.params.id;
    const { text } = req.body;

    notesModel.NoteSchema.update({ text: text }, { where: { id: noteId } });
    return res.status(201).json({
      error: false,
      message: 'Country note has been updated.'
    });
  })
);

// Delete Note
router.delete(
  '/api/note/:id', 
  awaitErrorHandlerFactory(async (req, res, next) => {
    const noteId = req.params.id;

    notesModel.NoteSchema.destroy({
      where: {
        id: noteId
      }
    });
    return res.status(201).json({
      error: false,
      message: "Country note has been deleted."
    });
  })
);
module.exports = router;
