import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { getAuth  } from '@angular/fire/auth';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService , Module} from '../services/data.service';


@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  //set our variables
  //user logged in will track the auth status of the user
  userLoggedIn:boolean = false;

  //modules will hold all the users modules
  modules: Module[];
  email:string;   
 
  
 
  //Make our injections into the constructor 
  constructor(private dataService: DataService , private alertCtrl :AlertController , private modalCtrl: ModalController , private auth : AuthService) {

    //here we will check to see if the user is logged in or out , and only if they are logged in will we 
    //try to get their modules as we cannot get a logged out users module as they have no email
     if(getAuth().currentUser == null){
       //logged out
       this.userLoggedIn = false;
     }else {
      //logged in
      //set the flag and call the getModules method and store their modules 
      this.userLoggedIn = true;
      this.dataService.getModules(auth.GetUserEmail()).subscribe(res => {
        console.log(res);
         this.modules = res;
       })
     }

   }

   //if the user clicks the logout button this method will be called
   //we auth.logout the user which will log them out
   logout(){
    this.auth.LogOut();
  }
  

  /**
   * This method is responsible for updating a module. It takes a module object as a paramater 
   * and creates an alert which prompts the user to change the name of the module.
   * 
   * If changes are made and the user clicks add we call the updateModule method on the data service 
   * which will update the module acordingly
   * @param module 
   */
   async updateModule(module:Module){

    //trigger the alert with fields
    const alert = await this.alertCtrl.create({
      header: 'Add Module',
      inputs:[
        {
          name:'name',
          placeholder: module.name,
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
            //if they click add call the update module method to update changes
            this.dataService.updateModule(this.auth.GetUserEmail(), module.id , { name: res.name ,  notes :module.notes ,  user:getAuth().currentUser.email,})
          }
        }
      ]
    });

    await alert.present();
  
   }

   /**
    * This method is responsible for deleting a module. It takes a module object as a paramater 
    * and calls the deleteModule service which is responsible for tdelketi
    * @param module Thg
    */
   deleteModule(module:Module){

    //call the data service delete module method 
    this.dataService.deleteModule(getAuth().currentUser.email , module.id);
   }


   /**
    * This method is responsible for letting the user add a new module. It creates an alert for the user 
    * allowing them to input the module name and add it to their firestore document.
    * 
    * This is done by passing the input to the data service addModule() method
    */
   async addModule(){

    //create the alert
    const alert = await this.alertCtrl.create({
      header: 'Add Module',
      inputs:[
        {
          name:'name',
          placeholder: 'the module..',
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
            //if the user clicks add we call the add module method on the data service 
            this.dataService.addModule(this.auth.GetUserEmail(), {user:getAuth().currentUser.email, name: res.name , notes : null})
          }
        }
      ]
    });

    await alert.present();
  }

   

   
  ngOnInit() {
  
  }

  /**
   * This method will get all of the users current modules
   */
  getModules(){
    //This method will be responsible for getting all the users modules
    //if the user is logged in show them their modules
    if(getAuth().currentUser == null){
      this.userLoggedIn = false;
    }else {
      this.userLoggedIn = true;
    }
    //otherwise show them a logged in butto
    //now we want to get modules  
  }


}
