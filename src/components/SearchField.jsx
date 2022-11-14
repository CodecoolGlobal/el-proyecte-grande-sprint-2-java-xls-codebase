import { notifyManager } from '@tanstack/react-query';
import React, { useReducer } from 'react';
import SearchResults from './SearchResults';

const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementPageNumber':
      return {...state, page: state.page + 1}
    case 'resetPageNumber':
      return {...state, page: 1}
    case 'searchPhrase':
      return {...state, searchPhrase: action.payload}
    case 'setRequestedSearchPhrase':
      return {...state, requestedSearchPhrase: state.searchPhrase}
    case 'articles':
      return {...state, articles: action.payload}
    case 'totalResults':
      return {...state, totalResults: action.payload}
    case 'articleDetails':
        return {...state, articleDetails: action.payload}
    default:   
    throw new Error();
  }
}

const SearchField = () => {
  
  const [state, dispatch] = useReducer(reducer, { pageSize: 3, page: 1, searchPhrase: '',  articles: [], totalResults: 0, articleDetails: null})

  const handleSearchPhraseChange = (event) => {
    dispatch({type: 'searchPhrase', payload: event.target.value})
    console.log(state.searchPhrase)
  }

  const handleSubmit = (event) => {
    dispatch({type: 'resetPageNumber'});
    dispatch({type: 'setRequestedSearchPhrase'})
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
      <form onSubmit={event => {
        event.preventDefault();
        handleSubmit(event);
        }}>
        <input type="text" value={state.searchPhrase} required onChange={handleSearchPhraseChange}></input>
        <input type="submit" value="Snoop"></input>
      </form>
      <SearchResults 
      requestedSearchPhrase = {state.requestedSearchPhrase} 
      totalResults = {state.totalResults} 
      articles = {state.articles} 
      articleDetails = {state.articleDetails}
      setArticleDetails={article => dispatch({type:'articleDetails', payload:article})}
      showNextResults = {showNextResults}
      />
    </div>
  )
}
export default SearchField