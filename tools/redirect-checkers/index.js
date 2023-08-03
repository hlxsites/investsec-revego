const url = process.argv[2];
const franklin = process.argv[3];

import Sitemapper from 'sitemapper';
import fetch from 'node-fetch';

(async () => {
  const site = new Sitemapper({
    url,
    timeout: 15000,
  });

  try {
    const { sites } = await site.fetch();
    sites.forEach((url) => {
      const parsedUrl = new URL(url);
      const newUrl = franklin + parsedUrl.pathname;
      const response = fetch(newUrl, {}).then((response) => {
        console.log(response.status, newUrl);
      });
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
