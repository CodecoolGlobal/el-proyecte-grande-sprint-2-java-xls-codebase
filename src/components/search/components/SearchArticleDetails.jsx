const SearchArticleDetails = ({article}) => {
  return (
    <div className='article-details'>
    <div className='image'><img src={article.urlToImage} width="auto"/></div>
    <div className='article-content'>
      <h2>{article.title}</h2>
      <div class="info">
        <p data-source_id={article.sourceId}>Source: {article.source.name}</p> 
        <p>Author: {article.author}</p>
      </div>
      <p>Snippet: {article.description}</p>
      <p>Content: {article.content}</p>
      <div class="info">
        <p>Published: {new Date(article.publishedAt).toLocaleString()}</p>
        <p>Link to article: <a href={article.url} target="_blank">Visit article</a></p>
      </div>
    </div>
  </div>
  )
}

export default SearchArticleDetails

