import { navigationElement } from "./header.js";
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
    const header = navigationElement();

    pageContent.append(albumsList);
    pageContent.before(header)
}

function createAlbumsListElement(albums) {
    let albumsList = document.createElement('div');
    albumsList.classList.add('albums-list');
    
    albums.forEach(album => {
        let albumTitle = firstLetterUpperCase(album.title);
        let userName = album.user.name;
        
        let photoCount = album.photos.length
        let randomIndex = Math.floor(Math.random() * album.photos.length);
        let randomPhoto = album.photos[randomIndex];
        
        let albumItem = document.createElement('div')
        albumItem.classList.add('album-item');

        let a = document.createElement('a');
        a.href = `./album.html?album_id=${album.id}`

        let photoElement = document.createElement('img');
        photoElement.src = randomPhoto.thumbnailUrl
        photoElement.title = randomPhoto.title

        const albumPlace = document.createElement('p');
        albumPlace.textContent = `${albumTitle} (${photoCount}), author: ${userName}`

        a.append(photoElement, albumPlace)
        albumItem.append(a)

        albumsList.append(albumItem)
    })
    return albumsList
}
init()

