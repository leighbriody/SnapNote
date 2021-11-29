import { Injectable } from '@angular/core';
import {Plugins} from "@capacitor/core";

const {Camera} = Plugins;


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  
  constructor() { }



 takePic(){
 
   Camera.getPhoto();
 }
  
}

