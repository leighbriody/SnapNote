import { AuthService } from './../../services/auth.service';

import { FormsModule } from '@angular/forms';
import { getAuth , createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Component, Injectable, OnInit } from '@angular/core';
import { Firestore , collectionData} from '@angular/fire/firestore';

import { getFirestore , collection , onSnapshot , addDoc , deleteDoc , doc , query ,  } from '@firebase/firestore';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./auth.scss' , 'sign-up-page.scss'],
})
export class RegisterPage implements OnInit {

  //here we set our variables
  showPassword:string;
  password:string;
  email:string;
  signUp:boolean;
  result:String;

  //track our user logged in status
  userLoggedIn:boolean;

  //make our injections into the constructor
  constructor(private dataService : DataService, private auth : AuthService , private router: Router ) { }

  
  ngOnInit() {
  }

  /**
   * This sign up method will be triggered when the user clicks the sign up button.
   * We will take the user email and password the user has entered on the view and pass them to
   * the firebase auth method SignUp
   */
   SignUp(){

        //call the sign up method
       this.auth.SignUp(this.email,this.password)

       //clear fields
       this.email ="";
      this.password = "";
 
  }
}
