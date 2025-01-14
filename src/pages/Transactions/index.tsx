import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./Components/SearchForm";
import { PriceHighLight, TransactionContainer, TransactionsTable } from "./styles";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />
      <Summary />
      <TransactionContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight
                      variant={transaction.type}
                    >
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  {/* NÃO ESQUECER DE PASSAR UM DATE, PRECISA SER DATE NÃO STRING */}
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              )
            }))}
          </tbody>
        </TransactionsTable>
      </TransactionContainer>
    </div>
  )
}