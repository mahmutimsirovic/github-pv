async function getProfile() {
  const username = document.getElementById('username').value;
  const profileDiv = document.getElementById('profile');
  const reposDiv = document.getElementById('repos');

  profileDiv.innerHTML = '';
  reposDiv.innerHTML = '';

  try {
    const res = await fetch(`/api/profile/${username}`);
    if (!res.ok) throw new Error('User not found');
    const data = await res.json();

    profileDiv.innerHTML = `
      <img src="${data.avatar_url}" alt="avatar">
      <h2>${data.name || data.login}</h2>
      <p>${data.bio || ''}</p>
      <p>Followers: ${data.followers} | Following: ${data.following}</p>
    `;

    const reposRes = await fetch(`/api/repos/${username}`);
    const repos = await reposRes.json();

    repos.forEach(repo => {
      reposDiv.innerHTML += `
        <div class="repo">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          ⭐ ${repo.stargazers_count}
        </div>
      `;
    });
  } catch (err) {
    profileDiv.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
}
