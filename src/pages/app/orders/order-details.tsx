import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

//export interface OrderDetailsProps {}

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 123fy423sdas</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>

      <div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" />
                  <span className="font-medium text-muted-foreground">
                    Pendente
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                Diogo Alves Nogueira 
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (62) 9 9999-9999
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">
                diogoalvesnogueira@gmail.com 
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="text-muted-foreground">Realizado ha</TableCell>
              <TableCell className="flex justify-end">
                ha 3 minutos
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-right">qtd.</TableHead>
                    <TableHead className="text-right">Preço</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>Pizza Peperoni Familia</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right">R$ 69,90</TableCell>
                    <TableCell className="text-right">R$ 139,80</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Pizza MusarellaFamilia</TableCell>
                    <TableCell className="text-right">2</TableCell>
                    <TableCell className="text-right">R$ 59,90</TableCell>
                    <TableCell className="text-right">R$ 119,80</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total do Pedido</TableCell>
                    <TableCell className="text-right font-medium">
                        R$ 259,60
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
      </div>
    </DialogContent>
  );
}
