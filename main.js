import moment from 'moment';
import Sequelize from 'sequelize';
import drop from 'lodash/drop';
import chalk from 'chalk';
import displayProgress from './display-progress';
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

const THREADS = 20;

console.log(chalk.green('--------------------------------------------------'));
console.log(chalk.red('          Change for Charity') + chalk.grey(' - ') + chalk.yellow('Data ripper'));
console.log(chalk.green('--------------------------------------------------'));
console.log('');
console.log('\u2615  \u2615  \u2615  Take a cup of coffee, this is going to take some time.  \u2615  \u2615  \u2615');
console.log('');

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.server,
    dialect: 'mysql',
    logging: false
});
const { Charity } = initialiseModels(sequelize);

sequelize.sync({force: true}).then(() => {
        downloadIndex().then(content => {

        const indexData = content['Filings2017'];
        const promises = indexData.map(workflow)
            // .filter((item, index) => index < 200) // temp filtering to 1 for testing
        let currentIndex = 0;

        const timings = [];
        
        for (let i = 0; i < THREADS; i++) {
            downloadOne(promises[i]);
        }

        function downloadOne(promise) {
            const start = moment();
            const done = (err) => {
                const elapsed = moment().diff(start);
                timings.push(elapsed);
                if (timings.length > 100) {
                    timings.shift();
                }

                if (currentIndex < promises.length - 1) {
                    currentIndex++;
                    displayProgress(timings, THREADS, currentIndex, promises.length);
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
