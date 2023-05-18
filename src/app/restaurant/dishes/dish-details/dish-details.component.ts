import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from '../../dishes';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {

  private routeSub!: Subscription;
  dish?: Dish
  @ViewChild('images') images!: ElementRef

  constructor(private route: ActivatedRoute, private dishService: DishesService) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      let name = params['name']
      this.dish = this.dishService.getDishByName(name)
    });
    this.dishService.calculateAverageGrade()
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  grade(grade: number, dish: Dish) {
    if(dish.twojaOcena != undefined){
      let toRemove!: number
      dish.oceny.forEach((element, index) => {
        if(element == dish.twojaOcena)
          toRemove = index
      })
      dish.oceny.splice(toRemove, 1)
    }
    dish.oceny?.push(grade)
    dish.twojaOcena = grade
    if(dish.oceny != undefined)
      dish.sredniaOcen = dish.oceny.reduce((a, b) => (a + b)) / dish.oceny.length
  }

  remove(dish: Dish) {
    dish.orderedCount--
    this.dishService.removeFromCart(dish)
  }
  
  add(dish: Dish) {
    dish.orderedCount++
    this.dishService.addToCart(dish)
  }

  counter: number = 0
  size: number = 35
  right() {
    if (this.counter < this.images.nativeElement.children.length - 1) {
      this.counter++
      this.images.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'vw)'
    }
  }

  left() {
    if (this.counter > 0) {
      this.counter--
      this.images.nativeElement.style.transform = 'translateX(' + (-this.size * this.counter) + 'vw)'
    }
  }
}
