function header() {
    const headerElement  = document.createElement('header');
    const nav = document.createElement('nav');
    nav.classList.add('main-navigation');
    const menuNavWrapper = document.createElement('div');
    menuNavWrapper.classList.add('menu-nav-wrapper')
    const logo = document.createElement('a')
    logo.textContent = 'API website';
    logo.classList.add('logo-link')
    logo.href = './index.html';
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
    searchForm.action = "./search.html";

    let navigationArr = [
        {
            name: 'Home',
            path: 'index.html'
        },
        {
            name: 'Users',
            path: 'users.html'
        },
        {
            name: 'Posts',
            path: 'posts.html'
        },
        {
            name: 'Albums',
            path: 'albums.html'
        }
    ]

    navigationArr.map(arr => {
        let title = arr.name;
        let path = arr.path;
        const menuItemElement = document.createElement('li');
        menuItemElement.classList.add('menu-item');

        if (location.pathname === '/' + path) {
            menuItemElement.classList.add('active');
        }

        const menuLink = document.createElement('a');
        menuLink.textContent = title;
        menuLink.href = './' + path;
        menuLink.classList.add('navigation-item')

        menuItemElement.append(menuLink);
        menuList.append(menuItemElement);
    })

    searchForm.append(searchInput, searchButton)
    menuNavWrapper.append(searchForm, menuList);
    nav.append(logo, menuNavWrapper)
    headerElement .append(nav);
    return headerElement ;
}
export default header;