export interface LoginInfoType {
  user_email: string;
  password: string;
}

export interface UserInfoType {
  token: string;
  tokenExpiration: Date;
  user_id: number;
  first_name: string;
  last_name: string;
  user_email: string;
  id_card: number;
  city_id: number;
  street_name: string;
  is_admin: number;
}

export interface RegistrationType {
  first_name: string;
  last_name: string;
  user_email: string;
  password: string;
  id_card: number | string;
  city_id: number | string;
  street_name: string;
}

export interface RegisterPart1Type {
  id_card: number | string;
  user_email: string;
  password: string;
  passwordConfirmation?: string;
}

export interface RegisterPart2Type {
  first_name: string;
  last_name: string;
  city_id: number | string;
  street_name: string;
}

export interface City {
  city_id: number;
  city_name: string;
}

export interface CartAndOrderType {
  cart_id: number;
  order_id: number;
  creation_date: string;
  order_date: string;
  order_price: number;
}

export interface CartSubjectType {
  cartId: null | number;
  cartTotalPrice: number;
  cartProducts: CartProductType[];
}

export interface CartProductType {
  cart_product_id?: number;
  product_id: number;
  amount: number;
  total_price: number;
  cart_id: number;
}

export interface ProductType {
  product_id: number;
  product_name: string;
  category_id: number;
  product_price: number;
  product_image: string;
}

export interface CategoryType {
  category_id: number;
  category_name: string;
}

export interface SuccessObjectType {
  affectedRows: number;
  changedRows: number;
  fieldCount: number;
  insertId: number;
  message: string;
  protocol41: boolean;
  serverStatus: number;
  warningCount: number;
}
