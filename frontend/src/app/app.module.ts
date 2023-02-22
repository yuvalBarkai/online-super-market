import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/home/login/login.component';
import { AboutComponent } from './components/home/about/about.component';
import { StatsComponent } from './components/home/stats/stats.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiRequestsService } from './services/api-requests.service';
import { UserService } from './services/user.service';
import { FormsModule } from '@angular/forms';
import { RegisterPart1Component } from './components/home/register-part1/register-part1.component';
import { RegisterPart2Component } from './components/home/register-part2/register-part2.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CartService } from './services/cart.service';
import { RegistrationService } from './services/registration.service';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { SingleProductComponent } from './components/shopping/single-product/single-product.component';
import { CartSideComponent } from './components/shopping/cart-side/cart-side.component';
import { ProductsService } from './services/products.service';
import { ProductIdToNamePipe } from './pipes/product-id-to-name.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartInsertDialogComponent } from './components/shopping/products/cart-insert-dialog/cart-insert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductsComponent } from './components/shopping/products/products.component';
import { ResizableDirective } from './directives/resizable.directive';
import { AdminService } from './services/admin.service';
import { OrderComponent } from './components/shopping/order/order.component';
import { OrderDoneDialogComponent } from './components/shopping/order/order-done-dialog/order-done-dialog.component';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    StatsComponent,
    HomeComponent,
    HeaderComponent,
    RegisterPart1Component,
    RegisterPart2Component,
    ShoppingComponent,
    SingleProductComponent,
    CartSideComponent,
    ProductIdToNamePipe,
    CartInsertDialogComponent,
    ProductsComponent,
    ResizableDirective,
    OrderComponent,
    OrderDoneDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
  ],
  providers: [ApiRequestsService, UserService, CartService
    , RegistrationService, ProductsService, MatDialog, AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
