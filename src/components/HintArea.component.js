import '../styles/HintArea.scss';

function HintArea(props) {
  const { correctAnswers, definitions, wordLengths } = props;

  const renderHintRow = (definition, i) => {
    return (
      <div className="hint-row" key={i}>
        <div className="definition">
          <p>{definition}</p>
        </div>
        <div className="length column">
          <p>{`${wordLengths[i]} letters`}</p>
        </div>
        <div className="final-word">
          <p>{`${correctAnswers[i]}`}</p>
        </div>
      </div>
    )
  }

  return (
    <div id="hint-row-section">
      {definitions.map(renderHintRow)}
    </div>
  )
}

export default HintArea;