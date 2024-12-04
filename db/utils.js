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
