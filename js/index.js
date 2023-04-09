const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value;
  const url = `https://api.github.com/search/users?q=${searchTerm}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data.items);
      displayUsers(data.items);
    })
    .catch(error => console.error(error));
});

function displayUsers(users) {
  const userItems = users.map(user => {
    return `
      <div>
        <img src="${user.avatar_url}" alt="${user.login}">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
      </div>
    `;
  });
  searchResults.innerHTML = userItems.join('');
}
function displayUsers(users) {
    const userItems = users.map(user => {
      return `
        <div class="user-item" data-repos-url="${user.repos_url}">
          <img src="${user.avatar_url}" alt="${user.login}">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        </div>
      `;
    });
    searchResults.innerHTML = userItems.join('');
    
    const userItemElements = document.querySelectorAll('.user-item');
    userItemElements.forEach(userItem => {
      userItem.addEventListener('click', () => {
        const reposUrl = userItem.dataset.reposUrl;
        fetch(reposUrl)
          .then(response => response.json())
          .then(data => {
            console.log(data);
            displayRepos(data);
          })
          .catch(error => console.error(error));
      });
    });
  }
  
  function displayRepos(repos) {
    const repoItems = repos.map(repo => {
      return `
        <div>
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
          <p>${repo.description || ''}</p>
        </div>
      `;
    });
    searchResults.innerHTML = repoItems.join('');
  }
  
