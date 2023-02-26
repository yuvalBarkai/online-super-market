// Modules:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components:
import { AppComponent } from './app.component';
import { LoginComponent } from './components/home/login/login.component';
import { AboutComponent } from './components/home/about/about.component';
import { StatsComponent } from './components/home/stats/stats.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterPart1Component } from './components/home/register-part1/register-part1.component';
import { RegisterPart2Component } from './components/home/register-part2/register-part2.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { SingleProductComponent } from './components/shopping/products/single-product/single-product.component';
import { CartInsertDialogComponent } from './components/shopping/products/cart-insert-dialog/cart-insert-dialog.component';
import { ProductsComponent } from './components/shopping/products/products.component';
import { OrderComponent } from './components/shopping/order/order.component';
import { OrderDoneDialogComponent } from './components/shopping/order/order-done-dialog/order-done-dialog.component';
import { CartItemsComponent } from './components/shopping/cart-side/cart-items/cart-items.component';
import { CartSideComponent } from './components/shopping/cart-side/cart-side.component';

// Services:
import { ApiRequestsService } from './services/api-requests.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { RegistrationService } from './services/registration.service';
import { ProductsService } from './services/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from './services/admin.service';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Pipes
import { ProductIdToNamePipe } from './pipes/product-id-to-name.pipe';

// Directives
import { ResizableDirective } from './directives/resizable.directive';
import { ProductIdToImageNamePipe } from './pipes/product-id-to-image-name.pipe';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, AboutComponent, StatsComponent, HomeComponent, HeaderComponent,
    RegisterPart1Component, RegisterPart2Component, ShoppingComponent, SingleProductComponent,
    CartSideComponent, ProductIdToNamePipe, CartInsertDialogComponent, ProductsComponent,
    OrderComponent, OrderDoneDialogComponent, CartItemsComponent, ProductIdToImageNamePipe,
    ResizableDirective
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, BrowserAnimationsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatCheckboxModule,
    MatTableModule, MatToolbarModule 
  ],
  providers: [ApiRequestsService, UserService, CartService
    , RegistrationService, ProductsService, MatDialog, AdminService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
