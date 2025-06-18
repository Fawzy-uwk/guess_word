import { useCallback, useEffect, useState } from "react";
import words from "./WordList.json";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import HangmanDrawing from "./components/HangmanDrawing";

function App() {
  const [guessWord, setGuessWord] = useState<string>(() => {
    if (!words.length) return "default"; // Fallback for empty WordList.json
    return words[Math.floor(Math.random() * words.length)].toLowerCase(); // Normalize to lowercase
  });
  console.log(guessWord);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !guessWord.includes(letter)
  );
  const isWinner = guessWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
  const isLoser = incorrectLetters.length >= 6;
  const isGameOver = isWinner || isLoser;

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isGameOver) return; // Simplified condition
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isGameOver]
  );

  const resetGame = () => {
    setGuessWord(words[Math.floor(Math.random() * words.length)]?.toLowerCase() || "default");
    setGuessedLetters([]);
  };

  // Handle letter input
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const letter = e.key.toLowerCase();
      if (!letter.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessedLetter(letter);
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [addGuessedLetter]);

  // Handle reset on Enter key
  useEffect(() => {
    if (isGameOver) {
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          e.preventDefault();
          resetGame(); // Use resetGame function
        }
      };
      document.addEventListener("keydown", handler);
      return () => {
        document.removeEventListener("keydown", handler);
      };
    }
  }, [isGameOver]);

  return (
    <div className="my-0 mx-auto flex items-center justify-center flex-col gap-10 py-4 max-w-2xl">
      <h2
        className={`
          capitalize text-xl font-semibold
          ${isWinner ? "text-green-600" : isLoser ? "text-red-600" : "text-gray-900"}
        `}
      >
        {isGameOver
          ? isWinner
            ? "You Won!"
            : "Game Over!"
          : "Guess The Word"}
      </h2>
      {isGameOver && (
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded-sm hover:bg-blue-800"
        >
          Play Again
        </button>
      )}
      <HangmanDrawing incorrectLetters={incorrectLetters.length} /> {/* Fixed prop name */}
      <HangmanWord guessWord={guessWord} guessedLetters={guessedLetters} reveal={isGameOver} />
      <Keyboard
        addGuess={addGuessedLetter}
        activeLetters={guessedLetters.filter((letter) => guessWord.includes(letter))}
        inactiveLetter={incorrectLetters} // Fixed prop name
        disabled={isGameOver}
      />
    </div>
  );
}

export default App;