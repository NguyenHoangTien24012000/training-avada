const URL_BASE = "https://jsonplaceholder.typicode.com";

//facade

const fetchData = async (resource) => {
  try {
    const response = await fetch(URL_BASE + resource);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};


module.exports = fetchData;