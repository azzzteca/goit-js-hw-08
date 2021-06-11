import items from './apps.js';

const galleryEl = document.querySelector(".js-gallery");

const newItems = items
.map(item => `<li class="gallery__item"><img class="gallery__image" src="${item.preview}" alt="${item.description}"/></li>`)
.join("");

galleryEl.innerHTML = newItems;

galleryEl.addEventListener("click", evt => {
    console.log(`проверяем клик на диве`);
})