import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-settings',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home-settings.component.html',
  styleUrl: './home-settings.component.scss'
})
export class HomeSettingsComponent implements OnInit {
  private readonly _AuthenticationService=inject(AuthenticationService);
  
  userName:WritableSignal<string>=signal('')
  
  ngOnInit(): void {

    this.userName.set(this._AuthenticationService.saveUserData().name);
    console.log(this.userName());
    
  }
}
