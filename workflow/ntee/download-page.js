import request from 'request';
import writeFile from '../write-file';
import config from '../../config.json';

export default (data) => new Promise((resolve, reject) => {
  const formData = `getInput=1&epostcard=0&finance=&basic=0&gbec=&list2bld=0&cic=0&orgname=&location=&range=&state=&irsType=NREG2&nteeFilter=&latest=&ein=${data.indexData.EIN}&revenueFilter=&orderBy=name&userListIdShow=&freeform=&searchWholeCmty=0&searchSubmit=Submit&bmfOnly=1&thisApp=http%3A%2F%2Fnccsweb.urban.org%2FPubApps%2Fsearch.php`;

  const options = {
    headers: {
      'Cookie': config['ntee_cookie'],
      'Content-Type': 'application/x-www-form-urlencoded',
      'Upgrade-Insecure-Requests': '1',
      'Host': 'nccsweb.urban.org',
      'Origin': 'http://nccsweb.urban.org',
      'Pragma': 'no-cache',
      'Referer': 'http://nccsweb.urban.org/PubApps/search.php',
      'Accept' :'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    }
  }

  request({
      url: "http://nccsweb.urban.org/PubApps/search.php?1",
      method: "POST",
      ...options,
      body: formData
  }, function (error, response, body){
      if (error) {
        console.error('Fetching page error: ', error);
        return reject(error);
      }
      data.nteeBody = body;

      writeFile(data.nteeFile, body).then(() => {
        resolve(data);
      });
  });
});
