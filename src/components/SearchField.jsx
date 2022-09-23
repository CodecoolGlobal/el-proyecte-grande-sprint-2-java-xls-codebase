import React, { useState, useReducer } from 'react';
import SearchResults from './SearchResults';

const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementPageNumber':
      return {...state, page: state.page + 1}
    case 'resetPageNumber':
      return {...state, page: 1}
    case 'searchPhrase':
      return {...state, searchPhrase: action.payload}
      case 'articles':
        return {...state, articles: action.payload}
      case 'totalResults':
        return {...state, totalResults: action.payload}
    default: 
    throw new Error();
  }
}

const SearchField = () => {
  
  const [state, dispatch] = useReducer(reducer, { pageSize: 3, page: 1, searchPhrase: '',  articles: [], totalResults: 0})

  const handleSearchPhraseChange = (event) => {
    dispatch({type: 'searchPhrase', payload: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({type: 'resetPageNumber'});
    contactServer();
  }
  
  const showNextResults = () => {
    contactServer(true);
    dispatch({type: 'incrementPageNumber'});
  }

  const contactServer = async (nextResults = false) => {
    let baseUrl=""
    let apiPath="/everything";
    let query = "?q=" + state.searchPhrase;
    let pageSize = "&pageSize=" + state.pageSize;
    let pageNumber = "&page=" + (nextResults ? (state.page + 1) : 1);
    let requestUrl = baseUrl + apiPath + query + pageSize + pageNumber;

    let response = await fetch(requestUrl);
    let articleResponse = await response.json();
    if (articleResponse.status === "ok") {
      dispatch({type: 'totalResults', payload: articleResponse.totalResults});
      if (nextResults) {
        dispatch({type: 'articles', payload: state.articles.concat(articleResponse.articles)});
      } else {
        dispatch({type: 'articles', payload: articleResponse.articles});
      }
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={state.searchPhrase} required onChange={handleSearchPhraseChange}></input>
        <input type="submit" value="Snoop"></input>
      </form>
      <SearchResults articles = {state.articles} />
      {state.articles.length > 0 &&
          <div className="show-next">
            <p>Showing {state.articles.length } of {state.totalResults} results.</p>
            {state.articles.length < state.totalResults && 
              <button onClick={showNextResults}>Show More Results</button>
            }
          </div>
      }
    </div>
  )
}
export default SearchField