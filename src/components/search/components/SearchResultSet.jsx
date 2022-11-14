import { useState } from "react";

const SearchResultSet = ({isLoading, articles, searchPhrase, setArticleDetails}) => {
  
  function handleClick(event, article) {
    event.preventDefault();
    setArticleDetails(article);
  }

  const searchResultItems = articles.map((article, index) => 
    <div className='result-item' key={index}>
          <div className='title'><a href={article.url} target="_blank" onClick={(event) => handleClick(event, article)}>{article.title}</a></div>
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