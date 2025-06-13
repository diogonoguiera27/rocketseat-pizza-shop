import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Zod schema ajustado (sem descrição)
const createProductSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  price: z.string().min(1, "Preço é obrigatório"),
  stock: z.string().min(1, "Quantidade em estoque é obrigatória"),
});

type CreateProductSchema = z.infer<typeof createProductSchema>;

export function CreateProductModal() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
  });

  async function handleCreateProduct(data: CreateProductSchema) {
    try {
      console.log(data);
      // TODO: implementar lógica de criação do produto no backend
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Novo Produto</DialogTitle>
        <DialogDescription>
          Preencha os dados para adicionar um novo produto ao estoque.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Ex: Refrigerante"
          />
          {errors.name && (
            <span className="text-sm text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Preço (R$)</Label>
            <Input
              id="price"
              type="number"
              {...register("price")}
              placeholder="Ex: 9.90"
              step="0.01"
            />
            {errors.price && (
              <span className="text-sm text-red-500">
                {errors.price.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Quantidade</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock")}
              placeholder="Ex: 100"
            />
            {errors.stock && (
              <span className="text-sm text-red-500">
                {errors.stock.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Produto"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
