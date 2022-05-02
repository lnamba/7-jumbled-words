import '../styles/ActionBar.scss';

function UserActions(props) {
  const { answer, handleGuess } = props;

  return (
    <div id="action-bar">
      <div className="button-container">
        <button>
          Shuffle
        </button>
      </div>
      <div id="input-area">{answer}</div>
      <div className="button-container">
        <button onClick={handleGuess}>
          Guess
        </button>
      </div>
    </div>
  )
}

export default UserActions;