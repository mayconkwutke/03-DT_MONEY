import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionsContext } from "../../../../contexts/TransactionContext";
import { SearchFormContainer } from "./style";

const searchFormSchema = z.object({
    query: z.string()
})

type searchFormInput = z.infer<typeof searchFormSchema>

export function SearchForm() {
    const fetchTransactions = useContextSelector(
        TransactionsContext,
        (context) => {
            return context.fetchTransactions
        }
        )

    const { 
        register, 
        handleSubmit,
        formState: {isSubmitting}
     } = useForm<searchFormInput>({
        resolver: zodResolver(searchFormSchema)
    })

    async function handleSearchTransaction(data: searchFormInput) {
        await fetchTransactions(data.query)
    }

    return (
        <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
            <input placeholder="Busque uma transação" {...register('query')}/>
            <button type="submit" disabled={isSubmitting}>
                <MagnifyingGlass size={20} />
                Buscar
            </button>
        </SearchFormContainer>
    )
}