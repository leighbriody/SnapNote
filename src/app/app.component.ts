import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  email:String = "";

  public appPages = [


   
    { title: 'Moudles', url: '/modules', icon: 'school' },
    //if user is logged in dont need to show sign in and register instead
    { title: 'Sign In', url: '/login', icon: 'log-in' },
    { title: 'Register', url: '/register', icon: 'person-add' },
    { title: 'Logout', url: '/logout', icon: 'log-out' },
   
  ];
 
  constructor(private auth : AuthService) {

   
  }
}
