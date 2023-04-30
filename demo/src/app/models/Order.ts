class Order {
  constructor(
    public city_id: number | null = null,
    public street_name: string = "",
    public arrival_date: Date | null = null,
    public credit_card_digits: number | null = null,
    public cart_id?:number,
    public order_price?:number
  ) { }
}

export default Order
