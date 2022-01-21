import CurrentItem from '../models/current-item.js';
import { addKeyListner, getImageId } from '../utils/index.js';

export const currentItem = new CurrentItem();

const updateImageActive = (currentItemVal, newCurrentItem) => {
  const currentImage = document.getElementById(getImageId(currentItemVal));
  currentImage.classList.remove('image-active');
  const newImage = document.getElementById(getImageId(newCurrentItem));
  newImage.classList.add('image-active');
  newImage.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'nearest',
  });
};

export const setupNavControls = (maxDown = 13) => {
  const maxRight = 15; // TODO: get this from the data
  const arrowUpListener = addKeyListner('ArrowUp', (event) => {
    event.preventDefault();
    const currentVal = currentItem.getCurrentItem();
    const newCurrentItem = [
      currentVal[0] > 0 ? currentVal[0] - 1 : 0,
      currentVal[1],
    ];
    currentItem.setCurrentItem(newCurrentItem);
    updateImageActive(currentVal, newCurrentItem);
  });
  const arrowDownListener = addKeyListner('ArrowDown', (event) => {
    event.preventDefault();
    const currentVal = currentItem.getCurrentItem();
    const newCurrentItem = [
      currentVal[0] < maxDown - 1 ? currentVal[0] + 1 : maxDown - 1,
      currentVal[1],
    ];
    currentItem.setCurrentItem(newCurrentItem);
    updateImageActive(currentVal, newCurrentItem);
  });
  const arrowRightListener = addKeyListner('ArrowRight', (event) => {
    event.preventDefault();
    const currentVal = currentItem.getCurrentItem();
    const newCurrentItem = [
      currentVal[0],
      currentVal[1] < maxRight - 1 ? currentVal[1] + 1 : maxRight - 1,
    ];
    currentItem.setCurrentItem(newCurrentItem);
    updateImageActive(currentVal, newCurrentItem);
  });
  const arrowLeftListener = addKeyListner('ArrowLeft', (event) => {
    event.preventDefault();
    const currentVal = currentItem.getCurrentItem();
    const newCurrentItem = [
      currentVal[0],
      currentVal[1] > 0 ? currentVal[1] - 1 : 0,
    ];
    currentItem.setCurrentItem(newCurrentItem);
    updateImageActive(currentVal, newCurrentItem);
  });

  return [
    arrowUpListener,
    arrowDownListener,
    arrowRightListener,
    arrowLeftListener,
  ];
};
