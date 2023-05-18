import { Injectable, OnInit } from '@angular/core';
import { Dish, History, Opinion } from '../restaurant/dishes';
import { Database, set, ref, update, onValue, remove } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class DishesService implements OnInit {

  dishes: Dish[] = []
  orderedishes: Dish[] = []
  history: History[] = []
  priceSum = 0
  dishesCount = 0
  itemsPerPage: number = 4
  tutorialsRef?: AngularFireList<any>

  constructor(private db: Database, private db2: AngularFireDatabase, private router: Router, private authService: AuthServiceService,
    private cookieService: CookieService) {
    this.getDataFromDB()
  }

  getDataFromDB() {
    this.tutorialsRef = this.db2.list('/dania')
    this.tutorialsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.dishes = []
      data.forEach(element => {
        const dish: Dish = {
          nazwaDania: element.nazwaDania,
          typKuchni: element.typKuchni,
          skladniki: element.skladniki,
          kategoria: element.kategoria,
          maxIloscJednegoDnia: element.maxIloscJednegoDnia,
          cena: element.cena,
          opis: element.opis,
          linkDoZdjec: element.linkDoZdjec,
          orderedCount: 0,
          mostExpensive: false,
          cheapest: false,
          oceny: [],
          opinia: element.opinia
        }
        this.dishes = [...this.dishes, dish]
      })
      this.orderedishes = [...this.dishes]
    });
  }

  ngOnInit(): void {
  }

  getDishes() {
    return this.dishes
  }

  getCurrentData() {
    let dateTime = new Date()
    return dateTime
  }

  addOpinion(newOpinion: Opinion, dishName: string) {
    this.dishes.forEach(element => {
      if (element.nazwaDania == dishName) {
        if (element.opinia !== undefined)
          element.opinia.push(newOpinion)
        else
          element.opinia = [newOpinion]
        update(ref(this.db, 'dania/' + dishName), {
          opinia: element.opinia
        });
        alert("Dodano opinie")
        return
      }
    })
  }

  addToHistory() {
    let oldHistory = this.authService.user?.history
    if(oldHistory === undefined)
      oldHistory = []
    let newHistory: History[] = []
    let historyAppend: History[] = []
    this.orderedishes.forEach(element => {
      if (element.orderedCount != 0) {
        const h: History = {
          nazwaDania: element.nazwaDania,
          liczbaZamowionych: element.orderedCount,
          cenaSum: element.orderedCount * element.cena,
          dataZakupu: this.getCurrentData()
        }
        historyAppend.push(h)
      }
      element.orderedCount = 0
    })
    newHistory = oldHistory
    historyAppend.forEach(element => {
      newHistory.unshift(element)
    })
    this.authService.updateHistory(newHistory)
    this.calculate()
  }

  getDishByName(name: string) {
    let ret
    this.orderedishes.forEach(element => {
      if (element.nazwaDania == name) {
        ret = element
      }
    })
    return ret
  }

  getOrderedDishes() {
    return this.orderedishes
  }

  markMostExpensiveAndTheCheapestDish() {
    if (this.dishes.length > 0) {
      let mostExpensive = this.dishes[0]
      this.dishes.forEach(element => {
        element.mostExpensive = false
        if (element.cena > mostExpensive.cena)
          mostExpensive = element
      })
      mostExpensive.mostExpensive = true

      let cheapest = this.dishes[0]
      this.dishes.forEach(element => {
        element.cheapest = false
        if (element.cena < cheapest.cena)
          cheapest = element
      })
      cheapest.cheapest = true
    }
  }

  removeFromList(dish: Dish) {
    this.dishes.forEach((element, index) => {
      if (dish == element) {
        remove(ref(this.db, 'dania/' + dish.nazwaDania))
        this.dishes.splice(index, 1)
      }
    })
    this.markMostExpensiveAndTheCheapestDish()
    alert('Usunieto')
  }

  addDish(newDish: Dish) {
    // this.dishes = [...this.dishes, newDish]
    // this.orderedishes = [...this.orderedishes, newDish]
    set(ref(this.db, 'dania/' + newDish.nazwaDania), {
      nazwaDania: newDish.nazwaDania,
      typKuchni: newDish.typKuchni,
      kategoria: newDish.kategoria,
      skladniki: newDish.skladniki,
      maxIloscJednegoDnia: newDish.maxIloscJednegoDnia,
      cena: newDish.cena,
      opis: newDish.opis,
      linkDoZdjec: newDish.linkDoZdjec,
      oceny: newDish.oceny,
      opinia: newDish.opinia,
    });
    alert("Dodano")
    this.markMostExpensiveAndTheCheapestDish()
    this.calculateAverageGrade()
  }

  addToCart(dish: Dish) {
    this.orderedishes.forEach(element => {
      if (element.nazwaDania == dish.nazwaDania) {
        element.orderedCount = dish.orderedCount
      }
    })
    this.orderedishes = [...this.orderedishes]
    this.calculate()
    this.deleteCookie()
    this.setCookie()
  }

  removeFromCart(dish: Dish) {
    this.orderedishes.forEach(element => {
      if (element.nazwaDania == dish.nazwaDania) {
        element.orderedCount = dish.orderedCount
      }
    })
    this.orderedishes = [...this.orderedishes]
    this.calculate()
    this.deleteCookie()
    this.setCookie()
  }

  calculateAverageGrade() {
    this.dishes.forEach(element => {
      if (element.oceny != undefined) {
        let sum = 0
        element.oceny?.forEach(ocena => sum += ocena)
        element.sredniaOcen = sum / element.oceny?.length
      }
    })
  }

  calculate() {
    this.priceSum = 0
    this.dishesCount = 0
    this.orderedishes?.forEach(element => {
      this.priceSum += element.cena * element.orderedCount
      this.dishesCount += element.orderedCount
    })
  }

  clearCart(){
    this.orderedishes.forEach(element => {
      element.orderedCount = 0
    })
    this.calculate()
  }

  setCookie(){
    this.cookieService.set(this.authService.id, JSON.stringify(this.orderedishes))
  }

  deleteCookie(){
    this.cookieService.delete(this.authService.id)
  }

  getCookie(){
    let cookie = this.cookieService.get(this.authService.id)
    let data: Dish[] = JSON.parse(cookie)
    this.orderedishes = data
    this.calculate()
  }
}
