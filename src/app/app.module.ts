import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { DishesComponent } from './restaurant/dishes/dishes.component';
import { CartComponent } from './restaurant/cart/cart.component';
import { FormComponent } from './restaurant/form/form.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './restaurant/filter/filter.component'
import { MatSliderModule } from '@angular/material/slider';
import { CategoryPipe, KitchenPipe, IngredientsPipe, MinPricePipe, MaxPricePipe } from './restaurant/filter/pipes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainSiteComponent } from './main-site/main-site.component';
import { MapComponent } from './main-site/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { CartDetailsComponent } from './restaurant/cart/cart-details/cart-details.component';
import { DishDetailsComponent } from './restaurant/dishes/dish-details/dish-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { OpinionFormComponent } from './restaurant/dishes/dish-details/opinion-form/opinion-form.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SettingsComponent } from './settings/settings.component';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    DishesComponent,
    CartComponent,
    FormComponent,
    FilterComponent,
    CategoryPipe,
    KitchenPipe,
    IngredientsPipe,
    MinPricePipe,
    MaxPricePipe,
    NavComponent,
    NotFoundComponent,
    MainSiteComponent,
    MapComponent,
    CartDetailsComponent,
    DishDetailsComponent,
    OpinionFormComponent,
    LoginComponent,
    SignupComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatSliderModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    GoogleMapsModule,
    NgxPaginationModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
