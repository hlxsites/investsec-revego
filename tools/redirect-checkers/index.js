import Sitemapper from 'sitemapper';
import fetch from 'node-fetch';

const sitemapUrl = process.argv[2];
const franklin = process.argv[3];

const success = [];
const failures = [];

(async () => {
  const site = new Sitemapper({
    sitemapUrl,
    timeout: 15000,
  });

  try {
    const { sites } = await site.fetch();

    for (const url of sites) {
      const parsedUrl = new URL(url);
      const newUrl = new URL(franklin + parsedUrl.pathname);
      await fetch(newUrl, {}).then((response) => {
        if (response.status >= 299) {
          failures.push({ url: newUrl.toString(), status: response.status });
        } else {
          success.push({ url: newUrl.toString(), status: response.status });
        }
      });
    }

    console.log('Successes:');
    console.log(success);
    console.log('Failures:');
    console.log(failures);

  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
