function composeObjs(...args) {
  let obj = {};
  for (const argument of args) {
    obj = { ...obj, ...argument };
  }
  return obj;
}

module.exports = composeObjs;
