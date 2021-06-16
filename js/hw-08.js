import items from './apps.js';

const galleryEl = document.querySelector(".js-gallery");
const modalEl = document.querySelector(".js-lightbox");
const buttonCloseEl = document.querySelector(".lightbox__button");
const overlayEl = document.querySelector(".lightbox__overlay");
const imageModalEl = document.querySelector(".lightbox__image");

const newItems = items
.map(({original, preview, description}) => `<li class="gallery__item">
<a class="gallery__link" href="${original}">
<img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
</a>
</li>`)
.join("");

// galleryEl.insertAdjacentHTML("beforeend", newItems);
galleryEl.innerHTML = newItems;

galleryEl.addEventListener("click", onModalOpen);

const photosEl = document.querySelectorAll(".gallery__image");
const photosInModalEl = document.querySelector(".lightbox__image");

function onModalOpen (evt){ 
    if (!evt.target.classList.contains ("gallery__image")) {
        return;
    };

    evt.preventDefault();

    modalEl.classList.add("is-open");
    imageModalEl.src = evt.target.dataset.source;
    imageModalEl.alt = evt.target.alt;

    buttonCloseEl.addEventListener("click", onModalClose);
    overlayEl.addEventListener("click", onModalClose); 
    window.addEventListener("keydown", onKeyDownActionInOpenedModal);
};

function onKeyDownActionInOpenedModal (evt) {
    if (evt.code === "Escape") {

        onModalClose(evt);
    };
    
    if (evt.code !== "ArrowRight" && evt.code !== "ArrowLeft") {
        return;
    }

    for (let i = 0; i < photosEl.length; i +=1) {

        if (photosEl[i].dataset.source === photosInModalEl.src) {

            if (evt.code === "ArrowRight") {
                if (i === photosEl.length - 1) {
                    return;
                };
        
                photosInModalEl.src = photosEl[i + 1].dataset.source;
                photosInModalEl.alt = photosEl[i + 1].alt;
                return;
            };

            if (evt.code === "ArrowLeft") {
                if (i === 0) {
                    return;
                };
        
                photosInModalEl.src = photosEl[i - 1].dataset.source;
                photosInModalEl.alt = photosEl[i - 1].alt;
                return;
            };
        };


        };
    };

function onModalClose (evt) {
    modalEl.classList.remove("is-open");

    imageModalEl.src = "";
    imageModalEl.alt = "";

    buttonCloseEl.removeEventListener("click", onModalClose);
    overlayEl.removeEventListener("click", onModalClose); 
    window.removeEventListener("keydown", onKeyDownActionInOpenedModal);
};

