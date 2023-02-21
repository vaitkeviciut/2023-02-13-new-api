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
        let postsCount = ` (${user.posts.length})`

        let listItem = document.createElement('li')
        let userLink = document.createElement('a');
        let link = document.createTextNode(userName);
        userLink.append(link, postsCount);
        userLink.href = `./user.html?user_id=${user.id}`;

        usersList.append(listItem);
        listItem.append(userLink);
    })
    return usersList
}
    
init()


