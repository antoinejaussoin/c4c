import moment from 'moment';
import Sequelize from 'sequelize';
import config from './config.json';

import download from './workflow/download';
import downloadIndex from './download-index-file';
import parseFiling from './workflow/parse-filing';
import readFiling from './workflow/read-filing';
import writeFile from './workflow/write-file';
import extract from './workflow/extract';
import store from './workflow/store';
import ntee from './workflow/ntee/retrieve-ntee';
import initialiseModels from './database/models';

const THREADS = 15;

console.log('C4C Data ripper');
console.log('Take a cup of coffee, this is going to take some time.');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.server,
    dialect: 'mysql',
    logging: false
});
const { Charity } = initialiseModels(sequelize);

sequelize.sync({force: true}).then(() => {
        downloadIndex().then(content => {

        const indexData = content['Filings2017'];

        console.log('Records: ', indexData.length);

        console.log('Example: ');
        console.log(JSON.stringify(indexData[0], null, 2));

        const promises = indexData.map(workflow)
            // .filter((item, index) => index === 0) // temp filtering to 1 for testing
        let currentIndex = 0;
        const start = moment();

        for (let i = 0; i < THREADS; i++) {
            downloadOne(promises[i]);
        }

        function downloadOne(promise) {
            const done = (err) => {
                const elapsed = moment().diff(start);
                const avg = elapsed / (currentIndex + 1);
                const left = (indexData.length - currentIndex) * avg;
                const leftMoment = moment.duration(left);
                console.log('Remaining: ', leftMoment.humanize());
                currentIndex++;
                if (currentIndex < promises.length) {
                    downloadOne(promises[currentIndex]);
                }
            }
            promise().then(done, done);
        }
    });

    const workflow = (indexData) => () =>
        download(indexData)
        .then(readFiling)
        .then(parseFiling)
        .then(ntee)
        .then(extract)
        .then(store(Charity))
        .then(data => {
            // console.log('Saved ', data.parsed.name);
        })
        .catch(console.error);
});
