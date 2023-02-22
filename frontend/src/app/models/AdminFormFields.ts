class AdminFormFields {
  constructor(
    public product_name: string,
    public product_price: number | string,
    public category_id: number | string,
    public keepImage?: boolean,
    public product_id?: number,
    public product_image?: FileList,
  ) { }

  toEditFormData() {
    const fd = new FormData();
    if (this.product_image?.item(0))
      fd.append("product_image", this.product_image.item(0) as Blob);
    if (this.product_id)
      fd.append("product_id", String(this.product_id));
    if (this.keepImage == false || this.keepImage == true)
      fd.append("keepImage", String(this.keepImage));
    fd.append("product_name", this.product_name);
    fd.append("product_price", String(this.product_price));
    fd.append("category_id", String(this.category_id));
    return fd;
  }

  toAddFormData() {
    const fd = new FormData();
    if (this.product_image?.item(0))
      fd.append("product_image", this.product_image.item(0) as Blob);
    fd.append("product_name", this.product_name);
    fd.append("product_price", String(this.product_price));
    fd.append("category_id", String(this.category_id));
    return fd;
  }
}
export default AdminFormFields
