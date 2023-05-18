import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from '../dishes';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css'],
})
export class DishesComponent implements OnInit {
  dishes: Dish[] = []
  @Input() filterParameters: any = ['', '', '', '', '']
  @ViewChild('removeB') buttonRemove!: ElementRef;
  @ViewChild('addB') buttonAdd!: ElementRef;
  @ViewChild('slider') slider!: ElementRef;
  filteredDishes: any
  totalLength?: number;
  page: number = 1
  @Input() itemsPerPage?: number
  reloaded: boolean = false

  constructor(private dishService: DishesService, private router: Router, private route: ActivatedRoute, public authService: AuthServiceService) {
  }

  resetPage() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate(['./'], {
      relativeTo: this.route
    })
  }

  ngOnInit(): void {
    this.dishService.markMostExpensiveAndTheCheapestDish()
    this.dishService.calculateAverageGrade()
    this.dishes = this.dishService.orderedishes
    this.totalLength = this.dishes.length
    this.itemsPerPage = this.dishService.itemsPerPage
  }

  remove(dish: Dish) {
    dish.orderedCount--
    this.dishService.removeFromCart(dish)
  }

  add(dish: Dish) {
    dish.orderedCount++
    this.dishService.addToCart(dish)
  }

  removeFromList(dish: Dish) {
    this.filterParameters = ['', '', '', '', '']
    this.dishService.removeFromList(dish)
    if (this.totalLength !== undefined)
      this.totalLength -= 1
  }

  valueChangenge() {
    this.dishService.itemsPerPage = Number(this.slider.nativeElement.value)
    this.itemsPerPage = this.dishService.itemsPerPage
  }
}
