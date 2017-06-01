const download = require('download');
const pathExists = require('path-exists');
const path = require('path');

const url = 'https://s3.amazonaws.com/irs-form-990/index_2017.json';
const directory = path.resolve(__dirname, 'data');
const filename = 'index.json';
const fullFileName = path.resolve(directory, filename);

module.exports = () => 
    pathExists(fullFileName)
    .then(exists => {
        if (!exists) {
            return download(url, directory, { filename })
                    .then(() => require(fullFileName));
        } else {
            return require(fullFileName);
        }
    });