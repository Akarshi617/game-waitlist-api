const db = require('../data/db'); // agar tumhari file dp.js hai to path yahan '../data/dp' karo

// GET /waitlist
function getAllEntries(req, res) {
  const entries = db.getAll();

  if (entries.length === 0) {
    return res.status(200).json({
      success: true,
      message: 'No data found',
      data: [],
    });
  }

  res.status(200).json({ success: true, data: entries });
}

// GET /waitlist/:id
function getEntryById(req, res) {
  const entry = db.getById(req.params.id);

  if (!entry) {
    return res.status(404).json({
      success: false,
      message: 'No data found for this ID',
    });
  }

  res.status(200).json({ success: true, data: entry });
}

// POST /waitlist
function createEntry(req, res) {
  try {
    const newEntry = db.create({
      playerName: req.body.playerName,
      gameName: req.body.gameName,
      status: req.body.status || 'waiting',
    });

    console.log('[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters');
    res.status(201).json({ success: true, data: newEntry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not create entry, try again' });
  }
}

// PUT /waitlist/:id
function updateEntry(req, res) {
  try {
    const updated = db.update(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Entry not found' });
    }

    console.log('[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters');
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not update entry, try again' });
  }
}

// DELETE /waitlist/:id
function deleteEntry(req, res) {
  const removed = db.remove(req.params.id);

  if (!removed) {
    return res.status(404).json({ success: false, message: 'Entry not found' });
  }

  console.log('[Analytics] User interacted with Game Waitlist CRUD API with Route Parameters');
  res.status(200).json({ success: true, message: 'Entry removed' });
}

module.exports = { getAllEntries, getEntryById, createEntry, updateEntry, deleteEntry };