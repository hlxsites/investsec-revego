import { createOptimizedPicture } from './lib-franklin.js';

const properties = {
  technology: 'Technology',
  installedCapacity: 'Installed Capacity',
  acquisitionDate: 'Acquisition Date',
  commercialOperationDate: 'Commercial Operation Date',
  developer: 'Developer',
};

function createProject(element) {
  const project = document.createElement('div');
  project.classList.add('project');
  project.dataset.title = element.querySelector('h2').textContent;

  const card = document.createElement('div');
  card.classList.add('card');

  card.append(element.querySelector('h2'));
  card.append(element.querySelector('picture'));
  project.append(card);
  project.append(element.querySelector('ul'));

  const resizedPicture = createOptimizedPicture(
    card.querySelector('img').src,
    card.querySelector('img').alt,
    true,
    [{ width: '650' }],
  );
  card.querySelector('picture').replaceWith(resizedPicture);

  const table = document.createElement('div');
  table.classList.add('table');

  Object.keys(properties).forEach((key) => {
    if (!element.dataset[key]) {
      return;
    }
    const value = element.dataset[key];

    const row = document.createElement('div');
    row.classList.add('row');

    const keyElement = document.createElement('div');
    keyElement.classList.add('key');
    keyElement.textContent = properties[key];

    const valueElement = document.createElement('div');
    valueElement.classList.add('value');
    valueElement.textContent = value;

    table.append(keyElement);
    table.append(valueElement);
  });
  project.append(table);

  return project;
}

export default async function buildProjectsTemplate() {
  const sections = document.querySelectorAll('div.section');
  const main = document.querySelector('main');

  const section = document.createElement('div');
  section.classList.add('section');

  const projectsFlex = document.createElement('div');
  projectsFlex.classList.add('projects-view');
  section.append(projectsFlex);

  const projectsListContainer = document.createElement('div');
  projectsListContainer.classList.add('projects-list-container');

  const projectsDescription = document.createElement('div');
  projectsDescription.classList.add('projects-description');
  const projectsList = document.createElement('ul');
  projectsListContainer.append(projectsList);
  projectsFlex.append(projectsListContainer);
  projectsFlex.append(projectsDescription);

  sections.forEach((element) => {
    const title = element.querySelector('h2');
    const li = document.createElement('li');
    li.innerHTML = title.textContent;

    li.addEventListener('click', (event) => {
      projectsList.querySelector('.active').classList.remove('active');
      projectsDescription.querySelector('.active').classList.remove('active');
      event.currentTarget.classList.add('active');
      projectsFlex.querySelector(`div[data-title="${event.currentTarget.textContent}"]`).classList.add('active');
    });
    projectsList.append(li);
    projectsDescription.append(createProject(element));
    main.removeChild(element);
  });

  projectsList.firstChild.classList.add('active');
  projectsDescription.firstChild.classList.add('active');

  main.prepend(section);
}
