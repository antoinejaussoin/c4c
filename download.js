const https = require('https');
const fs = require('fs');
const path = require('path');

module.exports = (url, ein) => () => {
    console.log('Downloading: ', url);
    const fileName = path.resolve(__dirname, 'data', ein+'.xml');
    return new Promise((resolve, reject) => {
        if (fs.existsSync(fileName)) {
            return resolve();
        }

        var file = fs.createWriteStream(fileName);
        var request = https.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
            file.close(resolve);  // close() is async, call cb after close completes.
            });
        }).on('error', function(err) { // Handle errors
            fs.unlink(fileName); // Delete the file async. (But we don't check the result)
            reject(err.message);
        });
    });

};
