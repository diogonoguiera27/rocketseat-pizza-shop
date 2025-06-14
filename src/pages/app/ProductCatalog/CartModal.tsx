// src/pages/app/products/CartModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/api/create-order";
import { useManagedRestaurant } from "@/hooks/use-managed-restaurant";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number; // em centavos
}

interface CartModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onClear: () => void;
  onRemoveItem: (productId: string) => void;
}

export function CartModal({ open, onOpenChange, items, onClear, onRemoveItem }: CartModalProps) {
  const { managedRestaurant } = useManagedRestaurant();

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  async function handleFinishOrder() {
    if (!managedRestaurant) return;

    try {
      await createOrder({
        restaurantId: managedRestaurant.id,
        items: items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });

      onClear();
      onOpenChange(false);
      toast.success("Pedido realizado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao finalizar o pedido.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Carrinho de Compras</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.quantity} × {" "}
                  {(item.price / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <p className="font-semibold text-right">
                  {((item.price * item.quantity) / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center px-4 py-3 bg-zinc-800 rounded-md mt-4">
            <span className="text-sm font-semibold text-white">
              Total do Pedido
            </span>
            <span className="text-sm font-semibold text-white">
              {(total / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>

          <Button
            onClick={handleFinishOrder}
            className="w-full mt-2 bg-red-600 hover:bg-red-700"
          >
            Finalizar Pedido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
