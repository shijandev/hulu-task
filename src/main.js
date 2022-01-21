import Data from './models/data.js';
import { getHomePageData } from './modules/api.js';
import { setupNavControls, currentItem } from './modules/controls.js';
import { dataLoader } from './modules/data-loader.js';
import {
  getImageUrl,
  getSectionTitle,
  getTitle,
  getImageId,
  getImageTile,
  addKeyListner,
  handleImageError,
} from './utils/index.js';

export const dataObj = new Data();
(async () => {
  const data = await getHomePageData();
  dataObj.setData(data);

  const rootElement = document.getElementById('root');

  const allContainers = data?.StandardCollection?.containers ?? [];
  allContainers.forEach((item, containerIndex) => {
    const sectionElement = document.createElement('section');
    sectionElement.classList.add('section');

    const titleElement = document.createElement('h3');
    titleElement.classList.add('section-title');

    titleElement.innerText = getSectionTitle(item);
    sectionElement.appendChild(titleElement);

    const itemsContainerElement = document.createElement('div');
    itemsContainerElement.classList.add('items-container');

    const allItems =
      item?.set?.items ??
      Array(15).fill({ image: { hero_title: { 1.4: {} } } });

    allItems.map((setItem, setIndex) => {
      const image = getImageTile(setItem);
      const imageElement = document.createElement('img');
      imageElement.classList.add('image');
      imageElement.src = getImageUrl(image);
      imageElement.height = '200';
      imageElement.width = '360';
      imageElement.alt = getTitle(setItem);
      handleImageError(imageElement);
      imageElement.id = getImageId([containerIndex, setIndex]);

      const currentVal = currentItem.getCurrentItem();
      if (currentVal[0] === containerIndex && currentVal[1] === setIndex) {
        imageElement.classList.add('image-active');
      }

      itemsContainerElement.appendChild(imageElement);
    });

    sectionElement.appendChild(itemsContainerElement);
    // dynamically load missing section data
    rootElement.appendChild(sectionElement);
    if (!item.set?.setId) {
      const refId = item.set.refId;
      const refType = item.set.refType;
      dataLoader(sectionElement, refId, refType, containerIndex);
    }
  });

  let controlListners = [];
  controlListners = setupNavControls(allContainers.length);

  let popupIsOpen = false;

  // Enter key listner
  addKeyListner('Enter', (event) => {
    event.preventDefault();
    if (!popupIsOpen) {
      const currentData = dataObj.getData();
      const currentItemValue = currentItem.getCurrentItem();
      // check if current item section is loaded
      if (
        currentData?.StandardCollection?.containers[currentItemValue[0]]?.set
          ?.items?.length
      ) {
        const currentItem =
          currentData?.StandardCollection?.containers[currentItemValue[0]]?.set
            ?.items[currentItemValue[1]];
        controlListners.map((each) => each());
        const modalRoot = document.getElementById('modal-root');
        const modalContent = document.getElementById('modal-content');
        const h1Element = document.createElement('h1');
        h1Element.classList.add('modal-title');
        h1Element.innerText = getTitle(currentItem);
        modalContent.appendChild(h1Element);

        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        const card = document.createElement('div');
        card.classList.add('card');
        const cardImage = document.createElement('img');
        cardImage.classList.add('card-image');
        const image = getImageTile(currentItem);
        cardImage.src = getImageUrl(image);
        handleImageError(cardImage);
        card.appendChild(cardImage);
        cardContainer.appendChild(card);
        modalContent.appendChild(cardContainer);
        modalRoot.classList.add('modal-open');
        popupIsOpen = true;
      }
    }
  });

  // Escape key listner
  addKeyListner('Escape', (event) => {
    event.preventDefault();
    if (popupIsOpen) {
      controlListners = setupNavControls(allContainers.length);
      const modalRoot = document.getElementById('modal-root');
      const modalContent = document.getElementById('modal-content');
      modalContent.textContent = '';
      modalRoot.classList.remove('modal-open');
      popupIsOpen = false;
    }
  });
})();
