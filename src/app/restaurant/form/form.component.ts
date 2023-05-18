import { NgFor } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DishesService } from 'src/app/services/dishes.service';
import { Dish } from '../dishes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  name = false
  price = false

  constructor(private dishService: DishesService){}

  ngOnInit() {
  }

  onSubmit(dish: any, form: NgForm) {
    this.name = false
    this.price = false
    if(dish.name == "") { this.name = true }
    if(dish.cena == "") { this.price = true }
    if(this.name || this.price){
      return
    }
    dish.skladniki = dish.skladniki.split(", ")
    dish.zdjecia = dish.zdjecia.split(", ")
    const newDish: Dish = {
      nazwaDania: dish.name,
      typKuchni: dish.typKuchni,
      skladniki: dish.skladniki,
      kategoria: dish.kategoria,
      maxIloscJednegoDnia: dish.maxIloscJednegoDnia,
      cena: dish.cena,
      opis: dish.opis,
      linkDoZdjec: dish.zdjecia,
      orderedCount: 0,
      mostExpensive: false,
      cheapest: false,
      oceny: [],
      opinia: []
    }
    this.dishService.addDish(newDish)
    form.form.reset();
  }
}
