// localStorageService.jsx
const localStorageService = {
  getData: (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
  setData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  },
};

export default localStorageService;
