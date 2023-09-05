// eslint-disable-next-line import/no-cycle
import { sampleRUM } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

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
