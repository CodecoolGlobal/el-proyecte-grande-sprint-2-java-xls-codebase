const SearchArticleDetails = (props) => {
  return (
    <div className='article-details'>
    <div className='image'><img src={props.urlToImage} width="auto"/></div>
    <div className='article-content'>
      <h2>{props.title}</h2>
      <div class="info">
        <p data-source_id={props.sourceId}>Source: {props.sourceName}</p> 
        <p>Author: {props.author}</p>
      </div>
      <p>Snippet: {props.description}</p>
      <p>Content: {props.content}</p>
      <div class="info">
        <p>Published: {new Date(props.publishedAt).toLocaleString()}</p>
        <p>Link to article: <a href={props.url} target="_blank">Visit article</a></p>
      </div>
    </div>
  </div>
  )
}

export default SearchArticleDetails