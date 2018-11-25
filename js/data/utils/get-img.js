import images from './../game-images.js';

const getRandom = (len) => Math.floor(Math.random() * (len));

const getImgList = () => {
  let type = [...images.keys()][getRandom(images.size)];
  let typeList = images.get(type);

  return Array.from(typeList.values());
};

const getImg = () => {
  let imgUrlList = getImgList();
  let a = getRandom(imgUrlList.length);

  return imgUrlList[a];
};

export {getImg};
