import {useReducer} from 'react';
import {useQuery} from "@tanstack/react-query";

import axios from "axios";

import SearchField from './components/SearchField';
import SearchResults from './components/SearchResults';
import SearchArticleDetails from './components/SearchArticleDetails';
import {AppBar, Box, Toolbar} from '@mui/material';
import LoginButton from './../login/LoginButton';

import logo from '../../logo.svg'
import {Link} from 'react-router-dom';

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
    case 'emptyArticles':
      return {...state, articles: []}
    case 'numberOfTotalResults':
      return {...state, numberOfTotalResults: action.payload}
    case 'selectArticle':
      return {...state, selectedArticle: action.payload}
    case 'deselectArticle':
      return {...state, selectedArticle: NaN}
    case 'isLoading':
        return {...state, isLoading: true}  
    case 'isNotLoading':
        return {...state, isLoading: false}    
    default:   
    throw new Error();
  }
}

const fetchArticles = async(searchPhrase, searchPage) => {
  const baseURL ="http://127.0.0.1:8080"
  const apiPath="/everything";
  const query = "?q=" + searchPhrase;
  const pageSize = "&pageSize=" + "10";
  const page = "&page=" + searchPage;
  const requestUrl = baseURL + apiPath + query + pageSize + page;
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  const result = await axios.get(requestUrl);
  return result.data;
}

const Search = () => {
  
  const user = sessionStorage.getItem('user');
  const [state, dispatch] = useReducer(reducer, { pageSize: 3, page: 1, searchPhrase: '', articles: [], numberOfTotalResults: 0, selectedArticle:NaN, isLoading: false})

  const {isLoading, isError, error} = useQuery({
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
        dispatch({type: 'articles', payload: data.articles})
      }
    }
  });
  
  if (isLoading && state.searchPhrase !== '') {
    if (!state.isLoading) {
      dispatch({type:'isLoading'});
    }
    console.log('loading')
  }

  if (isError) {
    console.log('Error on loading: ' + error)
    if (state.isLoading) {
      dispatch({type:'isNotLoading'});
    }
    console.log('error')
  }

  return (
    <div>
      <AppBar elevation={0} color="inherit" position="sticky" >
        <Toolbar disableGutters={true} >
          <div className="logo">
            <object className="logo" data={logo}/>
          </div>
          <SearchField
              setSearchPhrase={searchPhrase => {
                dispatch({type: 'searchPhrase', payload: ''})
                dispatch({type: 'searchPhrase', payload: searchPhrase})
                dispatch({type: 'resetPageNumber'})
                dispatch({type: 'deselectArticle'})
                dispatch({type: 'emptyArticles'})
              }
              }></SearchField>
          <Link to="/desk">Desk</Link>
          {user ? <Box sx={{whiteSpace: 'nowrap'}}>Hallo {user}</Box> : <LoginButton/>}
        </Toolbar>
      </AppBar>
      <div className='main-search'>
        <SearchResults 
          searchPhrase = {state.searchPhrase}
          isLoading = {state.isLoading}
          articles = {state.articles}
          numberOfTotalResults = {state.numberOfTotalResults}
          selectedArticle = {state.selectedArticle}
          selectArticle = {articleIndex => dispatch({type:'selectArticle', payload: articleIndex})}
        showMoreResults = {() => {dispatch({type: 'incrementPageNumber'})}} />
        
        {!isNaN(state.selectedArticle) && 
          <SearchArticleDetails 
            selectArticle = {(articleIndex => dispatch({type:'selectArticle', payload: articleIndex}))}
            deselectArticle = {() => {dispatch({type:'deselectArticle'})}}
            articleIndex = {state.selectedArticle}
            numberOfShownResults = {state.articles.length}
          article = {state.articles[state.selectedArticle]} />
        }
      </div>    
    </div>

  )
}
export default Search