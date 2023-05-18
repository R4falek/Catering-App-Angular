import { Component, Input, OnChanges, SimpleChange, SimpleChanges, OnInit } from '@angular/core';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from '../dishes';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  priceSum = 0
  dishesCount = 0

  constructor(public dishService: DishesService){
    this.priceSum = this.dishService.priceSum
  }

  ngOnInit(): void {
    
  }
}
