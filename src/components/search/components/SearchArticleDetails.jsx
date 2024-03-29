import {useState} from "react";
import {Alert, Snackbar, Toolbar, Tooltip} from "@mui/material"
import {Box} from "@mui/system";
import {Save} from "@mui/icons-material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {useMutation} from "@tanstack/react-query"
import axios from "axios"


const SearchArticleDetails = ({selectArticle, deselectArticle, articleIndex, numberOfShownResults, article}) => {
  const [open, setOpen] = useState(false)
  const [saveTitle, setSaveTitle] = useState('')

  const prevResult = () => {
    selectArticle(articleIndex - 1)
  }
  
  const nextResult = () => {
    selectArticle(articleIndex + 1)
  }

  const save = () => {
    mutate(article)
  }

  const openInNewTab = () => {
    window.open(article.url, '_blank', 'noopener,noreferrer');
  }

  const close = () => {
    deselectArticle(articleIndex)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const {mutate, isSuccess, isError} = useMutation({
    mutationFn: saveArticle => {
      setSaveTitle(article.title);
      const token = sessionStorage.getItem('accessToken');
      let headers = {
        'Authorization': `Bearer ${token}`
      }
      const baseURL = "http://127.0.0.1:8090"
      const apiPath = "/api/news/articles";
      return axios.post(baseURL + apiPath, article, {headers: headers})
    },
    onSuccess: () => {
      setOpen(true)
    },
    onError: () => {
      setOpen(true)
    }
  })

  return (
    <div className='article-details'>
      <Box sx={{ width: 500}}>
        <Toolbar disableGutters={true}>
          <Box 
            display="flex"
            justifyContent="flex-start"
          alignItems="flex-start">
            <Box sx={{"&:hover": (articleIndex > 0) && { cursor: "pointer" } }}>
              <NavigateBeforeIcon onClick={(articleIndex > 0) ? prevResult : undefined} />
            </Box>     
            <Box sx={{ "&:hover": (articleIndex < (numberOfShownResults - 1)) && { cursor: "pointer" } }}>
              <NavigateNextIcon onClick={(articleIndex < (numberOfShownResults - 1)) ? nextResult : undefined} />
            </Box> 
          </Box>    
          <Box 
            display="flex"
            flexGrow = {1}
            justifyContent="flex-end"
          alignItems="flex-end">   
            <Box sx={{ "&:hover": { cursor: "pointer" } }}>
              <OpenInNewIcon onClick={!isNaN(articleIndex) ? openInNewTab : undefined} />
            </Box>
            <Box sx={{ "&:hover": { cursor: "pointer" } }}>
              {sessionStorage.getItem('user') 
              ? 
                <Save onClick={save}/>
              :
              <Tooltip title="Save-function requires login">
                <Save />
              </Tooltip>
              }
            </Box>
            <Box sx={{ "&:hover": { cursor: "pointer" } }} >
              <CloseIcon onClick={!isNaN(articleIndex) ? close : undefined } />
            </Box>
          </Box>  
        </Toolbar>
        <div>
          <div className="info">
            <div className="source">
              <p>{new Date(article.publishedAt).toLocaleString()}, <span data-source_id={article.sourceId}>{article.source.name}</span></p> 
            </div>
          </div>
          <h2>{article.title}</h2>
          <p className="intro">{article.description}</p>
          <div className='image'><img alt="" src={article.urlToImage} width="auto"/></div>
          <div className='article-content'>
            <p className="content">{article.content}</p>
          </div>
          <div className="author">
            <p>Author: {article.author}</p>
          </div>
        </div>
        {isSuccess &&
            <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
              <Alert severity="success">"{saveTitle}" saved.</Alert>
            </Snackbar>
        }
        {isError &&
            <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
              <Alert severity="error">"{saveTitle}" already exists.</Alert>
            </Snackbar>
        }
      </Box>
  </div>
  )
}

export default SearchArticleDetails

