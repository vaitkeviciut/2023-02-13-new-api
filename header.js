export function navigationElement() {
    const header = document.createElement('header');
    const nav = document.createElement('nav');
    nav.classList.add('main-navigation');
    const menuList = document.createElement('ul');
    menuList.classList.add('menu');

    const searchForm = document.createElement('form');
    searchForm.classList.add('search-form');
    const searchInput = document.createElement('input');
    searchInput.classList.add('search-input');
    searchInput.setAttribute('placeholder', 'Type to search');
    searchInput.setAttribute('name', 'search');
    const searchButton = document.createElement('input');
    searchButton.classList.add('search-button');
    searchButton.setAttribute('type', 'submit');
    searchButton.setAttribute('value', 'Search');
    

    let navigationArr = [
        {
            name: 'Home',
            src: 'index.html'
        },
        {
            name: 'Users',
            src: 'users.html'
        },
        {
            name: 'Albums',
            src: 'albums.html'
        },
        {
            name: 'Posts',
            src: 'posts.html'
        }
    ]

    navigationArr.map(arr => {
        let name = arr.name;
        let src = arr.src;
        const menuItemElement = document.createElement('li');
        menuItemElement.classList.add('menu-item');

        if (location.pathname === '/' + src) {
            menuItemElement.classList.add('active');
        }
      
        let menuLink = document.createElement('a');
        menuLink.href = '/' + src
        let link = document.createTextNode(name)
        menuLink.append(link)
        menuLink.classList.add('navigation-item', 'active')

        menuItemElement.append(menuLink);
        menuList.append(menuItemElement);
    })
    searchForm.append(searchInput, searchButton)
    nav.append(searchForm, menuList);
    header.append(nav);
    return header;
}

    

