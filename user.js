import { API_URL } from './config.js';
import { navigationElement } from "./header.js";
import { firstLetterUpperCase } from "./functions.js";
import { firstLetterLowerCase } from "./functions.js";

async function init() {
    const queryParams = location.search;
    const urlParams = new URLSearchParams(queryParams);
    const id = urlParams.get('user_id');

    const res = await fetch(`${API_URL}/users/${id}?_embed=posts&_embed=albums`);
    const user = await res.json();
    console.log(user);

    const pageContent = document.querySelector('#page-content');
    const userWrapper = createUserListElement(user);
    const header = navigationElement();

    pageContent.append(userWrapper);
    pageContent.before(header)
}
function createUserListElement(user) {
    let { name, email, phone, username, website, posts, albums } = user;
    let { city, street, suite, zipcode } = user.address;
    let { lat, lng } = user.address.geo;
    let companyName = user.company.name;
  
    let userWrapper = document.createElement('div');
    userWrapper.classList.add('user-wrapper');

    let userInfoWrapper = document.createElement('div');
    userInfoWrapper.classList.add('user-info-wrapper');

    let userNameTitle = document.createElement('h1');
    userNameTitle.textContent = name;

    let userUsernameTitle = document.createElement('h5');
    userUsernameTitle.textContent = 'User username:';
    let userUsername = username;

    let userAddressTitle = document.createElement('h5');
    userAddressTitle.textContent = 'User address:';
    let userAddress = `${street} street - ${suite}, ${city}, ${zipcode}`;
    let addressLink = document.createElement('a');
    addressLink.href = `https://www.google.com/maps/place/${lat}, ${lng}`;
    addressLink.target = '_blank';
    let link = document.createTextNode(userAddress);
    addressLink.append(link);
    
    let userContactsTitle = document.createElement('ul');
    userContactsTitle.textContent = 'User contacts:';

    let userPhone = document.createElement('li');
    userPhone.textContent = phone;
    let userEmail = document.createElement('li');
    userEmail.textContent = firstLetterLowerCase(email);
    let userWebsite = document.createElement('li');
    userWebsite.textContent = website;
    let userCompanyName = document.createElement('li');
    userCompanyName.textContent = companyName;

    userContactsTitle.append(userPhone, userEmail, userWebsite, userCompanyName);

    let postsWrapper = document.createElement('div');
    postsWrapper.classList.add('posts-wrapper');
    let postsTitle = document.createElement('h4');
    postsTitle.classList.add('posts-title');
    postsTitle.textContent = 'User posts:';
    postsWrapper.append(postsTitle);

    let albumsWrapper = document.createElement('div');
    albumsWrapper.classList.add('albums-wrapper');
    let albumsTitle = document.createElement('h4');
    albumsTitle.classList.add('albums-title');
    albumsTitle.textContent = 'User albums:';
    albumsWrapper.append(albumsTitle);

    posts.map(post => {
        let postTitle = document.createElement('h4');
        postTitle.textContent = firstLetterUpperCase(post.title);

        let postLink = document.createElement('a');
        postLink.href = `./post.html?post_id=${post.id}`;
        console.log(postLink)

        let postBody = document.createElement('p');

        postLink.append(postTitle);
        postsWrapper.append(postLink, postBody);

        albums.map(album => {
          let userAlbumTitle = document.createElement('h4');
          userAlbumTitle.textContent = firstLetterUpperCase(album.title);

          let albumLink = document.createElement('a');
          albumLink.href = `./album.html?album_id=${album.id}`;

          albumLink.append(userAlbumTitle);
          albumsWrapper.append(albumLink);
        })
    })
    userInfoWrapper.append(userNameTitle, userUsernameTitle, userUsername, userAddressTitle, addressLink, userContactsTitle);

    userWrapper.append(userInfoWrapper, postsWrapper, albumsWrapper);
    return userWrapper;

}
init()



