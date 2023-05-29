'use client'

import ChessBoard from '@/app/_components/ChessBoard'
import { useState } from 'react'
import Button from '@/app/_components/Button'
import { fetchNextProblem } from '@/app/solve/page-utils'

interface Props {
  initialProblem: {
    fen: string
    solution: string
  }
}

export default function ProblemView({ initialProblem }: Props) {
  const [problem, setProblem] = useState(initialProblem)

  const handleClickNext = async () => {
    setProblem(await fetchNextProblem())
  }

  return (
    <main className="flex">
      <ChessBoard fen={problem.fen} />
      <Button onClick={handleClickNext}>Next</Button>
    </main>
  )
}
