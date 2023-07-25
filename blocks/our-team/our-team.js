export default async function decorate(block) {
  const resp = await fetch('/our-team.json');
  const data = await resp.json();
  const teams = {};
  const mapNumberedStyle = {
    3: 'three',
    4: 'four',
  };

  const teamMenu = document.createElement('div');
  teamMenu.classList.add('team-menu');

  const teamList = document.createElement('ul');
  teamMenu.append(teamList);

  block.append(teamMenu);

  data.teams.data.forEach((teamData) => {
    const teamName = document.createElement('li');
    const teamTitle = document.createElement('span');
    teamTitle.textContent = teamData.team;
    teamName.append(teamTitle);

    teamList.append(teamName);

    const team = document.createElement('div');
    team.classList.add('team');

    if (teamData.team !== 'Investment Committee') {
      team.classList.add('inactive');
      teamName.classList.add('inactive');
    } else {
      team.classList.add('active');
      teamName.classList.add('active');
    }

    teamName.addEventListener('click', (event) => {
      if (event.currentTarget.classList.contains('inactive')) {
        const activeTeamName = teamList.querySelector('.active');
        activeTeamName.classList.remove('active');
        activeTeamName.classList.add('inactive');

        event.currentTarget.classList.remove('inactive');
        event.currentTarget.classList.add('active');

        const activeTeam = block.querySelector('.team.active');
        activeTeam.classList.remove('active');
        activeTeam.classList.add('inactive');

        const currentTeamName = event.currentTarget.querySelector('span').textContent;
        const currentTeam = teams[currentTeamName].parentElement;
        currentTeam.classList.remove('inactive');
        currentTeam.classList.add('active');
      }
    });

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = teamData.description;
    team.append(description);

    const members = document.createElement('div');
    members.classList.add('members');
    team.append(members);

    teams[teamData.team] = members;
    block.append(team);
  });

  const memberPerTeam = {};
  data.members.data.forEach((member) => {
    if (!memberPerTeam[member.team]) {
      memberPerTeam[member.team] = 0;
    }

    memberPerTeam[member.team] += 1;
  });

  data.members.data.forEach((member) => {
    const memberElement = document.createElement('div');
    memberElement.classList.add('member');
    memberElement.style.backgroundImage = `url(${member.picture})`;

    const card = document.createElement('div');
    card.classList.add('card');
    card.appendChild(memberElement);

    const numberedStyle = memberPerTeam[member.team] in mapNumberedStyle ? mapNumberedStyle[memberPerTeam[member.team]] : 'five';
    card.classList.add(numberedStyle);

    memberElement.addEventListener('mouseover', (event) => {
      event.currentTarget.querySelector('.content').classList.add('active');
    });
    memberElement.addEventListener('mouseout', (event) => {
      event.currentTarget.querySelector('.content').classList.remove('active');
    });

    const memberContent = document.createElement('div');
    memberContent.classList.add('content');
    memberElement.append(memberContent);

    const memberName = document.createElement('div');
    memberName.classList.add('name');
    memberName.textContent = member.name;
    memberContent.append(memberName);

    if (member.title) {
      const memberTitle = document.createElement('div');
      memberTitle.textContent = member.title;
      memberContent.append(memberTitle);
    }

    if (member.description) {
      const memberBio = document.createElement('div');
      memberBio.classList.add('bio');
      memberBio.textContent = member.description;
      memberContent.append(memberBio);
    }

    if (member.linkedin) {
      const memberLinkedIn = document.createElement('a');
      memberLinkedIn.href = member.linkedin;
      memberLinkedIn.textContent = 'LinkedIn';
      memberContent.append(memberLinkedIn);
    }

    teams[member.team].append(card);
  });
}
