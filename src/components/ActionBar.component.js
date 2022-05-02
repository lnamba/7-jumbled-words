import '../styles/ActionBar.scss';

function UserActions(props) {
  const { answer, handleGuess, shuffle } = props;

  return (
    <div id="action-bar">
      <div className="button-container">
        <button onClick={shuffle}>
          Shuffle
        </button>
      </div>
      <div id="input-area">
        <h3>{answer}</h3>
      </div>
      <div className="button-container">
        <button onClick={handleGuess}>
          Guess
        </button>
      </div>
    </div>
  )
}

export default UserActions;