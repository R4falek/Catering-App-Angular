import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  invalid = false
  errorMessage: string = ''

  constructor(private authService: AuthServiceService, private router: Router){}

  onSubmit(loginData: any, form: NgForm) {
      this.authService.signup(loginData.name, loginData.password, loginData.login).then((result) => {
        if(result == null){
          this.router.navigate(['/main'])
        }
        else if(result.isValid == false){
          this.invalid = true
          this.errorMessage = result.message
        }
      })
    }
}
