import { api } from "@/lib/axios"

export interface GetProductsQuery {
  pageIndex?: number | null
  name?: string | null
}

export interface GetProductsResponse {
  products: {
    id: string
    name: string
    priceInCents: number
    createdAt: string
  }[]
  meta: {
    pageIndex: number
    perPage: number
    totalCount: number
  }
}

export async function getProducts({ pageIndex, name }: GetProductsQuery) {
  // criação da variavel chamada response ela guarda o resultado da chamda da api signiga salva informaçãp que vem do servidor 
  // await espera a resposta da requisição termina
  // api.get  : esta chamando o metodo Get do axios ( ou seja uma requisição do tipo "pegar dados")
  // GetProductsResponse: diz que a resposta da requisição  vai seguir  o fortmato da interface GetProductsResponse
  //  "/products" : e o caminho que o front  usa para pedir algo a api (ao servidor )
  // return response.data :  Retornar apenas os dados da resposta que a API enviou.
  const response  = await api.get<GetProductsResponse>("/products", {
    params: {
      pageIndex,
      name,
    },
  })

  return response.data
}
