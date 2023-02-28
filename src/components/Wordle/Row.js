import Tile from './Tile';
export default function Row(arr) {
  return (
    <div className="word__line">
      {
        arr.map(tile => <Tile tile={tile} className="word__tile" />)
      }
    </div>
  )
}