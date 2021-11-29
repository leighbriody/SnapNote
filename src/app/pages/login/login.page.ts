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


  email:string;
  password:string;
    userLoggedIn:boolean = false;

  constructor(private router: Router ) { }

  ngOnInit() {
   
  }

  

  SignIn(){

    console.log("Sign in 1 trigger" , this.email , " " , this.password)

    //login auth 
    const auth = getAuth();

    signInWithEmailAndPassword(auth , this.email ,this.password).then(cred => {
      console.log(cred);

      //then we want ot do some things , clear email and password
      this.email = "";
      this.password = "";

      //If user login success redirect
      this.router.navigateByUrl('modules');

    })
    
  }



}



