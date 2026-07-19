const express = require('express');
const router = express.Router();

const {
  getAllEntries,
  getEntryById,
  createEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/waitlist.controller');

const { validateWaitlistEntry } = require('../middleware/validate');
const { sanitizeBody } = require('../middleware/sanitize');

router.get('/', getAllEntries);
router.get('/:id', getEntryById);
router.post('/', sanitizeBody, validateWaitlistEntry, createEntry);
router.put('/:id', sanitizeBody, updateEntry);
router.delete('/:id', deleteEntry);

module.exports = router;