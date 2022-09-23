import React from 'react'

const SearchResults = (props) => {
  return (
    <div className='search-results'>
        <h2>Relevant Articles: </h2>
        {props.articles.map(article =>(
            <div className='result-item' key={article.id}>
                <div className='title'><a href={article.url}>{article.title}</a></div>
                <div className='description'>{article.description}</div>
            </div>
        ))}
    </div>
  )
}

export default SearchResults