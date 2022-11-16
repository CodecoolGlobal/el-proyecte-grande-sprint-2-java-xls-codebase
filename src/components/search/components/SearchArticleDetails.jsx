import { Toolbar } from "@mui/material"
import { Save } from "@mui/icons-material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
const SearchArticleDetails = ({selectArticle, articleIndex, numberOfShownResults, article}) => {

  const save = () => {
    console.log(mutation.mutate(article))
  }
  
  const prevResult = () => {
    selectArticle(articleIndex - 1)
  }
  
  const nextResult = () => {
    selectArticle(articleIndex + 1)
  }

  const mutation = useMutation({
    mutationFn: saveArticle => {
      const baseURL =""
      const apiPath="/news/api";
      return axios.post(baseURL + apiPath, article)
    }
  })


  return (
    <div className='article-details'>
    <Toolbar>
    <NavigateBeforeIcon onClick={(articleIndex > 0) ? prevResult : undefined} />
    <NavigateNextIcon onClick={(articleIndex < (numberOfShownResults - 1)) ? nextResult : undefined} />
    <Save onClick={save}/>
    </Toolbar>
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

