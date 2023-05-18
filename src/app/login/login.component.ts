import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { DishesService } from '../services/dishes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  invalid = false
  errorMessage: string = ""

  constructor(private authService: AuthServiceService, private router: Router, private dishesService: DishesService){
  }

  onSubmit(loginData: any, form: NgForm) {
    this.authService.login(loginData.name, loginData.password).then((result) => {
      if(result == null){
        this.router.navigate(['/main'])
        this.dishesService.clearCart()
        this.dishesService.getCookie()
      }
      else if(result.isValid == false){
        this.invalid = true
        this.errorMessage = result.message
      }
    })
  }
}
