document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('github-form');
   const searchInput = document.getElementById('search');
   const userList = document.getElementById('user-list');
   const reposList = document.getElementById('repos-list');
 
   form.addEventListener('submit', (e) => {
     e.preventDefault();
     const searchTerm = searchInput.value.trim();
     if (searchTerm) {
       searchUsers(searchTerm);
     }
   });
 
   function searchUsers(query) {
     fetch(`https://api.github.com/search/users?q=${query}`, {
       headers: {
         'Accept': 'application/vnd.github.v3+json'
       }
     })
     .then(response => response.json())
     .then(data => {
       displayUsers(data.items);
     })
     .catch(error => console.error('Error fetching users:', error));
   }
 
   function displayUsers(users) {
     userList.innerHTML = '';
     reposList.innerHTML = '';
     users.forEach(user => {
       const userItem = document.createElement('li');
       userItem.innerHTML = `
         <img src="${user.avatar_url}" alt="${user.login}" width="50">
         <a href="${user.html_url}" target="_blank">${user.login}</a>
         <button data-username="${user.login}">View Repos</button>
       `;
       userList.appendChild(userItem);
     });
   }
 
   userList.addEventListener('click', (e) => {
     if (e.target.tagName === 'BUTTON') {
       const username = e.target.getAttribute('data-username');
       if (username) {
         fetchUserRepos(username);
       }
     }
   });
 
   function fetchUserRepos(username) {
     fetch(`https://api.github.com/users/${username}/repos`, {
       headers: {
         'Accept': 'application/vnd.github.v3+json'
       }
     })
     .then(response => response.json())
     .then(repos => {
       displayRepos(repos);
     })
     .catch(error => console.error(`Error fetching repositories for ${username}:`, error));
   }
 
   function displayRepos(repos) {
     reposList.innerHTML = '';
     repos.forEach(repo => {
       const repoItem = document.createElement('li');
       repoItem.innerHTML = `
         <a href="${repo.html_url}" target="_blank">${repo.name}</a>
       `;
       reposList.appendChild(repoItem);
     });
   }
 });
 