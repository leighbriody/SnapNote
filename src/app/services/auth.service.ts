import { FormsModule } from '@angular/forms';
import { getAuth , createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

import { User } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, docData, Firestore , setDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { getFirestore  , onSnapshot ,  deleteDoc ,   query, DocumentReference ,  } from '@firebase/firestore';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { signOut } from '@firebase/auth';





//------------------------ 


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //create auth
  auth = getAuth();
  result: string;

 

  constructor(private firestore: Firestore) { }

  //Once we use this method firebase automatically logs us into the application
   SignUp( email:string , password:string){
    console.log("Sign up 2 trigger");
    //.then will fire a callbackk function when this task is complete
    //this callback function takes in the response from this task and the response in this case will be a user credential
     createUserWithEmailAndPassword(this.auth , email , password).then(cred => {


      
     //when they sign up we want to set a unique id on that document 
     const usersRef = collection(this.firestore,'users');
     //add document
      setDoc(doc(this.firestore, "users", email), {
      username: email,
    });

  

      //log to console
      //user credential tokenb 
      //once we get the cred back they are automatically logged into our application
      //firebase auto gens a unique id for the user
      //once the user has logged in we want to redirect them
     });
  }

  LogOut(){

    
    //here we have a logout method
    signOut(this.auth).then(() => {
        
      //when they log out we hide content from them , but for now just log basic info 
      console.log("User Signed Out")
    })
  }


  
  SignIn(email:string , password:string){
    
    //get the user info
    console.log(email , password);
    //console.log("Sign in 2 triggered " , email , password);

    //then we want to clear the username and password
    
  }

  GetUserEmail(): string{

    return  getAuth().currentUser.email.toString();
  }








}






