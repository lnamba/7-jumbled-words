import { useCallback, useEffect, useState } from 'react';

import HintArea from './HintArea.component';
import SelectableTiles from './SelectableTiles.component';
import ActionBar from './ActionBar.component';

function GameBoard() {
  const [words, setWords] = useState(['render', 'forest', 'regular', 'round', 'loads', 'senior', 'operator']);
  const [definitions, setDefinitions] = useState(['Stucco or plaster applied to walls (mostly to outside masonry walls).',
  'A dense uncultivated tract of trees and undergrowth, larger than woods.',
  'A member of the British Army (as opposed to a member of the Territorial Army or Reserve).',
  'So as to form a circle or trace a circular path, or approximation thereof.',
  'A burden; a weight to be carried.',
  'An old person.',
  'One who operates.',]);
  const [wordChunks, setWordChunks] = useState([]);
  const [wordLengths, setWordLengths] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [answerChunks, setAnswerChunks] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(['','','','','','','']);
  const [usedChunks, setUsedChunks] = useState([]);
  const [wordObject, setWordObject] = useState({});
  const answer = answerChunks.join('');

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    const wordsList = await fetchWords();
    const wordsToUse = [];
    let count = 0;

    // while (count < 7) {
    //   const index = Math.floor(Math.random() * wordsList.length);
    //   wordsToUse.push(wordsList[index]);
    //   count++;
    // } 

    // setWords(wordsToUse);
  }

  useEffect(() => {
    if (words?.length) {
      define();
      const chunks = [];
      const lengths = [];
      const obj = {};
      words.forEach((word, index) => {
        lengths.push(word.length);
        const splitted = word.match(/.{1,3}/g);
        obj[word] = splitted;
        setWordObject(obj);
        splitted.forEach((chunk) => {
          chunks.push(chunk);
        });
      });
      setWordLengths(lengths);
      const shuffledWordChunks = shuffleWordChunks(chunks);
      const shuffledWordChunksWithIndex = shuffledWordChunks.map((chunk, index) => ({ chunk, index }))
      setWordChunks(shuffledWordChunksWithIndex);
    }
  }, [words]);

  const shuffleWordChunks = (arr) => {
    let index = arr.length;
    let value;
    let random;
    while (0 !== index) { //while we haven't looped thru all elements
      // get another element in index
      random = Math.floor(Math.random() * index);
      index -= 1;
      //shuffle it with index
      value = arr[index];
      arr[index] = arr[random];
      arr[random] = value;
    }
      return arr;
  }

  const define = async () => {
    // const wordDefinitions = await getDefinitions();
    const wordDefinitions = [
      'Stucco or plaster applied to walls (mostly to outside masonry walls).',
      'A dense uncultivated tract of trees and undergrowth, larger than woods.',
      'A member of the British Army (as opposed to a member of the Territorial Army or Reserve).',
      'So as to form a circle or trace a circular path, or approximation thereof.',
      'A burden; a weight to be carried.',
      'An old person.',
      'One who operates.',
    ]
    setDefinitions(wordDefinitions);
  }

  const fetchWords = useCallback(async () => {
    const response = await fetch('word-list.json');
    const json = await response.json();
    return json.wordList;
  });

  // const getDefinitions = useCallback(async () => {
  //   return Promise.all(words.map(async (word) => {
  //     const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  //     // const url = `http://api.wordnik.com:80/v4/word.json/${word}/definitions?limit=5&includeRelated=true&sourceDictionaries=all&useCanonical=true&includeTags=false&api_key=da315e3cd6b9d073f722503e4d2015774237e56c91d0acc29`;
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     const definition = json?.[0]?.meanings?.[0]?.definitions?.[0];
  //     return definition;
  //   }));
  // });

  const onTileClick = (value, index) => {
    if (selectedTiles.indexOf(index) === -1) {
      setSelectedTiles([...selectedTiles, index]);

      if(usedChunks.indexOf(index) === -1) {
        setAnswerChunks([...answerChunks, value]);
      }
    }
  }

  const handleGuess = () => {
    setAnswerChunks([]);
    words.forEach((word, i) => {
      console.log({word,answerChunks})
      if (word === answer) {
        const updatedAnswers = [...correctAnswers];
        updatedAnswers[i] = word;
        setCorrectAnswers(updatedAnswers);

        for(let key in wordObject) {
          if (key === word) {
            const newUsedChunks = [...usedChunks];
            wordChunks.forEach((_chunk, index) => {
              if (selectedTiles.indexOf(index) > -1) {
              console.log({newUsedChunks,index})
              if (newUsedChunks.indexOf(index) === -1) {
                  newUsedChunks.push(index);
                }
              }
            });
            console.log({usedChunks, newUsedChunks})
            setUsedChunks(newUsedChunks);
          }
        }
      }
    });
    setSelectedTiles([]);
  }

  const shuffle = () => {
    setSelectedTiles([]);
    setAnswerChunks([]);
    let i = 0;
    const chunksToShuffle = wordChunks.filter(({ index }) => !usedChunks.includes(index));
    const shuffledChunks = shuffleWordChunks(chunksToShuffle);
    const shuffledAndOrderedWordChunks = wordChunks.map((item) => {
      if (!usedChunks.includes(item.index)) {  
        let returnThis = shuffledChunks[i];
        i++;
        return returnThis;
      }
      return item;
    });
    setWordChunks(shuffledAndOrderedWordChunks);
  }
  console.log({correctAnswers, usedChunks,selectedTiles, wordObject, answerChunks})

  const handleBackspace = () => {
    const tiles = [...selectedTiles];
    const updatedAnswer = [...answerChunks];
    tiles.pop();
    updatedAnswer.pop()
    console.log({tiles})
    setSelectedTiles(tiles);
    setAnswerChunks(updatedAnswer);
  }

  return (
    <>
      <HintArea 
        definitions={definitions} 
        correctAnswers={correctAnswers}
        wordLengths={wordLengths} 
      />
      <ActionBar 
        answer={answer} 
        handleBackspace={handleBackspace}
        handleGuess={handleGuess} 
        shuffle={shuffle} 
      />
      <SelectableTiles 
        onTileClick={onTileClick}
        usedChunks={usedChunks}
        wordChunks={wordChunks} 
        />
    </>
  )
}

export default GameBoard;