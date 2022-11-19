import { useState } from "react";
import { Alert, Toolbar } from "@mui/material"
import { Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { Save } from "@mui/icons-material"
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useMutation } from "@tanstack/react-query"
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

  const { mutate, isSuccess } = useMutation({
    mutationFn: saveArticle => {
      setSaveTitle(article.title)
      const baseURL =""
      const apiPath="/news/api";
      return axios.post(baseURL + apiPath, article)
    },
    onSuccess: () => { setOpen(true)}
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
              <Save onClick={save}/>
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
          <div className='image'><img src={article.urlToImage} width="auto"/></div>
          <div className='article-content'>
            <p className="content">{article.content}</p>
          </div>
          <div className="author">
            <p>Author: {article.author}</p>
          </div>
        </div>
        <Snackbar open={open} onClose={handleClose} autoHideDuration={6000}>
          {isSuccess && <Alert severity="success">"{saveTitle}" saved.</Alert>}
        </Snackbar>
      </Box>
  </div>
  )
}

export default SearchArticleDetails

