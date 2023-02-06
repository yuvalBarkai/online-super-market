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
import { CartInsertDialogComponent } from './components/shopping/cart-insert-dialog/cart-insert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef  } from '@angular/material/dialog';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [ApiRequestsService, UserService, CartService
    , RegistrationService, ProductsService, MatDialog,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
