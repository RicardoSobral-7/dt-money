import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: Date;
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactiions] = useState<Transaction[]>([])

  // fizemos a exportação dessa função para que consigamos utilizar no componente SearchForm e com isso realizar a busca de transações
  async function fetchTransactions(query?: string) {
    // agora para passar nosso objeto de  params temos essa segunda propriedade no método get
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query
      }
    })

    setTransactiions(response.data)
  }

  async function createTransaction(transaction: Omit<Transaction, 'id' | 'createdAt'>) {
    const { category, description, price, type } = transaction
    // podemos capiturar o response aqui para não fazer 2 requests pra atualizar nossa home
    const response = await api.post('/transactions', {
      category,
      description,
      price,
      type,
      createdAt: new Date()
    })
    setTransactiions(prevState => [response.data, ...prevState])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}