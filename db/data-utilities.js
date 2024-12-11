// creates a lookup-object consisting of a concatenated first name and surname as a key and user_id as value
exports.createUsersRef = (users) => {
  const userRefObj = {};
  for (i = 0; i < users.length; i++) {
    const fullName = users[i].first_name + " " + users[i].surname;
    userRefObj[fullName] = users[i].user_id;
  }
  return userRefObj;
};

// creates a lookup-object consisting of a property name as a key and a property_id as a value
exports.createPropertiesRef = (properties) => {
  const propRefObj = {};
  for (i = 0; i < properties.length; i++) {
    const propertyName = properties[i].name;
    propRefObj[propertyName] = properties[i].property_id;
  }
  return propRefObj;
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
