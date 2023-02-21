import { navigationElement } from "./header.js";
import { firstLetterUpperCase, getParams } from "./functions.js";
import { API_URL } from './config.js';

async function init() {
    const userId = getParams('user_id');
    let userParamUrl = userId ? `&userId=${userId}` : '';

    const res = await fetch(`${API_URL}/posts?_expand=user${userParamUrl}&_embed=comments`)
    const posts = await res.json();
    console.log(posts);

    const pageContent = document.querySelector('#page-content');
    const postsList = createPostsListElement(posts);
    const header = navigationElement();

    pageContent.append(postsList);
    pageContent.before(header)
}
function createPostsListElement(posts) {
    let postsList = document.createElement('ul');
    postsList.classList.add('posts-list');
    
    posts.forEach(post => {
        let postTitle = firstLetterUpperCase(post.title);
        let postUserName = ` (${post.user.name})`;

        let userLink = document.createElement('a');
        userLink.href = `./user.html?user_id=${post.userId}`
        userLink.append(postUserName)

        let listItem = document.createElement('li')
        let postLink = document.createElement('a');
        let link = document.createTextNode(postTitle);
        postLink.append(link);
        postLink.href = `./post.html?post_id=${post.id}`

        postsList.append(listItem);
        listItem.append(postLink, userLink);
    })
    return postsList
}

init()



