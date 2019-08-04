export const convertToHex = (...arr) => {
  return arr.map(item => parseInt(item)
    ? `0x${parseInt(item).toString(16).toUpperCase()}`
    : item);
};

export const convertFromHex = (val) => {
  return parseInt(val, 16);
};
