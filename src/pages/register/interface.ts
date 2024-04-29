export interface RegisterForm {
  firstname: string
  lastname: string
  address: string
  username: string
  password: string
  phone: string
}

export interface RegisterFarmer {
  firstname: string
  lastname: string
  address: string
  username: string
  password: string
  phone: string
  idcard: string
  shop: Shop
}

export interface Shop {
  shopname: string
  shopphone: string
  shopaddress: string
}
