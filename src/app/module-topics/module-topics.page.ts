import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { DataService, Module, ModuleTopic } from '../services/data.service';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth } from '@angular/fire/auth';

//camera plugin
import {Plugins} from "@capacitor/core";

const {Camera} = Plugins;



@Component({
  selector: 'app-module-topics',
  templateUrl: './module-topics.page.html',
  styleUrls: ['./module-topics.page.scss'],
})
export class ModuleTopicsPage implements OnInit {

  modules: Module[];
  moduleId:string;
  email:string;

  moduleDetails: Module;
  ModuleDetails: Observable<Module>;

  //Module Details 
  id?:string;
  user:string;
  name:string;
  notes: Array<string>;

  //camera options
  
  
  constructor(private activatedRouter: ActivatedRoute , private dataService: DataService , private alertCtrl :AlertController  , private auth : AuthService , private camera: PhotoService) {

    //Once mobile development is clicked they will be brought to this page
    //We have the module id here 
    this.moduleId =  this.activatedRouter.snapshot.paramMap.get("id");
 
    //Now we need to get that mudle deetails

     this.dataService.getModule(auth.GetUserEmail() , this.moduleId).subscribe((data : Module) => {
        this.user = data.user;
        this.name = data.name;
        this.notes = data.notes;
       console.log("This.user = " , data.user);
       console.log("this.name = " , data.name);
       console.log("this.notes = " , data.notes);
        
    })
    

   }

  ngOnInit() {

  
  }

  
  takePic(){
  
  }


  deleteNote(note:string){

    //When this is triggered it means the user has clicked the trash icon to delete a note

    //get the user email 
    //and module id

    this.dataService.deleteNote(getAuth().currentUser.email , this.moduleId , note);

    console.log("delete Note " , note)
  }

  updateNote(note:string){
    
    console.log("Update note called" , note);
    //this.dataService.updateNote(getAuth().currentUser.email , this.moduleId , note);
  }



  async addModuleNote(){

    console.log('add module topic triggered');

    const alert = await this.alertCtrl.create({
      header: 'Add Module Note',
      inputs:[
        {
          name:'name',
          placeholder: 'Add a note for this module..',
          type: 'text'
        },
       
      ],
      buttons: [
        {
          text:'Cancel',
          role: 'cancel'
        },
        {
          text:'Add',
          handler:(res)=>{
          console.log("Add note for module" , res);
            this.dataService.addNoteToModule(this.auth.GetUserEmail(),this.moduleId, res.name)
          }
        }
      ]
    });

    await alert.present();
  }


}
