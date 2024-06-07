export interface UserApiModel {
  email: string
  firstName: string
  lastName: string
  profilePicture: string
  userType: string
  address: string
  displayName: string
  phoneNumber: string
  isVerified: string
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

export interface ProductResultApi {
  productId: number
  productName: string
  description: string
  province: string
  rating: number
  amount: number
  unit: number
  userEmail: string
  category: string
  price: number
  createDate: Date | null
  updateDate: Date | null
  productImages: ProductImages[]
}

interface ProductImages {
  attatchmentId: number
  image: string
  productId: number
}
