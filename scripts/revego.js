const properties = {
    "technology": "Technology",
    "installedCapacity": "Installed Capacity",
    "acquisitionDate": "Acquisition Date",
    "commercialOperationDate": "Commercial Operation Date",
    "developer": "Developer",
}

function createProject(element) {
    const project = document.createElement('div');
    project.classList.add('project');

    const card = document.createElement('div');
    card.classList.add('card');


    card.append(element.querySelector('h2'));
    card.append(element.querySelector('picture'));
    project.append(card);
    project.append(element.querySelector('ul'));

    const table = document.createElement('div');
    table.classList.add('table');

    Object.keys(properties).forEach(key => {
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
        //table.append(row);
    });
    project.append(table);

    return project;
}


export async function buildProjectsTemplate() {
    const projectsName = document.querySelectorAll('h2');
    const sections = document.querySelectorAll('div.section');
    const main = document.querySelector('main');

    const projectsFlex = document.createElement('div');
    projectsFlex.classList.add('projects-view');

    const projectsListContainer = document.createElement('div');
    projectsListContainer.classList.add('projects-list-container');

    const projectsDescription = document.createElement('div');
    const projectsList = document.createElement('ul');
    projectsListContainer.append(projectsList);
    projectsFlex.append(projectsListContainer);
    projectsFlex.append(projectsDescription);
    projectsName.forEach(element => {
        const li = document.createElement('li');
        li.innerHTML = element.textContent;
        projectsList.append(li);
    });

    projectsList.firstChild.classList.add('active');

    sections.forEach(element => {
        //main.removeChild(element);
        projectsDescription.append(createProject(element));
    });

    projectsDescription.firstChild.classList.add('active');

    main.prepend(projectsFlex);
}