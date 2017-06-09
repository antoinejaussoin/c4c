import { parseString } from 'xml2js';

export default data => new Promise((resolve, reject) => {
    parseString(data.xml, (error, json) => {
        if (error) {
            return reject(error);
        }
        resolve({ ...data, json });
    });
});