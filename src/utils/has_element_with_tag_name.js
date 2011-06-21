/**
 * High performant way to check whether an element with a specific tag name is in the given document
 * Optimized for being heavily executed
 * Unleashes the power of live node lists
 *
 * @author Christopher Blum <christopher.blum@xing.com>
 * @param {Object} doc The document object of the context where to check
 * @param {String} tagName Upper cased tag name
 * @example
 *    wysihtml5.utils.hasElementWithTagName(document, "IMG");
 */
wysihtml5.utils.hasElementWithTagName = (function() {
  var LIVE_CACHE          = {},
      DOCUMENT_IDENTIFIER = 1;
  
  function _getDocumentIdentifier(doc) {
    return doc._wysihtml5Identifier || (doc._wysihtml5Identifier = DOCUMENT_IDENTIFIER++);
  }
  
  return function(doc, tagName) {
    var key         = _getDocumentIdentifier(doc) + ":" + tagName,
        cacheEntry  = LIVE_CACHE[key];
    if (!cacheEntry) {
      cacheEntry = LIVE_CACHE[key] = doc.getElementsByTagName(tagName);
    }
    
    return cacheEntry.length > 0;
  };
})();