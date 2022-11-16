import { useState } from "react";

const SearchResultSet = ({isLoading, articles, searchPhrase, selectedArticle, selectArticle}) => {
  
  function handleClick(event, article, index) {
    event.preventDefault();
    selectArticle(index);
  }

  const searchResultItems = articles.map((article, index) => 
    <div className={`result-item ${(!isNaN(selectedArticle) && selectedArticle === index) ? "selected" : ""}`} key={index}>
          <div className='title'><a href={article.url} target="_blank" onClick={(event) => handleClick(event, article, index)}>{article.title}</a></div>
          <div className='description'>{article.description}</div>
      </div>
  );

  return (
    <div>
      {(searchResultItems.length > 0) ? 
      searchResultItems 
        : (searchPhrase !== "")  ? !isLoading && <p>Nothing found for "{searchPhrase}".</p>
        : ''}
    </div>
  );
}

export default SearchResultSet