import { NextResponse } from 'next/server'
import problemsJSON from './problems.json'

export async function GET() {
  // TODO: remove solution from this, but after DB is ready and can solve by ID
  return NextResponse.json(getRandomProblem())
}

function getRandomProblem() {
  const chessProblems = problemsJSON as { fen: string; solution: string }[]
  const idx = Math.floor(Math.random() * chessProblems.length)
  return chessProblems[idx]
}
