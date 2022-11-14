const ShowMoreResultsButton = ({numberOfDisplayedResults, numberOfTotalResults, showMoreResults}) => {
  return (
    <div className="show-more">
      <button disabled={!numberOfTotalResults > numberOfDisplayedResults} onClick={showMoreResults} >Show More Results</button>
    </div>
  )
}

export default ShowMoreResultsButton