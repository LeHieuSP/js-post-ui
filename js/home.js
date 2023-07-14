import relativeTime from 'dayjs/plugin/relativeTime';
import postApi from './api/postApi';
import { getUlPagination, setTextContent, truncateText } from './utils';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

function createPostElement(post) {
  if (!post) return;

  // find and clone template
  const postTemplate = document.getElementById('postTemplate');
  if (!postTemplate) return;

  const liElement = postTemplate.content.firstElementChild.cloneNode(true);

  if (!liElement) return;

  // update  titile, author, desc, thumbnail

  setTextContent(liElement, '[data-id="title"]', post.title);
  setTextContent(liElement, '[data-id="description"]', truncateText(post.description, 100));
  setTextContent(liElement, '[data-id="author"]', post.author);

  // caculate timespan
  // console.log('timespan', dayjs(post.updatedAt).fromNow());
  setTextContent(liElement, '[data-id="timeSpan"]', ` - ${dayjs(post.updatedAt).fromNow()}`);

  // const titleElement = liElement.querySelector('[data-id="title"]');
  // if (titleElement) titleElement.textContent = post.title;

  // const descriptionElement = liElement.querySelector('[data-id="description"]');
  // if (descriptionElement) descriptionElement.textContent = post.description;

  // const authorElement = liElement.querySelector('[data-id="author"]');
  // if (authorElement) authorElement.textContent = post.author;

  const thumbnailElement = liElement.querySelector('[data-id="thumbnail"]');
  if (thumbnailElement) {
    thumbnailElement.src = post.imageUrl;

    thumbnailElement.addEventListener('error', () => {
      thumbnailElement.src =
        'https://plus.unsplash.com/premium_photo-1673111862841-e5178d4de373?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60';
    });
  }

  return liElement;
}

function renderPostList(postList) {
  console.log({ postList });

  if (!Array.isArray(postList) || postList.length === 0) return;

  const ulElement = document.getElementById('postList');
  if (!ulElement) return;

  postList.forEach((post) => {
    const liElement = createPostElement(post);
    ulElement.appendChild(liElement);
  });
}

function renderPagination(pagination) {
  const ulPagination = getUlPagination();

  if (!pagination || !ulPagination) return;

  // calc totalPages
  const { _page, _limit, _totalRows } = pagination;
  const totalPages = Math.ceil(_totalRows / _limit);
  // save page and totalPages to ulPagination
  ulPagination.dataset.page = _page;
  ulPagination.dataset.totalPages = totalPages;

  // check enable/disable prev/next click

  if (_page <= 1) ulPagination.firstElementChild?.classList.add('disabled');
  else ulPagination.firstElementChild?.classList.remove('disabled');

  if (_page >= totalPages) ulPagination.lastElementChild?.classList.add('disabled');
  else ulPagination.lastElementChild?.classList.remove('disabled');
}

function handleFilterChange(filterName, filterValue) {
  // update query params
  const url = new URL(window.location);
  url.searchParams.set(filterName, filterValue);
  history.pushState({}, '', url);

  //
}

function handlePrevClick(e) {
  console.log('prev link');
  e.preventDefault();
}

function handleNextClick(e) {
  console.log('next link');
  e.preventDefault();
}

function initPagination() {
  const ulPagination = getUlPagination();

  if (!ulPagination) return;

  const prevLink = ulPagination.firstElementChild?.firstElementChild;
  if (prevLink) {
    prevLink.addEventListener('click', handlePrevClick);
  }

  const nextLink = ulPagination.lastElementChild?.lastElementChild;
  if (nextLink) {
    nextLink.addEventListener('click', handleNextClick);
  }
}

function initURL() {
  const url = new URL(window.location);

  // update searh params if needed
  if (!url.searchParams.get('_page')) url.searchParams.set('_page', 1);
  if (!url.searchParams.get('_limit')) url.searchParams.set('_limit', 6);
  history.pushState({}, '', url);
}

(async () => {
  try {
    initPagination();
    initURL();

    const queryParams = new URLSearchParams(window.location.search);
    console.log(queryParams.toString());
    const { data, pagination } = await postApi.getAll(queryParams);
    renderPostList(data);
    renderPagination(pagination);
  } catch (error) {
    console.log('get all faied', error);
  }
})();
