import { Directory } from '@capacitor/filesystem';
import { PhotoService } from './../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { DataService, Module, ModuleTopic } from '../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Auth, getAuth } from '@angular/fire/auth';



//camera plugin as we want to allow user to user camera for images
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

  //Module fields
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

  
  //make our injections , we will need all these
  constructor(private activatedRouter: ActivatedRoute , private dataService: DataService , private alertCtrl :AlertController  , private auth : AuthService , private photoService: PhotoService) {

    //set the image selected = false when the user fiurst enters this page as they have not selected an image yer
    this.imageSelected = false;

    //Once mobile development is clicked they will be brought to this page
    //We have the module id here 
    this.moduleId =  this.activatedRouter.snapshot.paramMap.get("id");
 
    //Now we need to get that mudle deetails
     this.dataService.getModule(auth.GetUserEmail() , this.moduleId).subscribe((data : Module) => {
        this.user = data.user;
        this.name = data.name;
        this.notes = data.notes;   
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


  //The user has approved the picture they have taken , this means we must now turn this photo 
  //into text using an api , and store that text as a note for the user
  pictureApproved(){
    //we take the image path and send it to the api and get the response
      let imageAsText = this.photoService.getImageText( this.imagePath);
  
    this.dataService.addNoteToModule(this.auth.GetUserEmail(),this.moduleId,imageAsText);

   //remove image and other things
    //we remove the image path 
    this.imagePath = null;

    //we set the pciture to false
    this.imageSelected = false;
  }


  //if the user is not happy with the image they can click the not happy button ,
  //this method will be called and will reset the image
  pictureDenied(){

    //we remove the image path 
    this.imagePath = null;

    //we set the pciture to false
    this.imageSelected = false;
  }

  
  /**
   *  If the user wishes to delete a note , a note string will be taken in as a paramter ,
   * we will then call the data service .deleteNote() method to remove this note.
   * @param note 
   */
  deleteNote(note:string){

    //When this is triggered it means the user has clicked the trash icon to delete a note
    //we call the method pasing the current user email , the module id of the note , and the note text
    this.dataService.deleteNote(getAuth().currentUser.email , this.moduleId , note);

   
  }

  /**
   * This method will be called when the user wishes to update a note , the note they wish to update 
   * will be taken as a paramater and we will call the data service update note method
   * @param note 
   */
  updateNote(note:string){
    
    console.log("Update note called" , note);
    //this.dataService.updateNote(getAuth().currentUser.email , this.moduleId , note);
  }


/**
 * This method will be called when the user clicks the add moduel note button. This means the user wishes to 
 * add a note to the current module they are in. 
 * We open up an alert modal with the fields of name , which will take in the note they want to add.
 * 
 * Once the user has clicked the add button we wil send the data to the data service addNoteToModule
 * method which will add the note to the users  moule note
 */
  async addModuleNote(){
    //Create our alert  controller alert
    const alert = await this.alertCtrl.create({
      header: 'Add Module Note',
      inputs:[
        {
          //set our field
          name:'name',
          placeholder: 'Add a note for this module..',
          type: 'text'
        },
       
      ],
      buttons: [
        {
          //have cancel button
          text:'Cancel',
          role: 'cancel'
        },
        {
          //have our add button
          text:'Add',
          handler:(res)=>{
            //if the user clicks add call the data service method to add the note they have enetered
            this.dataService.addNoteToModule(this.auth.GetUserEmail(),this.moduleId, res.name)
          }
        }
      ]
    });

    await alert.present();
  }
}
