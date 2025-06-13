import { useEffect, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { CreateProductModal } from "./CreateProductModal";

export function Products() {
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div className="p-4 space-y-4">

      
      <Dialog open={open} onOpenChange={setOpen}>
        <CreateProductModal />
      </Dialog>
    </div>
  );
}
