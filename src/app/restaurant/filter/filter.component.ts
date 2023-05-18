import { Component, Input, OnInit, Output, EventEmitter, ElementRef, ViewChild} from '@angular/core';
import { Dish } from '../dishes';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Input() allDishes: Dish[] = []
  @Output() filteredDishes = new EventEmitter<any>()
  kitchenString: string = ""
  categoryString: string = ""
  ingredientsString: string = ""
  min: number = 0
  max: number = 100
  @ViewChild('minSlider') minSlider!: ElementRef;
  @ViewChild('maxSlider') maxSlider!: ElementRef;
  minValue!: number
  maxValue!: number

  ngOnInit(): void {
    this.findMaxAndMinPrice()
  }

  emitFilterParameters(){
    let params = [this.kitchenString, this.categoryString, this.ingredientsString, this.minValue, this.maxValue]
    this.filteredDishes.emit(params)
  }

  kitchenChanged(filterWord: any) {
    this.kitchenString = filterWord.typKuchni
    this.emitFilterParameters()
  }

  categoryChanged(filterWord: any) {
    this.categoryString = filterWord.kategoria
    this.emitFilterParameters()
  }

  ingridientsChanged(filterWord: any) {
    this.ingredientsString = filterWord.skladniki
    this.emitFilterParameters()
  }

  minChange() {
    this.minValue = Number(this.minSlider.nativeElement.value)
    this.emitFilterParameters()
  }
  maxChange() {
    this.maxValue = Number(this.maxSlider.nativeElement.value)
    this.emitFilterParameters()
  }

  findMaxAndMinPrice() {
    let min = Infinity
    let max = 0
    this.allDishes.forEach(element => {
      if (element.cena > max)
        max = element.cena
      if (element.cena < min)
        min = element.cena
    })
    this.max = max
    this.min = min
  }
}