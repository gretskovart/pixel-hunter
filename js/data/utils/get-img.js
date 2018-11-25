import images from './../game-images.js';

const getRandom = (arr, len) => Math.floor(Math.random() * (len));

let getImg = () => {
  let type = [...images.keys()][getRandom(images, images.size)];
  let typeList = images.get(type);
  let imgUrlList = Array.from(typeList.values());

  let a = getRandom(imgUrlList, imgUrlList.length);

  return imgUrlList[a];
};

export default getImg;
