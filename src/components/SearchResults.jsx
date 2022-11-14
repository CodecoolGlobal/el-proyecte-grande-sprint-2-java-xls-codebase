import SearchArticleDetails from './SearchArticleDetails'


const ResultSet = (searchPhrase, totalResults, articles, articleDetails, setArticleDetails, action) => {

/*   const showArticleDetails = (event, article) => {
    event.preventDefault();
    console.log(article);
    dispatch({type: 'articleDetails', payload: article})
  } */

    return (
      <div>
          <h2>Results for: {searchPhrase}</h2> 
          {articles.map((article, index) =>(
            <div className='result-item' key={index}>
                  <div className='title'><a href={article.url} target="_blank" onClick={event => {
                    event.preventDefault();
                    setArticleDetails(article);
                    console.log(articleDetails)
                  }}>{article.title}</a></div>
                  <div className='description'>{article.description}</div>
              </div>
          ))}
            {showNextResults(articles, totalResults, action )}
            { console.log('hui')}
            {(articleDetails) && 
            <SearchArticleDetails
                title = {articleDetails.title}
                urlToImage = {articleDetails.urlToImage}
                author = {articleDetails.author}
                description = {articleDetails.description}
                content = {articleDetails.content}
                publishedAt = {articleDetails.publishedAt}
                url = {articleDetails.url}
                sourceName = {articleDetails.source.name}
                sourceId = {articleDetails.source.id}
            />
            }
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

const EmptyResultSet = (searchPhrase)=> {
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
          {(props.articles.length > 0) ? ResultSet(props.requestedSearchPhrase, props.totalResults, props.articles, props.articleDetails, props.setArticleDetails, props.showNextResults) : EmptyResultSet(props.requestedSearchPhrase)} 
      </div>

  )
}

export default SearchResults