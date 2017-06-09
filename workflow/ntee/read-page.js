import fs from 'fs';

export default data => new Promise((resolve, reject) => {
    fs.readFile(data.nteeFile, 'utf8', (error, nteeBody) => {
        if (error) {
            return reject({ ...data, error });
        }
        resolve({ ...data, nteeBody });
    });
});