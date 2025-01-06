import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormsSchema = z.object({
  query: z.string()
});

type SeachFormInputs = z.infer<typeof searchFormsSchema>;

export function SearchForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<SeachFormInputs>({
    resolver: zodResolver(searchFormsSchema)
  });

  async function handleSearchTransactions(data: SeachFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
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