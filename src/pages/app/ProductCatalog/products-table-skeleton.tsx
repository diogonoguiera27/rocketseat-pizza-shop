// src/pages/app/products/ProductTableSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function ProductTableSkeleton() {
  return Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell>
        <Skeleton className="h-4 w-[180px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-[90px] ml-auto" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-10 w-[100px] mx-auto" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-[200px] mx-auto" />
      </TableCell>
    </TableRow>
  ));
}