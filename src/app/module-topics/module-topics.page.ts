import { Directory } from '@capacitor/filesystem';

import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { DataService, Module, ModuleTopic } from '../services/data.service';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth } from '@angular/fire/auth';



//camera plugin
import {Camera , CameraResultType , CameraSource , Photo} from '@capacitor/camera';
import { base64 } from '@firebase/util';

const IMAGE_DIR = 'stored-images';

interface LocalFile {
  name:string,
  path:string,
  data:string,
}

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
  imagePath
  //Module Details 
  id?:string;
  user:string;
  name:string;
  notes: Array<string>;

  imageString:string;

  //camera options
  imageSelected = false;

  
  
  constructor(private activatedRouter: ActivatedRoute , private dataService: DataService , private alertCtrl :AlertController  , private auth : AuthService , private photoService: PhotoService) {


    this.imageSelected = false;

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


  

  //The user has selected an image
  async selectImage(){
    //get the image using .getPhoto
    const image = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      //binary image ? 
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
      
    });

    //If we get an image back
    if(image){

      //set image selected to true
      this.imageSelected = true;

      //set the image path
      this.imagePath = image.base64String;

      //now we wait for the user to say if it looks good or not
   
      //call the camera service api image to get the text of the image
    //this.photoService.getImageText( image.base64String);
   
}


  }


  //The user has approved the picture they have taken
  pictureApproved(){

     
    
    //we take the image path and send it to the api and get the response
      let imageAsText = this.photoService.getImageText( this.imagePath);
    

      console.log("About to add image as text to database");
      console.log("Module id " , this.moduleId);
      console.log("User " , this.auth.GetUserEmail());
      console.log("Image as text" ,imageAsText )
    
    this.dataService.addNoteToModule(this.auth.GetUserEmail(),this.moduleId,imageAsText);

   //remove image and other things
    //we remove the image path 
    this.imagePath = null;

    //we set the pciture to false
    this.imageSelected = false;
  }


  pictureDenied(){

    //we remove the image path 
    this.imagePath = null;

    //we set the pciture to false
    this.imageSelected = false;
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

  addImageAsNote(){
    
  }


}
