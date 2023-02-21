import { navigationElement } from "./header.js";
import { firstLetterUpperCase } from './functions.js';

async function init() {
    const queryParams = location.search;
    const urlParams = new URLSearchParams(queryParams);
    const id = urlParams.get('album_id');

    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${id}?_expand=user&_embed=photos`);
    const album = await res.json();
    console.log(album);

    const pageContent = document.querySelector('#page-content');
    const albumWrapper = createUserAlbumElement(album);
    const header = navigationElement();

    pageContent.append(albumWrapper)
    pageContent.before(header)
}

function createUserAlbumElement(album) {
    let { title, photos, user } = album;
    let userName = user.name;

    let albumWrapper = document.createElement('div');
    albumWrapper.classList.add('album-wrapper');


    let userAlbumWrapper = document.createElement('div');
    userAlbumWrapper.classList.add('user-album-wrapper');
    let albumTitle = document.createElement('h3')
    albumTitle.textContent = firstLetterUpperCase(title);

    let userNameLink = document.createElement('a');
    userNameLink.href = `./user.html?user_id=${user.id}`;

    userNameLink.append(userName);
    userAlbumWrapper.append(albumTitle, userNameLink)


    let photoWrapper = document.createElement('div');
    photoWrapper.classList.add('photo-wrapper');

    photos.map(photo => {
        let { title, thumbnailUrl, url } = photo;

        const photoLink = document.createElement('a');
        photoLink.href = url;
        photoLink.target = '_blank';
        photoLink.title = title;

        const photoImg = document.createElement('img');
        photoImg.src = thumbnailUrl;
        photoImg.alt = title

        photoLink.append(photoImg);
        photoWrapper.append(photoLink);
    })
    albumWrapper.append(userAlbumWrapper, photoWrapper)
    return albumWrapper
}

init();