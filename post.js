import { navigationElement } from "./header.js";
import { firstLetterUpperCase,  firstLetterLowerCase, getParams  } from "./functions.js";
import { API_URL } from './config.js';

async function init() {
    const id = getParams('post_id');

    const res = await fetch(`${API_URL}/posts/${id}?_embed=comments&_expand=user`);
    const post = await res.json();
    console.log(post);

    const pageContent = document.querySelector('#page-content');
    const postWrapper = createUserPostElement(post);
    const header = navigationElement();

    pageContent.append(postWrapper);
    pageContent.before(header);
}

function createUserPostElement (post) {
    let { title, body, comments } = post;

    let postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');

    let postContentWrapper = document.createElement('div');
    postContentWrapper.classList.add('post-content-wrapper');




    let userShortcutWrapper = document.createElement('div');
    userShortcutWrapper.classList.add('user-shortcut-wrapper');

    let imageSmall = document.createElement('img');
    imageSmall.classList.add('user-photo-small');
    imageSmall.src = './images/user-picture.jpg'
    imageSmall.width = '60'

    let userShortcutNearPhotoWrapper = document.createElement('div');
    userShortcutNearPhotoWrapper.classList.add('user-shortcut-near-photo-wrapper');

    let userNameUsernameWrapper = document.createElement('div')
    userNameUsernameWrapper.classList.add('user-name-username-wrapper');

    let userNameTitle = document.createElement('h3');
    userNameTitle.textContent = post.user.name;
    userNameTitle.classList.add('user-name-post');

    let userUsername = document.createElement('span');
    userUsername.textContent = `(${post.user.username})`;
    userUsername.classList.add('username-text-post');

    userNameUsernameWrapper.append(userNameTitle, userUsername);

    let userCompanyWrapper = document.createElement('div');
    userCompanyWrapper.classList.add('user-company-wrapper');

    let userCompanyName = document.createElement('span');
    userCompanyName.textContent = `Works @ ${post.user.company.name}`;
    userCompanyName.classList.add('user-company-item')  ;

    userCompanyWrapper.append(userCompanyName);

    let userLink = document.createElement('a');
    userLink.classList.add('user-name-link');
    userLink.href = `./user.html?user_id=${post.userId}`;
    userLink.append(userNameUsernameWrapper, userCompanyWrapper);

    userShortcutNearPhotoWrapper.append(userLink);
    userShortcutWrapper.append(imageSmall, userShortcutNearPhotoWrapper);




    let postLinkWrapper = document.createElement('div');
    postLinkWrapper.classList.add('post-link-wrapper');

    let postTitle = document.createElement('h4');
    postTitle.classList.add('post-title');
    postTitle.textContent = firstLetterUpperCase(title);

    let postBody = document.createElement('p');
    postBody.classList.add('post-body');
    postBody.textContent = firstLetterUpperCase(body);

    postLinkWrapper.append(postTitle, postBody);
    postContentWrapper.append(userShortcutWrapper, postLinkWrapper);



    let commentsContentWrapper = document.createElement('div');
    commentsContentWrapper.classList.add('comments-content-wrapper');

    let commentsWrapper = document.createElement('div');
    commentsWrapper.classList.add('comments-wrapper');

    let commentsTitle = document.createElement('h2');
    commentsTitle.classList.add('coments-title');
    commentsTitle.textContent = 'Comments:';

    commentsContentWrapper.append(commentsTitle, commentsWrapper);




    comments.map(comment => {
        let { email, body, name } = comment;

        const oneCommentWrapper = document.createElement('div');
        oneCommentWrapper.classList.add('one-comment-wrapper');

        const commentTitle = document.createElement('h5');
        commentTitle.textContent = firstLetterUpperCase(name);
        commentTitle.classList.add('comment-title');

        const commentBody = document.createElement('p');
        commentBody.textContent = firstLetterUpperCase(body);
        commentBody.classList.add('comment-body');

        const commentEmail = document.createElement('p');
        commentEmail.textContent = firstLetterLowerCase(email);
        commentEmail.classList.add('comment-email');

        oneCommentWrapper.append(commentEmail, commentTitle, commentBody);
        commentsWrapper.append(oneCommentWrapper);
        
    })

    const authorPostsLink = document.createElement('a');
    authorPostsLink.classList.add('author-post-link')
    authorPostsLink.href = `./posts.html?user_id=${post.userId}`;
    authorPostsLink.textContent = `Other posts by ${post.user.name}`;

    
    postWrapper.append(postContentWrapper, authorPostsLink, commentsContentWrapper);

    return postWrapper;
}
init()