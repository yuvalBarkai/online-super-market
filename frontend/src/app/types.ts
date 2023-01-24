export interface LoginInfo {
  user_email: string;
  password: string;
}

export interface UserInfo {
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

export interface Registration {
  first_name: string;
  last_name: string;
  user_email: string;
  id_card: number;
  city_id: number;
  street_name: string;
}
