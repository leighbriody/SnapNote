import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore } from '@angular/fire/firestore';
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
  id?:string,
  topicname:string
  
}

export interface Module {
  id?:string,
  name:string
  
}

export interface Test {
  id?:string,
  text:string
  
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }


  getModules():Observable<Module[]> {
    const modulesRef = collection(this.firestore,'modules');
    console.log("Module doc ref  " ,modulesRef );
    return collectionData(modulesRef , {idField:'id'}) as Observable<Module[]>;
    
  }


  addModule(module: Module){
    const moduleDocRef = collection(this.firestore,'modules');

   
    return addDoc(moduleDocRef,module);

  }

  //method to get all module topics
  getModuleTopics(id): Observable<any> {
    const noteDocRef = doc(this.firestore , `moduletopics/${id}`);

    console.log("Module topics doc ref " ,noteDocRef )
    return docData(noteDocRef , {idField:'id'}) as Observable<any>;
  }

  
}
