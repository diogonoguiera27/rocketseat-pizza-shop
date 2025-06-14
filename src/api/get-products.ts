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
  const response = await api.get<GetProductsResponse>("/products", {
    params: {
      pageIndex,
      name,
    },
  })

  return response.data
}
