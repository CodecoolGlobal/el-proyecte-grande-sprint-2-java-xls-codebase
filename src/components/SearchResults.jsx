import React from 'react'
import SearchArticleDetails from './SearchArticleDetails'

const resultSet = (searchPhrase, articles, totalResults, action) => {
  return (
    <div>
        <h2>Results for: {searchPhrase}</h2> 
        {articles.map((article, index) =>(
          <div className='result-item' key={index}>
                <div className='title'><a href={article.url}>{article.title}</a></div>
                <div className='description'>{article.description}</div>
            </div>
        ))}
          {showNextResults(articles, totalResults, action )}
    </div>
  )
}

const showNextResults = (articles, totalResults, showNextResults) => {
  return (
    <div className="show-next">
    <p>Showing {articles.length } of {totalResults} results.</p>
    {articles.length < totalResults && 
      <button onClick={showNextResults}>Show More Results</button>
    }
    </div>
  )
}

const emptyResultSet = (searchPhrase)=> {
  return(
    <div>
        <p>Nothing found for {searchPhrase}.</p>
    </div>
  )
}

const SearchResults = (props) => {
  return (
    props.requestedSearchPhrase &&
      <div className='search-results'>
          {(props.articles.length > 0) ? resultSet(props.requestedSearchPhrase, props.articles, props.totalResults, props.showNextResults) : emptyResultSet(props.requestedSearchPhrase)} 
      </div>
  )
}

export default SearchResults