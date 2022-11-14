import { useReducer } from 'react';
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import SearchField from './components/SearchField';
import SearchResults from './components/SearchResults';
import SearchArticleDetails from './components/SearchArticleDetails';


const reducer = (state, action) => {
  switch (action.type) {
    case 'incrementPageNumber':
      return {...state, page: state.page + 1}
    case 'resetPageNumber':
      return {...state, page: 1}
    case 'searchPhrase':
      return {...state, searchPhrase: action.payload}
    case 'setRequestedSearchPhrase':
      return {...state, requestedSearchPhrase: state.searchPhrase.trim()}
    case 'articles':
      return {...state, articles: action.payload}
    case 'numberOfTotalResults':
      return {...state, numberOfTotalResults: action.payload}
    case 'setArticleDetails':
        return {...state, articleDetails: action.payload}
    case 'isLoading':
        return {...state, isLoading: true}  
    case 'isNotLoading':
        return {...state, isLoading: false}    
    default:   
    throw new Error();
  }
}

const fetchArticles = async(searchPhrase, searchPage) => {
  const baseURL =""
  const apiPath="/everything";
  const query = "?q=" + searchPhrase;
  const pageSize = "&pageSize=" + "3";
  const page = "&page=" + searchPage;
  const requestUrl = baseURL + apiPath + query + pageSize + page;

  const result = await axios.get(requestUrl);
  const data = result.data;
  return data;
}

const Search = () => {
  
  const [state, dispatch] = useReducer(reducer, { pageSize: 3, page: 1, searchPhrase: '', articles: [], numberOfTotalResults: 0, articleDetails: null, isLoading: false})

  const { isLoading, isError, error } = useQuery({
    queryKey: ['search-articles', state.searchPhrase, state.page], 
    queryFn: () => fetchArticles(state.searchPhrase, state.page), 
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!state.searchPhrase,
    onSuccess: (data) => {
      dispatch({type: 'numberOfTotalResults', payload: data.totalResults});
      dispatch({type: 'isNotLoading'})
      if (state.page > 1) {
        dispatch({type: 'articles', payload: state.articles.concat(data.articles)});
      } else {
        dispatch({type: 'articles', payload: data.articles});
      }
    }
  });
  
  if (isLoading && state.searchPhrase !== '') {
    if (!state.isLoading) {
      dispatch({type:'isLoading'});
    }
  }

  if (isError) {
    console.log('Error on loading: ' + error)
    if (state.isLoading) {
      dispatch({type:'isNotLoading'});
    }
  }

  return (
    <div class="main-search">
      <div className="search" style={{width:700, display:'inline-block'}}>
        <SearchField 
          setSearchPhrase = {searchPhrase => {
            dispatch({type:'searchPhrase', payload:searchPhrase})
            dispatch({type:'resetPageNumber'})
            }
          }
        startSearch = {() => dispatch({type: 'startSearch'})}/>
        <SearchResults 
          searchPhrase = {state.searchPhrase}
          isLoading = {state.isLoading}
          articles = {state.articles}
          numberOfTotalResults = {state.numberOfTotalResults}
          setArticleDetails = {article => dispatch({type:'setArticleDetails', payload:article})}
        showMoreResults = {() => {dispatch({type: 'incrementPageNumber'})}} />
      </div>

      {state.articleDetails && 
      <div className="article-details" style={{width:500, display:'inline-block'}}>
          <SearchArticleDetails article = {state.articleDetails} />
      </div>}
    </div>
  )
}
export default Search