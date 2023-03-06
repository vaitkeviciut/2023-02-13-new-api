export default function searchForm() {
  const form = document.createElement('form');
  form.classList.add('search-form-number-two');
  form.action = './search.html';

  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search...';
  searchInput.name = 'search-query';
  searchInput.classList.add('search-input')

  const searchFormButtonWrapper = document.createElement('div');
  searchFormButtonWrapper.classList.add('serach-form-button-wrapper')
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Search';
  submitButton.classList.add('search-button')

  searchFormButtonWrapper.append(submitButton)
  form.append(searchInput, searchFormButtonWrapper);

  return form;
}