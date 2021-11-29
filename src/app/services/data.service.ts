import { Injectable } from '@angular/core';
import { getAuth, User } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { arrayRemove, arrayUnion, collectionGroup, deleteDoc, getDoc, updateDoc } from '@firebase/firestore';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';

//create our interface for our note
//create interface 
export interface Note {
  id?: string,
  title:string,
  text:string,
}

export interface ModuleTopic
{
  id?:string
  name:string 
}

export interface Module {
  id?:string,
  user:string,
  name:string,
  notes: Array<string>

  
}

export interface Test {
  id?:string,
  userI
  text:string
  
}


@Injectable({
  providedIn: 'root'
})
export class DataService {




  constructor(private firestore: Firestore) { }


  getModules(email:string):Observable<Module[]> {
    //now when we get modules we need to get the ones based on current logged in user id    
    //When this method is called we need to get the sub collection of the users 
    //get the current logged in users email
    //check if the email is null if it is
    if(email == null){
      email = "";
    }
    const modulesRef = collection(this.firestore,'users/' + email + '/modules');
    console.log("Module doc ref  " ,modulesRef );
    console.log("Current User Email" , email);    
    return collectionData(modulesRef, {idField:'id'}) as Observable<Module[]>;
  }


  //This method will be get module by id
  getModule(email:string , moduleId:string): Observable<Module> {

    //we are given the module id the user has clicked ex Mobile Development
    //We want to get the document
    const moduleRef = doc(this.firestore , 'users/' + email + '/modules/' + moduleId);
     
    return docData(moduleRef , {idField:'id'}) as Observable<Module>;

  }


  addModule(email:string , module: Module){

    //when we add a moudle we need to add module name and user id to files
    const moduleDocRef = collection(this.firestore,'users/' + email + '/modules');

   console.log("Add Email " , email)
    return addDoc(moduleDocRef,module);


  }

  async addNoteToModule(email:string , moduleid:string ,note : string ){

    //when we enter here the user has entered a new note which they want to add to the module
    //we must push that note to the array that is in the document 

    const moduleDocRef = doc(this.firestore , 'users/' + email + '/modules/' , moduleid);

    await updateDoc(moduleDocRef , {
      notes: arrayUnion(note)
    });
  }


  async deleteNote(email:string , moduleId:string , note:string){

    const moduleDocRef = doc(this.firestore , 'users/' + email + '/modules/' , moduleId);

    await updateDoc(moduleDocRef, {
     
      notes: arrayRemove(note)
  });
  }

  async deleteModule(email:string , moduleId:string ){
    
    await deleteDoc(doc(this.firestore , 'users/' + email + '/modules/' + moduleId));
  }

  updateNote(email:string , moduleId:string , module:Module){
    
    const noteDocRef = doc(this.firestore , 'users/' + email + '/modules/' , moduleId);
    return 
  }


  updateModule(email:string , moduleId:string  , module:Module){

    const moduleRef = doc(this.firestore , 'users/' + email + '/modules/' + moduleId);

    console.log("update called with module if " , moduleId)
    return updateDoc(moduleRef , {name:module.name } );
  }



  //method to get all module topics
  getModuleTopics(moduleid):  Observable<ModuleTopic[]>{


    //Given the module id we need to get all the module topics for that id
    /**
     * 
     * const modulesRef = collection(this.firestore,'users/' + email + '/modules');
    console.log("Module doc ref  " ,modulesRef );
    console.log("Current User Email" , email);
    
    return collectionData(modulesRef, {idField:'id'}) as Observable<Module[]>;
     * 
     * 
     */

   const email = getAuth().currentUser.email.toString();

    console.log("Get module topics current user email " , email)

  // const moudleTopicsRef = collection(this.firestore ,  'users/' + email + '/modules/' + moduleid + '/moduletopics'  );
   const moudleTopicsRef = collection(this.firestore ,  'modules/IuDQOUsplFt773yOanGz/moduletopics');
    console.log("Module topics doc ref " ,moudleTopicsRef )


    

    console.log("Get module topics triggered ");
    console.log('users/' + email + '/modules/' + moduleid + '/moduletopics');
    return collectionData(moudleTopicsRef , {idField:'id'}) as Observable<ModuleTopic[]>;;



  }

  
}
