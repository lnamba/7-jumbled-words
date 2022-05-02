import '../styles/ActionBar.scss';

function UserActions(props) {
  const { answer, handleBackspace, handleGuess, shuffle } = props;

  return (
    <div id="action-bar">
      <div className="button-container">
        <button onClick={shuffle}>
          Shuffle
        </button>
      </div>
      <div id="input-area">
        <h3 id="answer">{answer}</h3>
      </div>
      <div className="button-container">
        <button onClick={handleBackspace}>
          Back
        </button>
        <button onClick={handleGuess}>
          Guess
        </button>
      </div>
    </div>
  )
}

export default UserActions;