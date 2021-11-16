import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService , Module} from '../services/data.service';


@Component({
  selector: 'app-modules',
  templateUrl: './modules.page.html',
  styleUrls: ['./modules.page.scss'],
})
export class ModulesPage implements OnInit {

  modules = [];
 

  constructor(private dataService: DataService , private alertCtrl :AlertController , private modalCtrl: ModalController) {

    this.dataService.getModules().subscribe(res => {
      console.log(res);
      this.modules = res;
    })
   }

   //Methods
  



   async addModule(Module){

    console.log('triggered');

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
            this.dataService.addModule({name: res.name})
          }
        }
      ]
    });

    await alert.present();
  }

   

   
  ngOnInit() {
  }

}
