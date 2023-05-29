'use client'

import { Chessground } from 'chessground'
import { useEffect, useMemo, useRef } from 'react'
import 'chessground/assets/chessground.base.css'
import 'chessground/assets/chessground.brown.css'
import 'chessground/assets/chessground.cburnett.css'
import { toColor, toDests } from '@/app/_utils/chess'
import { Chess } from 'chess.js'

interface Props {
  fen: string
}

function ChessBoard({ fen }: Props) {
  const boardContainerRef = useRef<HTMLDivElement>(null)
  const chess = useMemo(() => new Chess(fen), [fen])

  useEffect(() => {
    if (boardContainerRef.current) {
      const cg = Chessground(boardContainerRef.current, {
        fen: chess.fen(),
        movable: {
          color: toColor(chess),
          dests: toDests(chess),
          free: false,
        },
      })
    }
  })

  return <div className="w-[500px] h-[500px]" ref={boardContainerRef} />
}

export default ChessBoard
