import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormsSchema = z.object({
  query: z.string()
});

type SeachFormInputs = z.infer<typeof searchFormsSchema>;

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext);

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