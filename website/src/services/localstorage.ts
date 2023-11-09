export const LocalStorageService = {
  setItem: (key: string, value: string) => {
    window.localStorage.setItem(key, value);
  },

  getItem: (key: string) => {
    return window.localStorage.getItem(key);
  },

  removeItem: (key: string) => {
    window.localStorage.removeItem(key);
  },
};
