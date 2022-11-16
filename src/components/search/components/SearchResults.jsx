import SearchResultSet from "./SearchResultSet"
import SearchResultsCounter from "./SearchResultsCounter";
import SearchResultHeadline from "./SearchResultsHeadline";
import ShowMoreResultsButton from "./ShowMoreResultsButton";

import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

const SearchResults = ({searchPhrase, isLoading, articles, numberOfTotalResults, selectedArticle, selectArticle, showMoreResults}) => {
  
  const numberOfDisplayedResults = articles.length;
  return (
  <div className="search-results">
    {
      (numberOfDisplayedResults > 0) && 
      <SearchResultHeadline searchPhrase = {searchPhrase} />
    }

    <SearchResultSet 
      isLoading = {isLoading}
      articles = {articles} 
      searchPhrase = {searchPhrase} 
      selectedArticle = {selectedArticle}
      selectArticle = {selectArticle}/>

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