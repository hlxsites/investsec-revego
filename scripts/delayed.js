// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';
import { loadScript } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

loadScript('//assets.adobedtm.com/launch-ENd6668700e6ad4d64a37c3d34c489ee03.min.js?ver=6.2.2', {
  async: '',
});

// Adobe Analytics tracking script
let dataLayer = {};
const pageDir = window.location.pathname.replace(/\//g, '');

if (window.location.pathname !== '/') {
  dataLayer = {
    page: {
      articleTitle: pageDir,
      name: `fund-managers/news/${pageDir}`,
    },
  };
} else {
  dataLayer = {
    page: {
      name: 'fund-managers/home',
    },
  };
}
