export default class User {
  constructor(
    public user_id: number,
    public first_name: string,
    public last_name: string,
    public user_email: string,
    public id_card: number,
    public city_id: number,
    public street_name: string,
    public is_admin: number,
  ) { }
}
