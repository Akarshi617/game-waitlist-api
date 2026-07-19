const { isValidEntry } = require('../models/waitlist.model');

// Validates request body before create/update — blocks bad data early
function validateWaitlistEntry(req, res, next) {
  const { valid, missing, invalidStatus } = isValidEntry(req.body);

  if (!valid) {
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Missing or invalid required fields',
        fields: missing,
      });
    }

    if (invalidStatus) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value',
        allowedStatus: ['waiting', 'notified', 'seated', 'cancelled'],
      });
    }
  }

  next();
}

module.exports = { validateWaitlistEntry };