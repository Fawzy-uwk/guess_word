
const Head =
    (
        <div key={5} className="absolute top-10 -right-[23px] h-[50px] w-[50px] rounded-full bg-transparent border-5"></div>
    )

const Body = (

    <div key={6} className="absolute h-[150px] w-[4px] top-22.5 -right-0 bg-black"></div>
)

const LeftHand =
    (
        <div key={7} className="absolute h-[4px] w-[100px] top-32.5 right-[5px] bg-black rotate-[30deg] origin-bottom-right"></div>
    )

const RightHand =
    (
        <div key={9} className="absolute h-[4px] w-[100px] top-32.5 -right-[100px] bg-black -rotate-[30deg]  origin-bottom-left"></div>
    )


const LeftLeg =
    (
        <div key={4} className="absolute h-[4px] w-[100px] top-[236px] right-[1px] bg-black rotate-[-60deg] origin-bottom-right"></div>
    )

const RightLeg = (

    <div key={10} className="absolute h-[4px] w-[100px] top-[236px] -right-[96.8px] bg-black rotate-[60deg] origin-bottom-left"></div>
)


const bodyParts = [
    Head,
    Body,
    LeftHand,
    RightHand,
    LeftLeg,
    RightLeg
]
type HangmanDrawingProps = {
    incorrectLetters: number
}


function HangmanDrawing({ incorrectLetters }: HangmanDrawingProps) {

    return (
        <div className="relative">

            <div className="relative h-[5px] ml-[120px] w-[250px] bg-black"></div>
            <div className="absolute right-0 top-0 h-[40px] w-[5px] bg-black"></div>
            {bodyParts.slice(0, incorrectLetters)}
            <div className="relative h-[350px] w-[5px] ml-[120px] bg-black"></div>
            <div className="relative h-[5px] w-[250px] bg-black"></div>
        </div>
    )
}

export default HangmanDrawing
