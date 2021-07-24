function defineReactive(data, key, val) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log('get: ', val);
      return val;
    },
    set(newVal) {
      console.log('set: ', newVal);
      if (val === newVal) return;
      val = newVal;
    }
  })
}