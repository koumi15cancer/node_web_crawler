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

async function crawlPage(baseURL,currentURL,pages){

  const base = new URL(baseURL)
  const current = new URL(currentURL)

  // Verify if base and current url same domain
  if (base.hostname !== current.hostname) {
    return pages
  }

  // normalize current url 
  const normalUrl = normalizeURL(currentURL);


  // if we've already visited this page
  // just increase the count and don't repeat
  // the http request
  if (pages[normalUrl] > 0){
    pages[normalUrl]++
    return pages
  }

   // initialize this page in the map
  // since it doesn't exist yet
  if (currentURL === baseURL){
    // don't count the base URL as a link to itself
    pages[normalUrl] = 0
  } else {
    pages[normalUrl] = 1
  }

  // fetch and parse the html of the currentURL
  console.log(`crawling ${normalUrl}`)
  let strBody = ''
  try {
    const resp = await fetch(currentURL)
    if (resp.status > 399){
      console.log(`Got HTTP error, status code: ${resp.status}`)
      return pages
    }
    const contentType = resp.headers.get('content-type')
    if (!contentType.includes('text/html')){
      console.log(`Got non-html response: ${contentType}`)
      return pages
    }
    strBody = await resp.text()

  } catch (err){
    console.log(err.message)
  }

  const leftUrls = getURLsFromHTML(strBody,base)
  for (const nextURL of leftUrls){
    pages = await crawlPage(baseURL, nextURL, pages)
  }

  return pages

  



}



module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};

