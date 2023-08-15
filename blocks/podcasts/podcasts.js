import { jsx } from '../../scripts/scripts.js';

export default async function decorate(block) {
  const response = await fetch('/podcast/query-index.json?sheet=default&limit=20');
  if (!response.ok) {
    return;
  }
  const rows = await response.json();
  const articles = [];

  rows.data.forEach((row) => {
    articles.push(jsx`
    <section class="podcast-preview">
      <iframe src="${row['media-source']}" width="100%" height="126" referrerpolicy="origin" frameborder="0" loading="lazy" title="${row.title}"></iframe>
      <h2>${row.title}</h2>
      ${(!['', '0'].includes(row['teaser-title']) ? jsx`<p class="teaser-title">${row['teaser-title']}</p>` : '')}
      <p class="teaser-content">${row['teaser-content']}</p>
      ${(row.panellists ? jsx`<span><strong>Panellists: </strong>${row.panellists}</span>` : '')}
      <button data-hover="Read article!" onclick="window.location.href='${row.path}';">
        <div>Find out more</div>
      </button>
    </section>
`);
  });

  block.innerHTML = jsx`${articles.join('\n')}`;
}
