import { getManagedRestaurant, GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";


const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
});

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;
export function StoreProfileDialog() {

const  queryClient = useQueryClient()
  const { data: managedRestaurant } = useQuery({
    queryKey: ["managed-restaurant"],
    queryFn: getManagedRestaurant,
    staleTime:Infinity,
  });
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? "",
      description: managedRestaurant?.description ?? "",
    },
  });

  const { mutateAsync: updateProfilefn } = useMutation({
    mutationFn: updateProfile,
    onSuccess(_,{name,description}){
        const cached = queryClient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

        if(cached){
            queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'],{
                ...cached,
                name,
                description,
            })
        }
    }
  });

  async function handleUpdateProfile(data: StoreProfileSchema) {
    try {
      await updateProfilefn({
        name: data.name,
        description: data.description,
      });

      toast.success("perfil atualizado com sucesso!");
    } catch {
      toast.error("falha ao atualizar o perfil, tente novamente");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da Loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visiveis ao seu cliente
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register("name")} />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">
              Descrição
            </Label>
            <Textarea
              className="col-span-3"
              id="description"
              {...register("description")}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="ghost" type="button">
              cancelar
            </Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>
            salvar
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
