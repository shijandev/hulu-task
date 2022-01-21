import { getDataByRefId } from './api.js';
import { dataObj } from '../main.js';
import { getImageId, getImageUrl, getImageTile } from '../utils/index.js';

export const dataLoader = (element, refId, refType, currentIndex) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getDataByRefId(refId).then((data) => {
            const newSetData = data[refType] || data.CuratedSet;
            const prevData = dataObj.getData();
            const newData = { ...prevData };
            newData.StandardCollection.containers[currentIndex].set = {
              ...newSetData,
              ...newData.StandardCollection.containers[currentIndex].set,
            };
            dataObj.setData(newData);
            // setup image src for just loaded sets
            newSetData.items.map((setItem, index) => {
              const image = getImageTile(setItem);
              const imageElement = document.getElementById(
                getImageId([currentIndex, index])
              );
              imageElement.src = getImageUrl(image);
            });
          });
          observer.disconnect();
        }
      });
    },
    {
      rootMargin: '0px',
    }
  );
  observer.observe(element);
};
