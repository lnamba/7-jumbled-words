import '../styles/SelectableTiles.scss';

function SearchableTiles(props) {
  const { setAnswer, wordChunks } = props;
  console.log({wordChunks})

  const renderWordChunk = ({ chunk, index }) => {
    return (
      <div className="tile" key={index} onClick={() => setAnswer(chunk, index)}>
        {chunk}
      </div>
    )
  }

  return (
    <div id="tiles">
      {wordChunks.map(renderWordChunk)}
    </div>
  )
}

export default SearchableTiles;