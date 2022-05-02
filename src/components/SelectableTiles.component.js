import '../styles/SelectableTiles.scss';

function SearchableTiles(props) {
  const { setAnswer, usedChunks, wordChunks } = props;
  console.log({wordChunks,usedChunks})

  const renderWordChunk = ({ chunk, index }) => {
    const correct = usedChunks.includes(index);
    
    return (
      <div className={`tile ${correct ? 'correct' : ''}`} key={index} onClick={() => setAnswer(chunk, index)}>
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