// Defines the shape of a waitlist entry + basic field checks

const REQUIRED_FIELDS = ['playerName', 'gameName'];
const ALLOWED_STATUS = ['waiting', 'notified', 'seated', 'cancelled'];

function isValidEntry(data) {
  const missing = REQUIRED_FIELDS.filter(field => !data[field] || typeof data[field] !== 'string' || !data[field].trim());

  if (missing.length > 0) {
    return { valid: false, missing };
  }

  if (data.status && !ALLOWED_STATUS.includes(data.status)) {
    return { valid: false, missing: [], invalidStatus: true };
  }

  return { valid: true, missing: [] };
}

module.exports = { REQUIRED_FIELDS, ALLOWED_STATUS, isValidEntry };