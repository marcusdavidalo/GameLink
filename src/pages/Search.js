import React, { useEffect } from 'react';
import usePageTitle from '../hooks/useTitle';

async function searchAPIData() {
  const API_KEY = process.env.REACT_APP;
  const API_URL = global.api.apiUrl;

  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
  );

  const data = await response.json();

  return data;
}

function Search() {
  usePageTitle(`GameLink | Search`);

  useEffect(() => {
    async function search() {
      const queryString = window.location.search;
      // console.log(queryString);
      const urlParams = new URLSearchParams(queryString);
      // console.log(urlParams);
      global.search.type = urlParams.get('type');
      global.search.term = urlParams.get('search-term');

      if (global.search.term !== '' && global.search.term !== null) {
        const results = await searchAPIData();
        console.log(results);
      } else {
        showAlert('Please enter search term', 'error');
      }
    }
    search();
  }, []);

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
