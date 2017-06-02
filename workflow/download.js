import download from 'download';
import fs from 'fs';
import path from 'path';
import pathExists from 'path-exists';

export default (indexData) => {
    const directory = path.resolve(__dirname, '..', 'data');
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
