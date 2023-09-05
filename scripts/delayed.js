// eslint-disable-next-line import/no-cycle
import { sampleRUM, loadScript } from './lib-franklin.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

// Adobe Analytics
loadScript('//assets.adobedtm.com/launch-ENd6668700e6ad4d64a37c3d34c489ee03.min.js?ver=6.2.2', {
  async: '',
});

const pageDir = window.location.pathname.replace(/\//g, '');

if (window.location.pathname !== '/') {
  window.adobeDataLayer = {
    page: {
      articleTitle: pageDir,
      name: `fund-managers/news/${pageDir}`,
    },
  };
} else {
  window.adobeDataLayer = {
    page: {
      name: 'fund-managers/home',
    },
  };
}
