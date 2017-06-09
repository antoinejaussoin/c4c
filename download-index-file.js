import download from 'download';
import pathExists from 'path-exists';
import path from 'path';

const url = 'https://s3.amazonaws.com/irs-form-990/index_2017.json';
const directory = path.resolve(__dirname, 'data');
const filename = 'index.json';
const fullFileName = path.resolve(directory, filename);

export default () => 
    pathExists(fullFileName)
    .then(exists => {
        if (!exists) {
            return download(url, directory, { filename })
                    .then(() => require(fullFileName));
        } else {
            return require(fullFileName);
        }
    });