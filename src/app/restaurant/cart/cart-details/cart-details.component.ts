import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish, History } from '../../dishes';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent {
  dishes?: Dish[] = []
  history?: History[]

  constructor(public dishService: DishesService, private authService: AuthServiceService){
  }

  ngOnInit(): void {
    this.dishes = this.dishService.orderedishes
    // this.history = this.dishService.history
    if(this.authService.user)
      this.history = this.authService.user.history
  }

  buy(){
    this.dishService.addToHistory()
    this.dishService.deleteCookie()
  }
}
