import { Chess, SQUARES } from 'chess.js'
import { Color, Key } from 'chessground/types'

export function toDests(chess: Chess) {
  const dests = new Map<Key, Key[]>()
  SQUARES.forEach((from) => {
    const moves = chess.moves({ square: from, verbose: true })
    if (moves.length)
      dests.set(
        from,
        moves.map((move) => move.to satisfies Key)
      )
  })
  return dests
}

export function toColor(chess: Chess): Color {
  return chess.turn() === 'w' ? 'white' : 'black'
}
