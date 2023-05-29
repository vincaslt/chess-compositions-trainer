import ProblemView from '@/app/solve/ProblemView'
import { fetchNextProblem } from '@/app/solve/page-utils'

export default async function Solve() {
  const initialProblem = await fetchNextProblem()

  return (
    <main className="flex">
      <ProblemView initialProblem={initialProblem} />
    </main>
  )
}
