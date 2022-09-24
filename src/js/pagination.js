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
console.log(page);
unsplashAPI.getPopularFotos(page).then(data => {
  console.log(data);
  pagination.reset(data.total);
});

const popular = event => {
  const currentPage = event.page;
  unsplashAPI.getPopularFotos(currentPage).then(data => {
    console.log(data);
  });
  console.log(currentPage);
};

pagination.on('afterMove', popular);
