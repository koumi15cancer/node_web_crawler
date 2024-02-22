const { normalizeURL, getURLsFromHTML, crawlPage} = require('./crawl.js')

async function main() {
    if (process.argv.length < 3 ) {
        console.log("No website provided")
    } 
    if (process.argv.length > 3 ){
        console.log("Too Many arguments")
    }

    const baseURL = process.argv[2]

    console.log(`starting crawl of: ${baseURL}...`);
    const pages = await crawlPage(baseURL,baseURL,{});
    console.log(pages)

}

main()