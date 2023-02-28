import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import config from "configuration.json"
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-order-done-dialog',
  templateUrl: './order-done-dialog.component.html',
  styleUrls: ['./order-done-dialog.component.scss']
})
export class OrderDoneDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private data: { message: string, success: boolean },
    private User: UserService, private Cart: CartService, private Products: ProductsService) { }
  response = this.data;

  jsPdfProps = {
    outputType: OutputType.Blob,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2022",
    orientationLandscape: false,
    compress: true,
    logo: { // change the logo
      src: config.apiUrlSiteLogo,
      width: 26.66, //aspect ratio = width/height
      height: 26.66,
    },
    business: {
      name: config.siteTitle,
      address: "World Wide Web",
      email: "yuvbarkai@gmail.com",
      website: "https://www.linkedin.com/in/yuval-barkai",
    },
    contact: {
      label: "Invoice issued for:",
      name: `${this.User.userInfo?.first_name} ${this.User.userInfo?.last_name}`,
      email: `${this.User.userInfo?.user_email}`
    },
    invoice: {
      label: "Invoice: ",
      invGenDate: `Invoice Date: ${new Date().toLocaleDateString("en-GB")}`,
      headerBorder: true,
      tableBodyBorder: true,
      header: [
        {
          title: "#",
          style: {
            width: 10
          }
        },
        {
          title: "Product Name",
          style: {
            width: 60
          }
        },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Total price (Price * Quantity)" }
      ],
      table: Array.from(this.Cart.cartVal.cartProducts, (item, index) => ([
        index + 1,
        this.Products.productIdToName(item.product_id),
        `${item.total_price / item.amount}$`,
        item.amount,
        `${item.total_price}$`
      ])),
      // This additionalRows acts really has an error with its type, It can work if
      // type is changed in its module but I decided to just comment it because node_modules  is not trandered
      /* additionalRows: [{
        col1: 'Total:',
        col2: `${this.Cart.cartVal.cartTotalPrice}$`,
      }] */
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  receiptPdf = jsPDFInvoiceTemplate(this.jsPdfProps).jsPDFDocObject;

  downloadReceipt() {
    this.receiptPdf?.save(`${config.siteTitle} Invoice`);
  }
}
