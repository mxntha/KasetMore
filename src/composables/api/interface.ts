interface UserApiModel {
  Email: string
  FirstName: string
  LastName: string
  ProfilePicture: string
  UserType: string
  Address: string
  DisplayName: string
  Password: string
  IsVerified: string
  PhoneNumber: string
  CreateDate: Date
  CreateBy: string
  UpdateDate: Date
  UpdateBy: string
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
