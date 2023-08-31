import { createOptimizedPicture } from '../../scripts/lib-franklin.js';

const properties = {
  technology: 'Technology',
  installedCapacity: 'Installed Capacity',
  acquisitionDate: 'Acquisition Date',
  commercialOperationDate: 'Commercial Operation Date',
  developer: 'Developer',
};
const resp = await fetch('/renewable-energy-projects.json');
const data = await resp.json();

export default async function decorate(block) {
  const section = document.querySelector('.renewable-energy-projects')

  const projectsFlex = document.createElement('div');
  projectsFlex.classList.add('projects-view');
  section.append(projectsFlex);

  block.append(projectsFlex);

  const projectsListContainer = document.createElement('div');
  projectsListContainer.classList.add('projects-list-container');

  const projectsList = document.createElement('ul');
  projectsListContainer.append(projectsList);
  projectsFlex.append(projectsListContainer);

  const projectsDescription = document.createElement('div');
  projectsDescription.classList.add('projects-description');
  projectsFlex.append(projectsDescription);

  data.data.forEach((projectsData) => {
    const liElement = document.createElement('li');
    liElement.innerHTML = projectsData.title;
    projectsList.append(liElement);

    liElement.addEventListener('click', (event) => {
      projectsList.querySelector('.active').classList.remove('active');
      projectsDescription.querySelector('.active').classList.remove('active');
      event.currentTarget.classList.add('active');
      projectsFlex.querySelector(`div[data-title="${event.currentTarget.textContent}"]`).classList.add('active');
    });

    const project = document.createElement('div');
    project.classList.add('project');

    project.dataset.title = projectsData.title;

    const card = document.createElement('div');
    card.classList.add('card');

    const h2Element = document.createElement('h2');
    h2Element.innerHTML = projectsData.title;
    card.append(h2Element);
    card.append(createOptimizedPicture(
      projectsData.image,
      projectsData.title,
      true,
      [{ width: '650' }],
    ));
    project.append(card);

    const descriptionListContainer = document.createElement('ul');
    const descriptionString = projectsData.description;
    const descriptionArray = descriptionString.split("--");
    
    descriptionArray.forEach((info) => {
      const descriptionList = document.createElement('li');
      descriptionList.innerHTML = info;
      descriptionListContainer.append(descriptionList);
    })
     
    project.append(descriptionListContainer);

    const table = document.createElement('div');
    table.classList.add('table');

    Object.keys(properties).forEach((key) => {
      if (!projectsData[key]) {
        return;
      }
      const value = projectsData[key];

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

    projectsDescription.append(project);
  })

  projectsList.firstChild.classList.add('active');
  projectsDescription.firstChild.classList.add('active');

}
