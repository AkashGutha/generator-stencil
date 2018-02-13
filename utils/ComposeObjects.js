function composeObjs(...args) {
  const arguments = args;
  let obj = {};
  for (const argument of arguments) {
    obj = { ...obj, ...argument }
  }
  return obj;
};

module.exports = composeObjs;
