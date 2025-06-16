import { api } from "@/lib/axios";
export interface GetDailyRevenueInPeriodResponse {
    from?:Date
    to?:Date
}

export type GetDailyRevenueInResponse = {
    date:string
    receipt:number
}[]
export async function getDailyRevenueInPeriod({from,to}: GetDailyRevenueInPeriodResponse){
    const response = await api.get<GetDailyRevenueInResponse>(
        '/metrics/daily-receipt-in-period',
        {
            params:{
                from,
                to,
            }
        }
    )
    return response.data
}