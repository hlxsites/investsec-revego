export default async function decorate(block) {
    const resp = await fetch('/our-team.json');
    const data = await resp.json();
    const teams = {};

    const teamMenu = document.createElement('div');
    teamMenu.classList.add('team-menu');

    const teamList = document.createElement('ul');
    teamMenu.append(teamList);

    block.append(teamMenu);

    for (const teamData of data.teams.data) {
        const teamName = document.createElement('li');
        const teamTitle = document.createElement('span');
        teamTitle.textContent = teamData.team;
        teamName.append(teamTitle);

        teamList.append(teamName);

        const team = document.createElement('div');
        team.classList.add('team');

        if (teamData.team !== "Investment Committee") {
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
        })

        const description = document.createElement('p');
        description.textContent = teamData.description;
        team.append(description);

        const members = document.createElement('div');
        members.classList.add('members');
        team.append(members);

        teams[teamData.team] = members;
        block.append(team);
    }

    for (const member of data.members.data) {
        const memberElement = document.createElement('div');
        memberElement.classList.add('member');

        const memberName = document.createElement('div');
        memberName.textContent = member.name;
        memberElement.append(memberName);

        if (member.title) {
            const memberTitle = document.createElement('div');
            memberTitle.textContent = member.title;
            memberElement.append(memberTitle);
        }

        if (member.description) {
            const memberDescription = document.createElement('div');
            memberDescription.textContent = member.description;
            memberElement.append(memberDescription);
        }

        if (member.linkedin) {
            const memberLinkedIn = document.createElement('a');
            memberLinkedIn.href = member.linkedin;
            memberLinkedIn.textContent = 'LinkedIn';
            memberElement.append(memberLinkedIn);
        }

        teams[member.team].append(memberElement);
    }
}
