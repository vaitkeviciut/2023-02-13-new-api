import header from "./header.js";
import { firstLetterUpperCase,  firstLetterLowerCase, getParams  } from "./functions.js";
import { API_URL } from './config.js';

async function init() {
    const id = getParams('post_id');

    const res = await fetch(`${API_URL}/posts/${id}?_embed=comments&_expand=user`);
    const post = await res.json();

    const pageContent = document.querySelector('#page-content');
    const postWrapper = createUserPostElement(post);
    const headerElement = header();

    pageContent.append(postWrapper);
    pageContent.before(headerElement);
}

function createUserPostElement (post) {
    let { title, body, comments } = post;

    let postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');

    let postContentWrapper = document.createElement('div');
    postContentWrapper.classList.add('post-content-wrapper');



    let postHeaderWrapper = document.createElement('div');
    postHeaderWrapper.classList.add('post-header-wrapper');

    const postEditLink = document.createElement('a')
    postEditLink.textContent = 'Edit'
    postEditLink.classList.add('post-edit-link')
    postEditLink.href = `./edit-post.html?post_id=${post.id}`

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
    postHeaderWrapper.append(userShortcutWrapper, postEditLink)
    postContentWrapper.append(postHeaderWrapper, postLinkWrapper);



    let commentsContentWrapper = document.createElement('div');
    commentsContentWrapper.classList.add('comments-content-wrapper');

    let commentsWrapper = document.createElement('div');
    commentsWrapper.classList.add('comments-wrapper');

    let commentsTitle = document.createElement('h2');
    commentsTitle.classList.add('coments-title');
    commentsTitle.textContent = 'Comments:';

    commentsContentWrapper.append(commentsTitle, commentsWrapper);

    if (comments.length === 0) {
        commentsTitle.textContent = "No comments";
        return commentsContentWrapper;
      }


    comments.map(comment => {
        let { email, body, name } = comment;

        const oneCommentWrapper = document.createElement('div');
        oneCommentWrapper.classList.add('one-comment-wrapper');

        const oneCommentHeaderWrapper = document.createElement('div');
        oneCommentHeaderWrapper.classList.add('one-comment-header-wrapper');

        const commentTitle = document.createElement('h5');
        commentTitle.textContent = firstLetterUpperCase(name);
        commentTitle.classList.add('comment-title');

        const commentBody = document.createElement('p');
        commentBody.textContent = firstLetterUpperCase(body);
        commentBody.classList.add('comment-body');

        const commentEmail = document.createElement('p');
        commentEmail.textContent = firstLetterLowerCase(email);
        commentEmail.classList.add('comment-email');

        const removeButton = document.createElement('button')
        removeButton.classList.add('remove-comment-button')
        removeButton.textContent = 'Delete'

        removeButton.addEventListener('click', ()=> {
            fetchData(`${API_URL}/comments/${id}`, {
                method: 'DELETE'
            })
        })
        oneCommentHeaderWrapper.append(commentEmail, removeButton)
        oneCommentWrapper.append(oneCommentHeaderWrapper, commentTitle, commentBody);
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