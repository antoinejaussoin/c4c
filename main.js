const download = require('./download');
const downloadIndex = require('./download-index-file');
const moment = require('moment');
const parseFiling = require('./parse-filing');
const readFile = require('./read-file');
const writeFile = require('./write-file');
const extract = require('./extract');

console.log('C4C Data ripper');

downloadIndex().then(content => {

    const indexData = content['Filings2017'];

    console.log('Records: ', indexData.length);

    console.log('Example: ');
    console.log(JSON.stringify(indexData[0], null, 2));

    const promises = indexData.map(workflow);
    let currentIndex = 0;
    const start = moment();

    for (let i = 0; i < 10; i++) {
        downloadOne(promises[i]);
    }

    function downloadOne(promise) {
        const done = (err) => {
            const elapsed = moment().diff(start);
            const avg = elapsed / (currentIndex + 1);
            const left = (indexData.length - currentIndex) * avg;
            const leftMoment = moment.duration(left);
            // console.log('Remaining: ', leftMoment.humanize());
            currentIndex++;
            downloadOne(promises[currentIndex]);
        }
        promise().then(done, done);
    }
});

const workflow = (indexData) => () =>
    download(indexData.URL, indexData.EIN)
    .then(readFile)
    .then(parseFiling)
    .then(extract)
    // .then(content => writeFile(__dirname+'/temp.json', JSON.stringify(content, null, 2)))
    .then(parsed => {
        console.log(JSON.stringify(parsed, null, 2));
    })
    .catch(console.error);