import { api } from "@/lib/axios";

export type GetDailyRevenueInResponse = {
    date:string
    receipt:number
}[]
export async function getDailyRevenueInPeriod(){
    const response = await api.get<GetDailyRevenueInResponse>(
        '/metrics/daily-receipt-in-period'
    )
    return response.data
}