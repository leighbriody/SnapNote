import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getAuth , createUserWithEmailAndPassword } from '@angular/fire/auth';



import { getFirestore , collection , onSnapshot , addDoc , deleteDoc , doc , query ,  } from '@firebase/firestore';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateServiceService {


  auth = getAuth();
  constructor() { }
}
