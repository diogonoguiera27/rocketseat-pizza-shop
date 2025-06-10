import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { OrderTableRow } from "./order-table-row";
import { OrderTableFilters } from "./order-table-filters";
import { Pagination } from "@/components/Pagination";

export function Orders() {
  return (
    <>
      <Helmet title="Pedidos" />
      <div className="flex flex-col gap-4">
        <h1 className="text-sm font-bold tracking-light">Pedidos</h1>

        <div className="space-y-2.5">
          <OrderTableFilters />

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="W-[64px]"></TableHead>
                  <TableHead className="W-[140px]">Indentificador</TableHead>
                  <TableHead className="W-[180px]">Realizado ha</TableHead>
                  <TableHead className="W-[140px]">Status</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="W-[140px]">Total do Pedido</TableHead>
                  <TableHead className="W-[164px]"></TableHead>
                  <TableHead className="W-[132px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 10 }).map((_, i) => {
                  return <OrderTableRow key={i} />;
                })}
              </TableBody>
            </Table>
          </div>
          <Pagination pageIndex={0} totalCount={105} perPage={10}/>
        </div>
      </div>
    </>
  );
}
