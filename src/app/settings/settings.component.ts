import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(public authService: AuthServiceService) {
  }

  change(data: any){
    this.authService.changeSessionPersistance(data)
  }

  changeRole(id: string, role: string){
    if(role != '')
      this.authService.changeRole(id, role)
  }

  toggleBan(id: string, ban: boolean){
    this.authService.banToggle(id, ban)
  }
}
