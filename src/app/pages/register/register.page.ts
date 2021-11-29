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


  showPassword:string;
  password:string;
  email:string;
  signUp:boolean;
  result:String;

  userLoggedIn:boolean;

   
  constructor(private dataService : DataService, private auth : AuthService , private router: Router ) { }

  ngOnInit() {

   
  }


   SignUp(){

      console.log("Sign up 1 trigger" , this.email , " " , this.password);
      

       this.auth.SignUp(this.email,this.password)

       //clear fields
    this.email ="";
    this.password = "";

    
   
  }

 
}
