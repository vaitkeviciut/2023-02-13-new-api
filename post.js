import { navigationElement } from "./header.js";
import { firstLetterUpperCase,  firstLetterLowerCase, getParams  } from "./functions.js";
import { API_URL } from './config.js';

async function init() {
    const id = getParams('post_id');

    const res = await fetch(`${API_URL}/posts/${id}?_embed=comments&_expand=user`)
    const post = await res.json();
    console.log(post);

    const pageContent = document.querySelector('#page-content');
    const postWrapper = createUserPostElement(post);
    const header = navigationElement();

    pageContent.append(postWrapper)
    pageContent.before(header)
}

function createUserPostElement (post) {
    let { title, body, comments } = post;

    let postWrapper = document.createElement('div');
    postWrapper.classList.add('post-wrapper');


    let postContentWrapper = document.createElement('div');
    postContentWrapper.classList.add('post-content-wrapper');
    let postTitle = document.createElement('h4');
    postTitle.textContent = firstLetterUpperCase(title);
    let postLink = document.createElement('a');
    postLink.href = `./post.html?post_id=${post.id}`

    postLink.append(postTitle)

    let userName = post.user.name;
    let userNameLink = document.createElement('a');
    userNameLink.href = `./user.html?user_id=${post.userId}`

    userNameLink.append(userName);

    postContentWrapper.append(postLink, firstLetterUpperCase(body), userNameLink)


    let commentsWrapper = document.createElement('div');
    commentsWrapper.classList.add('comments-wrapper');


    comments.map(comment => {
        let { email, name } = comment;

        const commentTitle = document.createElement('h5')
        commentTitle.textContent = firstLetterUpperCase(name)

        const commentBody = document.createElement('p')
        commentBody.textContent = firstLetterUpperCase(comment.body)

        const commentEmail = document.createElement('p')
        commentEmail.textContent = firstLetterLowerCase(email)

        commentsWrapper.append(commentTitle, commentBody, commentEmail)
    })

    const authorPostsLink = document.createElement('a')
    authorPostsLink.href = `./posts.html?user_id=${post.userId}`
    authorPostsLink.textContent = `Other posts by ${post.user.name}`

    postWrapper.append(postContentWrapper, commentsWrapper, authorPostsLink)

    return postWrapper;
}
init()