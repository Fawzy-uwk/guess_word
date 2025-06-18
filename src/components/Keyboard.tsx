import { useMemo } from "react";

interface KeyboardProps {
    addGuess: (letter: string) => void;
    activeLetters: string[];
    inactiveLetter: string[]; // Fixed prop name
    disabled?: boolean;
}

function Keyboard({ addGuess, activeLetters, inactiveLetter, disabled = false }: KeyboardProps) {
    const generateAlphabet = (capital = false) => {
        const alphabet = "abcdefghijklmnopqrstuvwxyz";
        const alphabetArray = alphabet.split("");
        const capitalAlphabetArray = alphabetArray.map((letter) => letter.toUpperCase());
        return capital ? capitalAlphabetArray : alphabetArray;
    };

    const alphaWords = useMemo(() => generateAlphabet(), []);



    return (
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-5">
            {alphaWords.map((letter, index) => {
                const isActive = activeLetters.includes(letter);
                const isInactive = inactiveLetter.includes(letter);

                return (
                    <button
                        key={index}
                        onClick={() => addGuess(letter)}
                        disabled={disabled || isActive || isInactive} // Disable all buttons when game over or letter guessed
                        aria-label={`Letter ${letter}`}
                        className={`
              px-3 flex items-center justify-center font-semibold aspect-square border 
              capitalize cursor-pointer text-center border-black rounded-sm
              hover:bg-sky-200 transition-colors duration-300
              disabled:cursor-not-allowed
              ${isActive ? "bg-green-200 border-green-500 text-black" : ""}
              ${isInactive ? "bg-red-200 border-red-500 text-black" : ""}
              ${!isActive && !isInactive && disabled ? "bg-gray-50 text-gray-400 border-gray-400" : ""}
              ${!isActive && !isInactive && !disabled ? "hover:bg-sky-200" : ""}
            `}
                    >
                        {letter}
                    </button>
                );
            })}
        </div>
    );
}

export default Keyboard;