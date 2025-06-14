// src/pages/app/products/ProductTableFilters.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Search, X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

const productFiltersSchema = z.object({
  name: z.string().optional(),
});

type ProductFiltersSchema = z.infer<typeof productFiltersSchema>;

export function ProductTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";

  const { register, handleSubmit, reset } = useForm<ProductFiltersSchema>({
    resolver: zodResolver(productFiltersSchema),
    defaultValues: { name },
  });

  function handleFilter({ name }: ProductFiltersSchema) {
    setSearchParams((state) => {
      if (name) {
        state.set("name", name);
      } else {
        state.delete("name");
      }

      state.set("page", "1");
      return state;
    });
  }

  function handleClearFilters() {
    setSearchParams((state) => {
      state.delete("name");
      state.set("page", "1");
      return state;
    });

    reset({ name: "" });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex items-center gap-2"
    >
      <span className="text-sm font-semibold">Buscar Produto</span>
      <Input
        placeholder="Nome do produto"
        className="h-8 w-[320px]"
        {...register("name")}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 w-4 mr-2" />
        Buscar
      </Button>

      <Button
        onClick={handleClearFilters}
        type="button"
        variant="outline"
        size="xs"
      >
        <X className="h-4 w-4 mr-2" />
        Limpar
      </Button>
    </form>
  );
}
