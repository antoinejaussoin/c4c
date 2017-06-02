const moment = require('moment');
const Sequelize = require('sequelize');
const config = require('./config.json');

const download = require('./workflow/download');
const downloadIndex = require('./download-index-file');
const parseFiling = require('./workflow/parse-filing');
const readFiling = require('./workflow/read-filing');
const writeFile = require('./workflow/write-file');
const extract = require('./workflow/extract');
import store from './workflow/store';
import initialiseModels from './database/models';

console.log('C4C Data ripper');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.server,
    dialect: 'mysql'
});
const { Charity } = initialiseModels(sequelize);

sequelize.sync({force: true}).then(() => {
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
        download(indexData)
        .then(readFiling)
        .then(parseFiling)
        .then(extract)
        .then(store(Charity))
        .then(data => {
            console.log('Saved ', data.parsed.name);
        })
        .catch(console.error);
});
