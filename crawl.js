const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
};

function getURLsFromHTML(htmlBody, baseURL) {

    const urls = [];
    const dom = new JSDOM(htmlBody);
    const aElements = dom.window.document.querySelectorAll('a');

    for (const aElement of aElements ) {
      if (aElement.href.slice(0,1) ==='/') {
           try {
            urls.push(new URL(aElement.href,baseURL).href);
           } catch (error) {
            console.log(`${err.message}: ${aElement.href}`)
           }

      } else {
        try {
          urls.push(new URL(aElement.href).href);
         } catch (error) {
          console.log(`${error.message}: ${aElement.href}`)
         }

      }

    };
    return urls

};


module.exports = {
  normalizeURL,
  getURLsFromHTML
};

