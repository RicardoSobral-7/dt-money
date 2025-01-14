import { useContextSelector } from "use-context-selector"
import { TransactionsContext } from "../contexts/TransactionsContext"


export function useSummary() {
  const  transactions  = useContextSelector(TransactionsContext, (context) => context.transactions)
  // o acc corresponde ao nosso objeto passado no segundo parametro
  const summary = transactions.reduce((acc, transaciton) => {
    if (transaciton.type === 'income') {
      acc.income += transaciton.price
      acc.total += transaciton.price
    } else {
      acc.outcome += transaciton.price
      acc.total -= transaciton.price
    }

    return acc
  }, { income: 0, outcome: 0, total: 0 })

  return summary
}