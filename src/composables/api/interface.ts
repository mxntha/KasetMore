export interface UserApiModel {
  email: string
  firstName: string
  lastName: string
  profilePicture: string
  userType: string
  address: string
  displayName: string
  phoneNumber: string
}

interface UnitApiModel {
  UnitId: number
  UnitName: string
}
interface TransectionApiModel {
  TransactionId: number
  SellerEmail: number
  BuyerEmail: number
  ProductId: number
  Unit: string
  Amount: number
  Price: number
  CreateDate: Date
}
interface CategoryApiModel {
  CategoryName: string
  CategoryDesc: string
  CreateDate: Date
  UpdateDate: Date
}
