import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import { z } from "zod";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";
import { SearchFormContainer } from "./styles";

const searchFormsSchema = z.object({
  query: z.string()
});

type SeachFormInputs = z.infer<typeof searchFormsSchema>;

export function SearchForm() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context) => { return context.fetchTransactions });

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SeachFormInputs>({
    resolver: zodResolver(searchFormsSchema)
  });

  async function handleSearchTransactions(data: SeachFormInputs) {
    await fetchTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Buscar por transações"
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}