function sortReport(pages) {
    // Convert object to array of key-value pairs
    const entries = Object.entries(pages);
    
    // Sort the array based on the values
    entries.sort(([, valueA], [, valueB]) => valueB - valueA);
    
    // const pagesArr = Object.entries(pages)
    // pagesArr.sort((pageA, pageB) => {
    //   return pageB[1] - pageA[1]
    // })

    
    return entries
    
};

function printReport(pages) {
    console.log('---Report Starting----');
    const sortedPages = sortReport(pages);
    Object.keys(sortedPages).forEach(key => {
    const count = sortedPages[key];
    console.log(`Found : ${count}  internal links to ${key}
    `);
  });

}


module.exports = {
    printReport,
    sortReport
  };