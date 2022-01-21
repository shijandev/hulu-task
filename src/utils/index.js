import disneyplus from '../disneyplus.jpeg';

export const getSectionTitle = (item) => {
  const title =
    item?.set?.text?.title?.full?.set?.default?.content ?? 'Section Title';
  return title;
};

export const getTitle = (item) => {
  const title =
    item?.text?.title?.full?.collection?.default?.content ||
    item?.text?.title?.full?.series?.default?.content ||
    item?.text?.title?.full?.default?.default?.content ||
    item?.text?.title?.full?.program?.default?.content ||
    'hulu disney plus';
  return title;
};

export const getImageUrl = (item) => {
  const image =
    item?.collection?.default?.url ||
    item?.series?.default?.url ||
    item?.default?.default?.url ||
    item?.program?.default?.url ||
    disneyplus; //'disneyplus.jpeg';
  return image;
};

export const getImageTile = (item) => {
  const imageHeroTiles = item.image?.hero_tile ?? {};
  const imageTiles = item.image?.tile ?? {};
  const imageBackgound = { ...imageHeroTiles, ...imageTiles };
  const allImages = Object.values(imageBackgound);
  const allImagesAspectRatios = Object.keys(imageBackgound).map(Number);
  // get index of allImagesAspectRatios greater than 1 and less than 2
  const aspectRatioIndex = allImagesAspectRatios.findIndex(
    (eachRatio) => eachRatio > 1 && eachRatio < 2
  );
  const image =
    aspectRatioIndex !== -1
      ? allImages[aspectRatioIndex]
      : allImages[allImages.length - 1];
  return image;
};

export const addKeyListner = (key, cb) => {
  function handle(event) {
    if (event.code === key) {
      cb(event);
    }
  }
  document.addEventListener('keyup', handle);
  return () => document.removeEventListener('keyup', handle);
};

export const getImageId = (currentItem) => {
  return `${currentItem[0]}-${currentItem[1]}`;
};

export const handleImageError = (image) => {
  image.onerror = () => {
    image.src = disneyplus; //'disneyplus.jpeg';
  };
};
