import header from "./header.js";
import { fetchData, firstLetterUpperCase } from "./functions.js";

async function init() {
    const content = document.getElementById("content-wrapper");
  
    const posts = await fetchData(
      `https://jsonplaceholder.typicode.com/posts?_limit=7&_expand=user`
    );
  
    const users = await fetchData(
      "https://jsonplaceholder.typicode.com/users?_embed=posts"
    );
  
    const pageContent = document.querySelector("#page-content");
    const postsList = createPostsListElement(posts);
    const usersList = getUsers(users);
    const headerElement = header();
  
    content.append(postsList, usersList);
    pageContent.before(headerElement)
    pageContent.append(content)
  }
  

function createPostsListElement(posts) {
  let postsWrapper = document.createElement('div');
  postsWrapper.classList.add('posts-wrapper')

  let onePostAllWrapper = document.createElement('div');
  onePostAllWrapper.classList.add('one-posts-all-wrapper')

  const sectionWrapper = document.createElement('div')
  sectionWrapper.classList.add('section-wrapper')

  const postsTitle = document.createElement("h2");
  postsTitle.textContent = "Posts";
  postsTitle.classList.add("section-title");

  const sectionTitleWrapper = document.createElement('div')
  sectionTitleWrapper.classList.add('section-title-wrapper')

  sectionTitleWrapper.prepend(postsTitle)

  posts.map((post) => {
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
    postsWrapper.append(sectionTitleWrapper, onePostAllWrapper)
    })
    return postsWrapper
}

function getUsers(users) {
  const usersList = document.createElement("div");
  usersList.classList.add("users-list");

  const usersTitle = document.createElement("h2");
  usersTitle.textContent = "Users";
  usersTitle.classList.add("section-title");

  usersList.prepend(usersTitle);

  const usersWrapper = document.createElement('div')
  usersWrapper.classList.add('users-wrapper')

  users.forEach((user) => {
    const userItem = document.createElement("div");
    userItem.classList.add("user-item");

    const username = document.createElement("span");
    username.textContent = ` (${user.username})`;



    let userShortcutWrapper = document.createElement('div');
    userShortcutWrapper.classList.add('user-shortcut-wrapper');

    let imageSmall = document.createElement('img');
    imageSmall.classList.add('user-photo-small');
    imageSmall.src = './images/user-picture.jpg';
    imageSmall.width = '40';

    let userShortcutNearPhotoWrapper = document.createElement('div');
    userShortcutNearPhotoWrapper.classList.add('user-shortcut-near-photo-wrapper');

    let userNameUsernameWrapper = document.createElement('div');
    userNameUsernameWrapper.classList.add('user-name-username-wrapper');

    let userNameTitle = document.createElement('h3');
    userNameTitle.textContent = user.name;
    userNameTitle.classList.add('user-name-post');

    let userUsername = document.createElement('span');
    userUsername.textContent = `(${user.username})`;
    userUsername.classList.add('username-text-post');

    userNameUsernameWrapper.append(userNameTitle, userUsername);

    let userCompanyWrapper = document.createElement('div');
    userCompanyWrapper.classList.add('user-company-wrapper');

    let userCompanyName = document.createElement('span');
    userCompanyName.textContent = `Works @ ${user.company.name}`;
    userCompanyName.classList.add('user-company-item');

    userCompanyWrapper.append(userCompanyName);



    userShortcutNearPhotoWrapper.append(userNameUsernameWrapper, userCompanyWrapper);
    userShortcutWrapper.append(imageSmall, userShortcutNearPhotoWrapper);

    const viewProfileWrapper = document.createElement('div');
    viewProfileWrapper.classList.add('view-profile-wrapper');


    const viewProfile = document.createElement('span');
    viewProfile.textContent = 'View Profile';
    viewProfile.classList.add('view-profile-text');

    viewProfileWrapper.append(viewProfile);


    const userLink = document.createElement("a");
    userLink.href = `./user.html?id=${user.id}`;
    userLink.classList.add('user-link-view-profile')

    userLink.append(userShortcutWrapper, viewProfileWrapper)

    userItem.append(userLink);
    usersWrapper.append(userItem)
    usersList.append(usersWrapper);
  });

  return usersList;
}
init();
