import React, { useState } from 'react';
import './App.css';

const INITIAL_CARDS = [
  { question: "What plant is known for looking perked up at night but droopy by day?", answer: "Prayer Plant" },
  { question: "What can you do for plants to improve their ability to photosynthesize?", answer: "Wipe leaves" },
  { question: "Which succulent is known as the 'String of Pearls'?", answer: "Senecio rowleyanus" },
  { question: "What is the most common cause of houseplant death?", answer: "Overwatering" },
  { question: "Which plant is famous for its heart-shaped leaves with holes?", answer: "Monstera Deliciosa" },
  { question: "What is the process of a plant turning light into food?", answer: "Photosynthesis" }
];

function App() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(""); 
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      resetCardState();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      resetCardState();
    }
  };

  const resetCardState = () => {
    setIsFlipped(false);
    setUserInput("");
    setFeedback("");
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    resetCardState();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If user already got it right/wrong or is looking at the answer, stop.
    if (!userInput || feedback !== "" || isFlipped) return; 

    const actual = cards[currentIndex].answer.toLowerCase().trim();
    const guess = userInput.toLowerCase().trim();

    if (guess === actual || (actual.includes(guess) && guess.length > 3)) {
      setFeedback("correct");
      setStreak((prev) => {
        const newStreak = prev + 1;
        setLongestStreak((oldMax) => Math.max(oldMax, newStreak));
        return newStreak;
      });
    } else {
      setFeedback("wrong");
      setStreak(0);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🌿 The Ultimate Plant Parent!</h1>
        <p className="subtitle">How good of a plant parent are you? Test your knowledge!</p>
        
        <div className="stats-container">
          <h3>Number of cards: {cards.length}</h3>
          <p className="streak-text">
            Current Streak: <strong>{streak}</strong>, Longest Streak: <strong>{longestStreak}</strong>
          </p>
        </div>
      </header>

      <div className={`card-flip-area ${feedback}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
          <div className="card-face card-front">
            <p>{cards[currentIndex].question}</p>
          </div>
          <div className="card-face card-back">
            <p>{cards[currentIndex].answer}</p>
          </div>
        </div>
      </div>

      <form className="input-section" onSubmit={handleSubmit}>
        <label htmlFor="guess">Guess the answer here: </label>
        <input 
          id="guess"
          type="text" 
          placeholder="Type here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={feedback}
          autoComplete="off"
        />
        <button type="submit" className="submit-btn">Submit Guess</button>
      </form>

      <div className="controls">
        <button className="nav-btn" onClick={handleBack} disabled={currentIndex === 0}>←</button>
        <button className="nav-btn" onClick={handleNext} disabled={currentIndex === cards.length - 1}>→</button>
        <button className="shuffle-btn" onClick={shuffleCards}>Shuffle Cards</button>
      </div>
    </div>
  );
}

export default App;