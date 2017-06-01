const download = require('./download');
const moment = require('moment');

console.log('C4C Data ripper');

const indexData = require('./data-index.json')['Filings2017'];

console.log('Records: ', indexData.length);

console.log('Example: ');
console.log(JSON.stringify(indexData[0], null, 2));

const promises = indexData.map(data => download(data.URL, data.EIN));
let currentIndex = 0;
const start = moment();

for (let i = 0; i < 10; i++) {
    downloadOne(promises[i]);
}

function downloadOne(promise) {
    const done = (err) => {
        if (err) {
            console.error('Error: ', err);
        }
        const elapsed = moment().diff(start);
        const avg = elapsed / (currentIndex + 1);
        const left = (indexData.length - currentIndex) * avg;
        const leftMoment = moment.duration(left);
        console.log('Remaining: ', leftMoment.humanize());
        currentIndex++;
        downloadOne(promises[currentIndex]);
    }
    promise().then(done, done);
}
