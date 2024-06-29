import { postMethod, getMethod } from './baseApi'
import { TransectionInsert } from './interface'
export interface TransectionModel {
  transactionId: number
  sellerEmail: string
  buyerEmail: string
  productId: number
  unit: string
  amount: number
  price: number
  createDate: Date
}
function useTransactionApi() {
  const controller = 'Transaction'
  return {
    async createTransaction(transactions: TransectionInsert[]) {
      try {
        const response = await postMethod(`${controller}/create`, transactions)
        return response
      } catch (error) {
        console.error('Error creating transaction:', error)
        throw error
      }
    },
    async getBySeller(sellerEmail: string): Promise<TransectionModel[]> {
      try {
        const response = await getMethod<TransectionModel[]>(
          `${controller}/get-by-seller`,
          {
            sellerEmail: sellerEmail,
          }
        )
        return response
      } catch (error) {
        console.error('Error fetching transactions by seller:', error)
        throw error
      }
    },
    async getByBuyer(buyerEmail: string): Promise<TransectionModel[]> {
      try {
        const response = await getMethod<TransectionModel[]>(
          `${controller}/get-by-buyer`,
          {
            buyerEmail: buyerEmail,
          }
        )
        return response
      } catch (error) {
        console.error('Error fetching transactions by buyer:', error)
        throw error
      }
    },
    async getById(transactionId: string): Promise<TransectionModel> {
      try {
        const response = await getMethod<TransectionModel>(
          `${controller}/get-by-id`,
          {
            id: transactionId,
          }
        )
        return response
      } catch (error) {
        console.error('Error fetching transactions by ID:', error)
        throw error
      }
    },
  }
}
export default useTransactionApi
