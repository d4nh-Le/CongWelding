const BASE_URL = "https://localhost:5000/api/";

export const publicRequest = (url, options) => {
  const requestUrl = BASE_URL + url;
  return fetch(requestUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};

export const userRequest = (url, options) => {
  const requestUrl = BASE_URL + url;
  return fetch(requestUrl, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};