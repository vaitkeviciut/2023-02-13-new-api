import { API_URL } from "./config.js";
import { navigationElement } from "./header.js";

async function init() {
    const res = await fetch(`${API_URL}/users?_embed=posts`)
    const users = await res.json();
    console.log(users);

    const pageContent = document.querySelector('#page-content');
    const usersList = createUsersListElement(users);
    const header = navigationElement();

    pageContent.append(usersList);
    pageContent.before(header)
}
    
function createUsersListElement(users) {
    let usersList = document.createElement('ul');
    usersList.classList.add('users-list');
    
    users.forEach(user => {
        let userName = user.name;
        let postsCount = ` (${user.posts.length} posts)`;
        let userPosts = document.createElement('span');
        userPosts.classList.add('user-posts-count');
        userPosts.append(postsCount)
        let listItem = document.createElement('li')
        listItem.classList.add('users-list-item')
        let userLink = document.createElement('a');
        userLink.classList.add('users-list-item-link')
        let link = document.createElement('a');
        link.href = `./user.html?user_id=${user.id}`;
        link.textContent = userName
        link.classList.add('users-list-item-link')
        
        listItem.append(link, userPosts);
        usersList.append(listItem);
        
    })
    return usersList
}
    
init()


