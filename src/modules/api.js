// get data from api endpoint https://cd-static.bamgrid.com/dp-117731241344/home.json
export const getHomePageData = () => {
  return fetch('https://cd-static.bamgrid.com/dp-117731241344/home.json')
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
    });
};

// get data from api endpoint https://cd-static.bamgrid.com/dp-117731241344/sets/${refId}.json
export const getDataByRefId = (refId) => {
  return fetch(
    `https://cd-static.bamgrid.com/dp-117731241344/sets/${refId}.json`
  )
    .then((response) => response.json())
    .then((data) => data.data)
    .catch((error) => {
      console.error(error);
    });
};
