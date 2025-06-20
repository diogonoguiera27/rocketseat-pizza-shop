// Atualização da listagem de produtos com modal de criação incluso ao lado do carrinho

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
import { useEffect, useState } from "react";
import { getProducts } from "@/api/get-products";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";
import { Pagination } from "@/components/Pagination";
import { ShoppingCart, PlusCircle } from "lucide-react";
import { CartModal } from "./CartModal";
import { ProductTableFilters } from "./products-table-filters";
import { ProductTableSkeleton } from "./products-table-skeleton";
import { toast } from "sonner";
import { Dialog } from "@/components/ui/dialog";
import { CreateProductModal } from "./../CreateProducts/CreateProductModal";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export function ProductCatalog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cartOpen, setCartOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const name = searchParams.get("name") ?? "";
  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result, isLoading: isLoadingOrders } = useQuery({
    queryKey: ["products", pageIndex, name],
    queryFn: () => getProducts({ pageIndex, name }),
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  function handleQuantityChange(productId: string, value: string) {
    const parsed = parseInt(value, 10);
    setQuantities((prev) => ({
      ...prev,
      [productId]: isNaN(parsed) ? 0 : parsed,
    }));
  }

  function handleAddToCart(product: {
    id: string;
    name: string;
    priceInCents: number;
  }) {
    const quantity = quantities[product.id] ?? 1;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.priceInCents,
          quantity,
        },
      ];
    });

    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
    toast.success(`Adicionado ao carrinho!`);
  }

  function handlePaginate(pageIndex: number) {
    setSearchParams((state) => {
      state.set("page", (pageIndex + 1).toString());
      return state;
    });
  }

  return (
    <>
      <Helmet title="Catálogo de Produtos" />
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Catálogo de Produtos
          </h1>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCreateModalOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Criar Produto
            </Button>

            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(true)}
                title="Abrir carrinho"
              >
                <ShoppingCart className="h-6 w-6 text-white" />
              </Button>

              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>

        <ProductTableFilters />

        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <CreateProductModal onClose={() => setCreateModalOpen(false)} />
        </Dialog>

        <CartModal
          open={cartOpen}
          onOpenChange={setCartOpen}
          items={cartItems}
          onClear={() => setCartItems([])}
          onRemoveItem={(productId) =>
            setCartItems((items) => {
              return items
                .map((item) => {
                  if (item.id === productId) {
                    if (item.quantity > 1) {
                      return { ...item, quantity: item.quantity - 1 };
                    } else {
                      return null;
                    }
                  }
                  return item;
                })
                .filter((item): item is CartItem => item !== null);
            })
          }
        />

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-right">Preço</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingOrders && <ProductTableSkeleton />}
              {result?.products.map((product) => {
                const quantity = quantities[product.id] ?? 1;
                const total = (product.priceInCents * quantity) / 100;

                return (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell className="text-right">
                      {(product.priceInCents / 100).toLocaleString("pt-BR", {
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

                    <TableCell className="text-center" >
                      <Button
                        variant="default"
                        className="bg-red-600 hover:bg-red-700 w-[200px] flex justify-between"
                        onClick={() => handleAddToCart(product)}
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

        {result && (
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={result.meta.pageIndex}
            totalCount={result.meta.totalCount}
            perPage={result.meta.perPage}
          />
        )}
      </div>
    </>
  );
}
