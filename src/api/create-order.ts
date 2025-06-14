import { api } from '@/lib/axios'

interface CreateOrderParams {
  restaurantId: string
  items: {
    productId: string
    quantity: number
  }[]
}

export async function createOrder({ restaurantId, items }: CreateOrderParams) {
  await api.post(`/restaurants/${restaurantId}/orders`, {
    items,
  })
}
