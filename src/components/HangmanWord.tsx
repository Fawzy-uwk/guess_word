

function HangmanWord({ guessWord, guessedLetters, reveal }: {
    guessWord: string,
    guessedLetters: string[],
    reveal?: boolean
}) {

    return (
        <div className="flex items-center gap-4 text-2xl font-bold uppercase ">
            {guessWord.split('').map((letter: string, index: number) => (
                <span key={index} className={`border-b-5 border-black w-[30px] text-center ${guessedLetters.includes(letter) || reveal ? '' : 'text-transparent'} ${!guessedLetters.includes(letter) && reveal ? "text-red-600" : "text-black"}`}>
                    {letter}
                </span>
            ))}
        </div>

    )
}

export default HangmanWord

