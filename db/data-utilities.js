exports.createUsersRef = (users) => {
  const refObj = {};
  for (i = 0; i < users.length; i++) {
    const fullName = users[i].first_name + " " + users[i].surname;
    refObj[fullName] = users[i].user_id;
  }
  return refObj;
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
