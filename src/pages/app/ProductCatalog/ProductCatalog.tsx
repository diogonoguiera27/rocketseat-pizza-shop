import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";

import { useState } from "react";

// Dados fictícios
const mockProducts = [
  {
    id: "1",
    name: "Pizza Margherita",
    price: 3990, // em centavos
  },
  {
    id: "2",
    name: "Pizza Calabresa",
    price: 4590,
  },
  {
    id: "3",
    name: "Pizza Quatro Queijos",
    price: 4990,
  },
];

export function ProductCatalog() {
  // Estado local para armazenar quantidades por produto
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function handleQuantityChange(productId: string, value: string) {
    const parsed = parseInt(value, 10);
    setQuantities((prev) => ({
      ...prev,
      [productId]: isNaN(parsed) ? 0 : parsed,
    }));
  }

  return (
    <>
      <Helmet title="Catálogo de Produtos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Catálogo de Produtos</h1>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts.map((product) => {
                const quantity = quantities[product.id] ?? 1;
                const total = (product.price * quantity) / 100;

                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">
                      {(product.price / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell className="text-center align-middle">
                      <div className="inline-flex items-center border rounded-md h-10 overflow-hidden">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantities((prev) => ({
                              ...prev,
                              [product.id]: Math.max(
                                (prev[product.id] ?? 1) - 1,
                                1
                              ),
                            }))
                          }
                          className={`px-3 text-lg font-bold bg-transparent ${
                            quantity === 1
                              ? "text-red-200 cursor-not-allowed"
                              : "text-red-500"
                          }`}
                        >
                          –
                        </button>

                        <input
                          type="number"
                          value={quantity}
                          min={1}
                          onChange={(e) =>
                            handleQuantityChange(product.id, e.target.value)
                          }
                          className="w-12 text-center border-none outline-none bg-transparent appearance-none 
                           [&::-webkit-inner-spin-button]:appearance-none 
                           [&::-webkit-outer-spin-button]:appearance-none"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setQuantities((prev) => ({
                              ...prev,
                              [product.id]: (prev[product.id] ?? 1) + 1,
                            }))
                          }
                          className="px-3 text-red-500 text-lg font-bold bg-transparent"
                        >
                          +
                        </button>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        variant="default"
                        className="bg-red-600 hover:bg-red-700 w-[200px] flex justify-between"
                      >
                        <span>Adicionar</span>
                        <span>
                          {total.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
