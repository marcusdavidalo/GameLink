import React from 'react';

async function searchAPIData() {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
  );

  const data = await response.json();

  return data;
}

function Search() {
  return async function search() {
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams);
    const showAlert = (global.search.type = urlParams.get('type'));
    global.search.term = urlParams.get('search-term');

    if (global.search.term !== '' && global.search.term !== null) {
      const results = await searchAPIData();
      console.log(results);
    } else {
      showAlert('Please enter search term');
    }
  };
  function showAlert(message, className) {
    const alertEl = document.createElement('div');
    alertEl.classList.add('alert', className);
    alertEl.appendChild(document.createTextNode(message));
    document.querySelector('#alert').appendChild(alertEl);

    setTimeout(() => alertEl.remove(), 3000);
  }
  return (
    <section className="search">
      <div className="container">
        <div id="alert"></div>
        <form action="./search.html" className="search-form">
          <div className="search-flex">
            <input
              type="text"
              name="search-term"
              id="search-term"
              placeholder="Enter search term"
            />
            <button className="btn" type="submit">
              <i className=""></i>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Search;
