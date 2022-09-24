import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { UnsplashAPI } from './UnsplashAPI';
const unsplashAPI = new UnsplashAPI();

const options = {
  totalItems: 0,
  itemsPerPage: 5,
  visiblePages: 3,
  page: 1,
};

const pagination = new Pagination('pagination', options);

const page = pagination.getCurrentPage();

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.search.value;
  console.log(searchQuery);

  if (!searchQuery) {
    return;
  }
  unsplashAPI.query = searchQuery;
  pagination.off('afterMove', popular);
  pagination.off('afterMove', userByQuery);

  pagination.on('afterMove', userByQuery);
  unsplashAPI.getFotosByQuery(page).then(data => {
    console.log(data);
    pagination.reset(data.total);
  });
}

console.log(page);
unsplashAPI.getPopularFotos(page).then(data => {
  console.log(data);
  pagination.reset(data.total);
});

function popular(event) {
  const currentPage = event.page;
  unsplashAPI.getPopularFotos(currentPage).then(data => {
    console.log(data);
  });
  console.log(currentPage);
}

pagination.on('afterMove', popular);

function userByQuery(event) {
  const currentPage = event.page;
  unsplashAPI.getFotosByQuery(currentPage).then(data => {
    console.log(data);
  });
  console.log(currentPage);
}
