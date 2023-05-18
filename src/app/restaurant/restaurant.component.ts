import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DishesService } from '../services/dishes.service';
import { Dish } from './dishes';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  title = 'List of dishes'
  dishes: Dish[] = []
  filteredDishes: any
  filterToggle = false

  constructor(private dishesService: DishesService){}

  ngOnInit() {
    this.dishes = this.dishesService.getDishes()
    this.filteredDishes = ['', '', '']
  }
  
  filterToggler() {
    this.filterToggle = !this.filterToggle
  }

  filterDishes(params: any) {
      this.filteredDishes = params
  }
}
