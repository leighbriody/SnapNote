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


   
    { title: 'Moudles', url: '/modules', icon: 'Pencil' },
    //if user is logged in dont need to show sign in and register instead
    { title: 'Sign In', url: '/login', icon: 'Card' },
    { title: 'Register', url: '/register', icon: 'Card' },
    { title: 'Logout', url: '/logout', icon: 'Card' },
  ];
 
  constructor(private auth : AuthService) {

   
  }
}
