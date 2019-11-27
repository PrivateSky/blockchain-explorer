const TEST_KEY = "__test";
let storage = null;

class MemoryStorage {
  constructor() {
    this._data = {};
  }

  getItem(key) {
    return this._data.hasOwnProperty(key) ? this._data[key] : null;
  }

  setItem(key, value) {
    return (this._data[key] = String(value));
  }

  removeItem(key) {
    return delete this._data[key];
  }

  clear() {
    return (this._data = {});
  }
}

function hasStorage(name) {
  try {
    const storage = window[name];
    storage.setItem(TEST_KEY, "1");
    storage.removeItem(TEST_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

function init() {
  if (hasStorage("localStorage")) {
    storage = window.localStorage;
  } else if (hasStorage("sessionStorage")) {
    storage = window.sessionStorage;
  } else {
    storage = new MemoryStorage();
  }
}

function getItem(key) {
  let storedItemString = storage.getItem(key);
  let storedItem;

  try {
    storedItem = JSON.parse(storedItemString);
  } catch (error) {
    storedItem = storedItemString;
  }

  return storedItem;
}

function setItem(key, value) {
  return storage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
  return storage.removeItem(key);
}

function clear() {
  return storage.clear();
}

export { init, getItem, setItem, removeItem, clear };
