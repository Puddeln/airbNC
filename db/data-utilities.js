exports.createRef = (key, value, data) => {
  return data.reduce((refObj, row) => {
    refObj[row[key]] = row[value];
    return refObj;
  }, {});
};

exports.formatData = (refObj, keyToRemove, keyToAdd, rawData) => {
  return rawData.map(({ [keyToRemove]: removedKey, ...row }) => {
    return { ...row, [keyToAdd]: refObj[removedKey] };
  });
};

////function that takes and array of objects and returns an array of arrays
//exports.formatArrayOfObjects(array) {
//  if (Array.isArray(array)) {
//    let outputData = array.map((obj) => Object.values(obj));
//    return outputData;
//  } else {
//    console.log("argument is not an array");
//  }
//}
