import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { RegisterPart1Component } from './components/home/register-part1/register-part1.component';
import { RegisterPart2Component } from './components/home/register-part2/register-part2.component';
import { ProductsComponent } from './components/shopping/products/products.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { Part1CheckGuard } from './guards/part1-check.guard';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register/part1",
        component: RegisterPart1Component,
      },
      {
        path: "register/part2",
        component: RegisterPart2Component,
        canActivate: [Part1CheckGuard]
      },
      {
        path: "**",
        redirectTo: "login",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "shopping",
    component: ShoppingComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: "products",
        component: ProductsComponent
      },
      {
        path: "**",
        redirectTo: "products",
        pathMatch: "full"
      }
    ],
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
