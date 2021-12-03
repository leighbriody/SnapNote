import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private auth : AuthService , private router: Router ) { }

  ngOnInit() {
  }

  /***
   * If this method is called the uer ha
   */
  logout(){
    this.auth.LogOut();
    //bring them back to login
    //If user login success redirect
     this.router.navigateByUrl('login');
  }


  }

