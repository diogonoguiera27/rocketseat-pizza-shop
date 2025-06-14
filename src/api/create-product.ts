import { api } from "@/lib/axios"

interface CreateProductInput {
  name: string
  description?: string
  priceInCents: number
}

export async function createProduct(data: CreateProductInput) {
  const response = await api.post("/products", data)
  return response.data
}
