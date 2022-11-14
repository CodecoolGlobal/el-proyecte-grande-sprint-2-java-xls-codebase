const SearchResultsCounter = ({numberOfDisplayedResults, numberOfTotalResults}) => {
  return (
    <div className="result-counter">
    <p>Showing {numberOfDisplayedResults } of {numberOfTotalResults} results.</p>
    </div>
  )
}

export default SearchResultsCounter