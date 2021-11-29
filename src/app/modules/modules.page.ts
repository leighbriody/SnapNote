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

  userLoggedIn:boolean = false;
  modules: Module[];
  email:string;   
 
  
 

  constructor(private dataService: DataService , private alertCtrl :AlertController , private modalCtrl: ModalController , private auth : AuthService) {

    
     if(getAuth().currentUser == null){
       //logged out
       this.userLoggedIn = false;
     }else {
      //logged in
      this.userLoggedIn = true;
      this.dataService.getModules(auth.GetUserEmail()).subscribe(res => {
        console.log(res);
         this.modules = res;
       })
     }

    

   
  
   }

   logout(){
    this.auth.LogOut();
  }
  


   async updateModule(module:Module){
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
            this.dataService.updateModule(this.auth.GetUserEmail(), module.id , { name: res.name ,  notes :module.notes ,  user:getAuth().currentUser.email,})
          }
        }
      ]
    });

    await alert.present();
  
   }

   deleteModule(module:Module){


 
    this.dataService.deleteModule(getAuth().currentUser.email , module.id);
   }

   async addModule(){
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
            this.dataService.addModule(this.auth.GetUserEmail(), {user:getAuth().currentUser.email, name: res.name , notes : null})
          }
        }
      ]
    });

    await alert.present();
  }

   

   
  ngOnInit() {
    


  }

  
  getModules(){
    //This method will be responsible for getting all the users modules
      

    //if the user is logged in show them their modules
    if(getAuth().currentUser == null){
      this.userLoggedIn = false;
    }else {
      this.userLoggedIn = true;
    }

    //otherwise show them a logged in button

    //now we want to get modules 
    
  }


}
