import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");
gallery.addEventListener("click", openImages);

const galleryMarkup = galleryItems
  .map(
    (item) => `
    <li class='gallery__item'>
        <a class='gallery__link' href='${item.original}'>
            <img 
                class='gallery__image'
                src='${item.preview}'
                alt='${item.description}'
                data-source='${item.original}'
            >
        </a>
    </li>`
  )
  .join("");
gallery.innerHTML = galleryMarkup;

const modal = basicLightbox.create(
  `
      <img
          src=''
      >
`,
  {
    onShow: (modal) => {
      document.addEventListener("keydown", closeImages);
    },
    onClose: (modal) => {
      document.removeEventListener("keydown", closeImages);
    },
  }
);

function openImages(event) {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  modal.element().querySelector("img").src =
    event.target.getAttribute("data-source");
  modal.show();
}

function closeImages(event) {
  if (event.code === "Escape") {
    modal.close();
  }
}
