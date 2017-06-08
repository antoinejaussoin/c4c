import downloadPage from './download-page';
import parsePage from './parse-page';
import readPage from './read-page';
import path from 'path';
import pathExists from 'path-exists';

export default (data) => {
    const directory = path.resolve(__dirname, '..', '..', 'data');
    const filename = data.indexData.EIN + '-ntee.html';
    const nteeFile = path.resolve(directory, filename);
    return pathExists(nteeFile)
      .then(exists => {
          data.nteeFile = nteeFile;
          if (!exists) {
              return downloadPage(data)
                  .then(parsePage);
          }
          return readPage(data)
            .then(parsePage);
      });
};