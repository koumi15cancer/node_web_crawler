function normalizeURL(urlString) {
  try {
    const urlObj = new URL(urlString)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
  } catch (err) {
    throw err;
  }
}

module.exports = {
  normalizeURL
};

