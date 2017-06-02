const download = require('download');
const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');

module.exports = (indexData) => {
    const directory = path.resolve(__dirname, 'data');
    const filename = indexData.EIN + '.xml';
    const filingFile = path.resolve(directory, filename);
    return pathExists(filingFile)
    .then(exists => {
        if (!exists) {
            return download(indexData.URL, directory, { filename })
                .then(() => ({ indexData, filingFile }));
        }

        return { indexData, filingFile };
    });
};
