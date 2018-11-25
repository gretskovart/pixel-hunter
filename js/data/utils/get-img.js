import images from './../game-images.js';

const getRandom = (len) => Math.floor(Math.random() * (len));

const getImgList = () => [...images.keys()][getRandom(images.size)];

let type = getImgList();

const getImg = () => {
  let typeList = images.get(type);
  let imgUrlList = Array.from(typeList.values());
  let a = getRandom(imgUrlList.length);

  return imgUrlList[a];
};

export {getImg};
