import header from "./header.js";
import { firstLetterUpperCase } from "./functions.js";

async function init() {
    const res = await fetch('https://jsonplaceholder.typicode.com/albums?_expand=user&_embed=photos')
    const albums = await res.json();
    console.log(albums);

    if (!albums.length || albums.length === 0) {
        return;
      }

    const pageContent = document.querySelector('#page-content');
    const albumsList = createAlbumsListElement(albums);
    const headerElement = header();

    pageContent.append(albumsList);
    pageContent.before(headerElement)
}

function createAlbumsListElement(albums) {
    let albumsListWrapper = document.createElement('div');
    albumsListWrapper.classList.add('albums-list-wrapper');
    
    albums.forEach(album => {
        let albumItem = document.createElement('div');
        albumItem.classList.add('album-item');

        let albumLink = document.createElement('a');
        albumLink.href = `./album.html?album_id=${album.id}`;
        albumLink.classList.add('album-link')

        let albumTextWrapper = document.createElement('div');
        albumTextWrapper.classList.add('album-text-wrapper');

        let albumTitle = document.createElement('h3');
        albumTitle.textContent = firstLetterUpperCase(album.title);
        albumTitle.classList.add('album-title');

        let photoCount = document.createElement('span');
        photoCount.textContent = `(${album.photos.length})`
        photoCount.classList.add('photo-count');

        albumTitle.append(photoCount)

        let randomIndex = Math.floor(Math.random() * album.photos.length);
        let randomPhoto = album.photos[randomIndex];

        let photoElement = document.createElement('img');
        photoElement.src = randomPhoto.thumbnailUrl;
        photoElement.title = randomPhoto.title;
        photoElement.width = '235'

        let authorWrapper = document.createElement('div');
        authorWrapper.classList.add('author-wrapper')

        let userName = document.createElement('p');
        userName.textContent = album.user.name;
        userName.classList.add('user-name-albums');
    
        authorWrapper.append(userName)
        albumTextWrapper.append(albumTitle, authorWrapper)


        albumLink.append(photoElement, albumTextWrapper);
        albumItem.append(albumLink);

        albumsListWrapper.append(albumItem);
    })
    return albumsListWrapper
}
init()

