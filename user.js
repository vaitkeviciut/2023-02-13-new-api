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

    let userPhotoWrapper = document.createElement('div');
    userPhotoWrapper.classList.add('user-photo-wrapper');

    let userTextWrapper = document.createElement('div');
    userTextWrapper.classList.add('user-text-wrapper');

    

    let image = document.createElement('img');
    image.classList.add('user-photo');




    let nameWrapper = document.createElement('div');
    nameWrapper.classList.add('name-wrapper')

    let userNameTitle = document.createElement('h1');
    userNameTitle.textContent = name;
    userNameTitle.classList.add('user-name')

    let userUsername = document.createElement('span');
    userUsername.textContent = `(${username})`;
    userUsername.classList.add('username-text')

    nameWrapper.append(userNameTitle, userUsername)



    let userCompanyWrapper = document.createElement('div');
    userCompanyWrapper.classList.add('user-company-wrapper')

    let userWebsite = document.createElement('a');
    userWebsite.textContent = website;
    userWebsite.href = './#'
    userWebsite.classList.add('user-web-item')

    let userCompanyName = document.createElement('span');
    userCompanyName.textContent = `Works @ ${companyName}`;
    userCompanyName.classList.add('user-company-item')

    userCompanyWrapper.append(userCompanyName, userWebsite)

    


    let userContactsTitle = document.createElement('ul');
    userContactsTitle.textContent = 'User contacts:';
    userContactsTitle.classList.add('user-contacts-list')

    let userPhone = document.createElement('li');
    userPhone.classList.add('user-list-item')

    let userPhoneLink = document.createElement('a');
    userPhoneLink.textContent = phone;
    userPhoneLink.classList.add('user-list-link')
    userPhoneLink.href = `tel:${phone}`
    
    userPhone.append(userPhoneLink)

    let userEmail = document.createElement('li');
    userEmail.classList.add('user-list-item')

    let userEmailLink = document.createElement('a');
    userEmailLink.textContent = firstLetterLowerCase(email);
    userEmailLink.classList.add('user-list-link')
    userEmailLink.href = `mailto:${firstLetterLowerCase(email)}`

    userEmail.append(userEmailLink)
    
    userContactsTitle.append(userPhone, userEmail);




    let userAddressWrapper = document.createElement('div');
    userAddressWrapper.classList.add('user-address-wrapper')

    let userAddress = `${street} street - ${suite}, ${city}, ${zipcode}`;
    let addressLink = document.createElement('a');
    addressLink.href = `https://www.google.com/maps/place/${lat}, ${lng}`;
    addressLink.target = '_blank';
    addressLink.classList.add('adress-link')
    let link = document.createTextNode(userAddress);
    addressLink.append(link);

    userAddressWrapper.append(addressLink)

    


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


    let albumsLinksWrapper = document.createElement('div');
    albumsLinksWrapper.classList.add('albums-link-wrapper');

    posts.map(post => {
        let postTitle = document.createElement('h4');
        postTitle.textContent = firstLetterUpperCase(post.title);
        postTitle.classList.add('user-post-title')

        let postBody = document.createElement('p');
        postBody.textContent = firstLetterUpperCase(post.body);
        postBody.classList.add('user-post-body')

        let postLink = document.createElement('a');
        postLink.href = `./post.html?post_id=${post.id}`;
        postLink.classList.add('post-link')
        console.log(postLink)

        postLink.append(postTitle, postBody);
        postsWrapper.append(postLink);

        albums.map(album => {
          let userAlbumTitle = document.createElement('h4');
          userAlbumTitle.textContent = firstLetterUpperCase(album.title);
          userAlbumTitle.classList.add('user-album-title')

          let albumLink = document.createElement('a');
          albumLink.href = `./album.html?album_id=${album.id}`;
          albumLink.classList.add('album-link')

          albumLink.append(userAlbumTitle);
          albumsLinksWrapper.append(albumLink)
          albumsWrapper.append(albumsLinksWrapper);
        })
    })
    userTextWrapper.append(nameWrapper, userCompanyWrapper, userContactsTitle, userAddressWrapper);

    userInfoWrapper.append(userPhotoWrapper, userTextWrapper)

    userWrapper.append(userInfoWrapper, postsWrapper, albumsWrapper);
    return userWrapper;

}
init()



