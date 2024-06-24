import { postMethod, getMethod } from './baseApi'
import { TransectionApiModel } from './interface'

function useTransactionApi() {
  const controller = 'Transaction'
  return {
    async createTransaction(transactions: TransectionApiModel[]) {
      try {
        const response = await postMethod(`${controller}/create`, transactions)
        return response
      } catch (error) {
        console.error('Error creating transaction:', error)
        throw error
      }
    },
    async getBySeller(sellerEmail: string) {
      try {
        const response = await getMethod(`${controller}/get-by-seller`, {
          sellerEmail: sellerEmail,
        })
        return response
      } catch (error) {
        console.error('Error fetching transactions by seller:', error)
        throw error
      }
    },
    async getByBuyer(buyerEmail: string) {
      try {
        const response = await getMethod(`${controller}/get-by-buyer`, {
          buyerEmail: buyerEmail,
        })
        return response
      } catch (error) {
        console.error('Error fetching transactions by buyer:', error)
        throw error
      }
    },
  }
}
