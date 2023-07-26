import {
  readBlockConfig,
  decorateIcons,
  decorateSections,
  createOptimizedPicture,
  updateSectionsStatus,
} from '../../scripts/lib-franklin.js';

/**
 * Wraps images followed by links within a matching <a> tag.
 * @param {Element} container The container element
 */
function wrapImgsInLinks(container) {
  const pictures = container.querySelectorAll('picture');
  pictures.forEach((pic) => {
    const link = pic.nextElementSibling;
    if (link && link.tagName === 'A' && link.href) {
      link.title = link.textContent;
      link.innerHTML = pic.outerHTML;
      pic.replaceWith(link);
    }
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;

    decorateIcons(footer);

    decorateSections(footer);
    footer.querySelectorAll('img').forEach(
      (img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '160' }])),
    );

    updateSectionsStatus(footer);
    block.append(footer);

    wrapImgsInLinks(block);
  }
}
