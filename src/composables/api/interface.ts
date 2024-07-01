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

export interface UnitApiModel {
  unitId: number
  unitName: string
}

export interface TransectionInsert {
  sellerEmail: string
  buyerEmail: string
  productId: number
  unit: string
  amount: number
  price: number
  createDate: Date
}

// interface CategoryApiModel {
//   CategoryName: string
//   CategoryDesc: string
//   CreateDate: Date
//   UpdateDate: Date
// }

export interface ProductResultApi {
  productId: number
  productName: string
  description: string
  province: string
  rating: number
  amount: number
  unit: UnitApiModel[]
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

export interface ProductDetailById {
  amount: number
  category: string
  createDate: Date
  description: string
  price: number
  productId: number
  productImages: ProductImages[]
  productName: string
  province: string
  rating: number
  unit: string
  updateDate: Date
  userEmail: string
}

export interface SellerApiModel {
  email: string
  firstName: string
  lastName: string
  profilePicture: string
  userType: string
  address: string
  displayName: string
  password: string
  isVerified: string
  laserCode?: string
  idNumber?: string
  phoneNumber: string
  createDate: string
  createBy: string
  updateDate: string
  updateBy: string
  products: []
}
