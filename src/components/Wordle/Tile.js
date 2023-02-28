export default function Tile({entry}) {
  return (
    <div 
      className={
        "word__tile" 
        + (entry.isCorrect ? " word__tile--correct" : "") 
        + (entry.isPresent ? " word__tile--present" : "") }>{ entry.value }</div>
  )
}