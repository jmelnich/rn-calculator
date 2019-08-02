export const convertToHex = (...arr) => {
  return arr.map(item => parseInt(item) ? parseInt(item).toString(16) : item);
};
