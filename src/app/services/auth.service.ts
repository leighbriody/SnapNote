
//Make all imports
import { FormsModule } from '@angular/forms';
import { getAuth , createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, docData, Firestore , setDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { getFirestore  , onSnapshot ,  deleteDoc ,   query, DocumentReference ,  } from '@firebase/firestore';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import { signOut } from '@firebase/auth';


@Injectable({
  providedIn: 'root'
})

/**
 * This class deals with all the firebase authentication methods , sign up , logout , sign in 
 * and get user email.
 */
export class AuthService {

  //store our auth in a variable
  auth = getAuth();
  result: string;

 

  //Make our firestore injection
  constructor(private firestore: Firestore) { }

  /**
   * This method is responsible for signing a user up. It takes a email and password string passed 
   * as a paramater and cusees firestore createUserWithEmailAndPassword method to hanlde everything else
   * @param email 
   * @param password 
   */
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

     });
  }

  /**
   * This method will log a user auth out of the session using firebase.
   */
  LogOut(){
    //here we have a logout method
    signOut(this.auth).then(() => {
        
      //when they log out we hide content from them , but for now just log basic info 
      console.log("User Signed Out")
    })
  }

  /**
   * A method for getting the current user email as a string 
   * @returns  the current loged in users email
   */
  GetUserEmail(): string{
    return  getAuth().currentUser.email.toString();
  }
}






