// Basic XSS protection — strips tags/scripts from text fields before they hit the store
function stripTags(value) {
    if (typeof value !== 'string') return value;
    return value
      .replace(/<script.*?>.*?<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .trim();
  }
  
  function sanitizeBody(req, res, next) {
    if (req.body && typeof req.body === 'object') {
      for (const key of Object.keys(req.body)) {
        req.body[key] = stripTags(req.body[key]);
      }
    }
    next();
  }
  
  module.exports = { sanitizeBody };