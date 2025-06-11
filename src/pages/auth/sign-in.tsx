// pagina de login

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Helmet } from "react-helmet-async";
import {useForm} from "react-hook-form"
import {z} from "zod";
import {toast} from 'sonner';
import {Link} from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/api/sign-in";



const signInForm = z.object({
  email: z.string().email("E-mail inválido"),})

type SignInForm = z.infer<typeof signInForm>;
  export function SignIn() {

  const { register, handleSubmit , formState:{isSubmitting}} = useForm<SignInForm >();

  const {mutateAsync:authenticate} = useMutation({
    mutationFn:signIn,
  })

  async function handleSignIn(data:SignInForm ){
   try {
    await authenticate({email:data.email})

    toast.success("Enviamos um link de autenticação para o seu e-mail!",{
      action: {
        label: "Reenviar",
        onClick: () => handleSignIn(data),
      },
  })
   }catch {
    toast.error('Credenciais invalidas.')
   }
  }

  return (
    <>
      <Helmet title="login" />
      <div className="p-8">
      <Button variant="ghost" asChild className="absolute right-8 top-8">
        <Link to="/sign-up"> Novo Estabelecimento</Link>
      </Button>

        <div className=" flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar Painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo Painel do Parceiro
            </p>
          </div>

          <form  onSubmit={handleSubmit(handleSignIn)}  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email"> Seu e-mail </Label>
              <Input id="email" type="email" {...register('email')}/>
            </div>

            <Button disabled={isSubmitting}  className="w-full" type="submit"> 
              Acessar Painel 
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
