import header from "./header.js";
import { firstLetterUpperCase, getParams } from "./functions.js";
import { API_URL } from './config.js';

async function init() {
    const userId = getParams('user_id');
    let userParamUrl = userId ? `&userId=${userId}` : '';

    const res = await fetch(`${API_URL}/posts?_expand=user${userParamUrl}&_embed=comments`)
    const posts = await res.json();

    const pageContent = document.querySelector('#page-content');
    const postsList = createPostsListElement(posts);
    const headerElement = header();

    pageContent.append(postsList);
    pageContent.before(headerElement)
}
function createPostsListElement(posts) {
    let postsWrapper = document.createElement('div');
    postsWrapper.classList.add('posts-wrapper');

    let onePostAllWrapper = document.createElement('div');
    onePostAllWrapper.classList.add('one-posts-all-wrapper');

    const createPostWrapper = document.createElement('div');
    createPostWrapper.classList.add('create-post-wrapper');

    const plus = document.createElement('span');
    plus.textContent = '+';
    plus.classList.add('plus-symbol');

    const plusText = document.createElement('span');
    plusText.textContent = 'Create Post';
    plusText.classList.add('plus-text');

    const postCreateLink = document.createElement('a')
    postCreateLink.href = `./create-post.html?post_id=${posts.id}`
    postCreateLink.classList.add('post-create-link')

    postCreateLink.prepend(plus, plusText)
    createPostWrapper.append(postCreateLink)
    
    posts.forEach(post => {
        let onePostWrapper = document.createElement('div');
        onePostWrapper.classList.add('one-post-wrapper')
        

        let postWrapper = document.createElement('div');
        postWrapper.classList.add('post-text-wrapper')

        let userShortcutWrapper = document.createElement('div');
        userShortcutWrapper.classList.add('user-shortcut-wrapper')

        onePostWrapper.append(userShortcutWrapper, postWrapper)

        let imageSmall = document.createElement('img');
        imageSmall.classList.add('user-photo-small');
        imageSmall.src = './images/user-picture.jpg'
        imageSmall.width = '60'

        let userShortcutNearPhotoWrapper = document.createElement('div')
        userShortcutNearPhotoWrapper.classList.add('user-shortcut-near-photo-wrapper')

        let userNameUsernameWrapper = document.createElement('div')
        userNameUsernameWrapper.classList.add('user-name-username-wrapper')

        let userNameTitle = document.createElement('h3');
        userNameTitle.textContent = post.user.name;
        userNameTitle.classList.add('user-name-post')

        let userUsername = document.createElement('span');
        userUsername.textContent = `(${post.user.username})`;
        userUsername.classList.add('username-text-post')

        userNameUsernameWrapper.append(userNameTitle, userUsername)

        let userCompanyWrapper = document.createElement('div');
        userCompanyWrapper.classList.add('user-company-wrapper')

        let userCompanyName = document.createElement('span');
        userCompanyName.textContent = `Works @ ${post.user.company.name}`;
        userCompanyName.classList.add('user-company-item')  

        userCompanyWrapper.append(userCompanyName)

        let userLink = document.createElement('a');
        userLink.classList.add('user-name-link')
        userLink.href = `./user.html?user_id=${post.userId}`;
        userLink.append(userNameUsernameWrapper, userCompanyWrapper)

        userShortcutNearPhotoWrapper.append(userLink)
        userShortcutWrapper.append(imageSmall, userShortcutNearPhotoWrapper)



        let postTitle = document.createElement('p')
        postTitle.classList.add('post-title')
        postTitle.textContent = firstLetterUpperCase(post.title);

        let postBody = document.createElement('p')
        postBody.classList.add('post-body')
        postBody.textContent = firstLetterUpperCase(post.body);

        let postLink = document.createElement('a');
        postLink.classList.add('posts-list-item-link');
        postLink.href = `./post.html?post_id=${post.id}`

        postLink.append(postTitle, postBody)

        postWrapper.append(postLink)
        onePostWrapper.append(userShortcutWrapper, postWrapper)
        onePostAllWrapper.append(onePostWrapper)
        postsWrapper.append(postCreateLink, onePostAllWrapper)
    })
    return postsWrapper
}

init()



