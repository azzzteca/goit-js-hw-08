import items from './apps.js';

const galleryEl = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".js-lightbox");
const buttonCloseEl = document.querySelector(".lightbox__button");
const overlayEl = document.querySelector(".lightbox__overlay");

const newItems = items
.map(({original, preview, description}) => `<li class="gallery__item">
<a class="gallery__link" href="${original}">
<img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
</a>
</li>`)
.join("");

galleryEl.insertAdjacentHTML("beforeend", newItems);

galleryEl.addEventListener("click", onModalOpen);

function onModalOpen (evt){
    if (!evt.target.classList.contains ("gallery__image")) {
        return;
    };

    evt.preventDefault();

    modalEl.classList.add("is-open");

    const imageModalEl = document.querySelector(".lightbox__image");
    
    imageModalEl.src = evt.target.dataset.source;
    imageModalEl.alt = evt.target.alt;

    buttonCloseEl.addEventListener("click", onModalClose);

    overlayEl.addEventListener("click", onModalClose);

    window.addEventListener("keydown", evt => {
        if (evt.code === "Escape") {
            onModalClose();
            return;
        };
        // if (evt.code === "") {

        //     return;
        // };
        // if (evt.code === "") {

        // }
    });



    
};

function onModalClose (evt) {
    modalEl.classList.remove("is-open");
    buttonCloseEl.removeEventListener("click", onModalClose);
    overlayEl.removeEventListener("click", onModalClose);
    window.removeEventListener("keydown", evt => {
        if (evt.code === "Escape") {
            onModalClose();
        };
    });
};

