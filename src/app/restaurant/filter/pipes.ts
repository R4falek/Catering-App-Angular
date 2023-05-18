import { Pipe, PipeTransform } from '@angular/core';
import { Dish } from '../dishes';

@Pipe({ name: 'KitchenPipe' })
export class KitchenPipe implements PipeTransform {
  transform(dishes: Dish[], searchText: string): Dish[] {
    if (!dishes)
      return [];
    if (!searchText)
      return dishes;
    searchText = searchText.toLowerCase();
    return dishes.filter(dish => {
      return dish.typKuchni.toLowerCase().includes(searchText);
    });
  }
}

@Pipe({ name: 'CategoryPipe' })
export class CategoryPipe implements PipeTransform {
  transform(dishes: Dish[], searchText: string): Dish[] {
    if (!dishes)
      return [];
    if (!searchText)
      return dishes;
    searchText = searchText.toLowerCase();
    return dishes.filter(dish => {
      return dish.kategoria.toLowerCase().includes(searchText);
    });
  }
}

@Pipe({ name: 'IngredientsPipe' })
export class IngredientsPipe implements PipeTransform {
  transform(dishes: Dish[], searchText: string): Dish[] {
    if (!dishes)
      return [];
    if (!searchText)
      return dishes;
    let searchTexts = searchText.toLowerCase().split(', ')
    return dishes.filter(dish => {
      let ingredients = ''
      dish.skladniki.forEach(element => {
        ingredients += element + ' '
      })
      let ret = false
      searchTexts.forEach(element => {
        if (ingredients.includes(element))
          ret = true
      })
      return ret
    })
  }
}

@Pipe({ name: 'MinPricePipe' })
export class MinPricePipe implements PipeTransform {
  transform(dishes: Dish[], searchText: number): Dish[] {
    if (!dishes)
      return [];
    if (!searchText)
      return dishes;
    return dishes.filter(dish => {
      return dish.cena >= searchText
    })
  }
}

@Pipe({ name: 'MaxPricePipe' })
export class MaxPricePipe implements PipeTransform {
  transform(dishes: Dish[], searchText: number): Dish[] {
    if (!dishes)
      return [];
    if (!searchText)
      return dishes;
    return dishes.filter(dish => {
      return dish.cena <= searchText
    })
  }
}