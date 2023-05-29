export async function fetchNextProblem() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL! + '/problem')
  const nextProblem = await res.json()
  return nextProblem satisfies {
    fen: string
    solution: string
  }
}
