const { crawlPage} = require('./crawl.js')
const { printReport} = require('./report.js')

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
    printReport(pages)

}

main()