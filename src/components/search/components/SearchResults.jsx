import SearchResultSet from "./SearchResultSet"
import SearchResultsCounter from "./SearchResultsCounter";
import SearchResultHeadline from "./SearchResultsHeadline";
import ShowMoreResultsButton from "./ShowMoreResultsButton";

import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const SearchResults = ({searchPhrase, isLoading, articles, numberOfTotalResults, setArticleDetails, showMoreResults}) => {
  
  const numberOfDisplayedResults = articles.length;
  return (
  <div>
    {
      (numberOfDisplayedResults > 0) && 
      <SearchResultHeadline searchPhrase = {searchPhrase} />
    }

    <SearchResultSet 
      isLoading = {isLoading}
      articles = {articles} 
      searchPhrase = {searchPhrase} 
    setArticleDetails = {setArticleDetails} />

    { isLoading && 
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={30} />
      </Box>
    }
    {
      (numberOfDisplayedResults > 0) && 
        <SearchResultsCounter 
          numberOfDisplayedResults = {numberOfDisplayedResults} 
        numberOfTotalResults = {numberOfTotalResults} />
    }
    {

      (numberOfDisplayedResults > 0 && numberOfDisplayedResults < numberOfTotalResults) && 
        <ShowMoreResultsButton 
          numberOfDisplayedResults = {numberOfDisplayedResults}
          numberOfTotalResults = {numberOfTotalResults}
        showMoreResults = {showMoreResults} />
    }
  </div>
  );

}

export default SearchResults