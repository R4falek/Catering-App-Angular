import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CartDetailsComponent } from './restaurant/cart/cart-details/cart-details.component';
import { DishDetailsComponent } from './restaurant/dishes/dish-details/dish-details.component';
import { FormComponent } from './restaurant/form/form.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { GuardGuard } from './services/guard.guard';
import { SettingsComponent } from './settings/settings.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'main', component: MainSiteComponent },
  { path: 'ourOffer', component: RestaurantComponent },
  { path: 'cart', component: CartDetailsComponent, canActivate: [GuardGuard] },
  { path: 'addDish', component: FormComponent, canActivate: [GuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [GuardGuard] },
  { path: 'dish/:name', component: DishDetailsComponent, canActivate: [GuardGuard] },
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
