import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { getAuth , createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Injectable } from '@angular/core';


import { getFirestore , collection , onSnapshot , addDoc , deleteDoc , doc , query ,  } from '@firebase/firestore';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { signInWithEmailAndPassword, signOut } from '@firebase/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./auth.scss' , './sign-in-page.scss' ],
})
export class LoginPage implements OnInit {
  //Here we set our variables
  //email and password are ng models of the view page
  email:string;
  password:string;
  
  //user logged in is our flag
  userLoggedIn:boolean = false;

  //here we inject our router into the construcot
  constructor(private router: Router ) { }

  ngOnInit() {
  }

  /**
   * This sign in method will be called when the user clicks the sign in button on the login view.
   * 
   * //We will get the email and password that was entered on the view and call firebase auth method 
   * signInWithEmailAndPassword(). This method deals with security and validation for us and will determine 
   * if the user can successfully login. If the login is successfull as will redirect them to modules
   */
  SignIn(){
    //Get the current auth status
    const auth = getAuth();

    //call the firestore sign in method passing the email and password , along with a then 
    signInWithEmailAndPassword(auth , this.email ,this.password).then(cred => {
      

      //then we want ot do some things , clear email and password
      this.email = "";
      this.password = "";

      //Now we want to redirect the user to the modules page
      this.router.navigateByUrl('modules');
    })
  }
}



