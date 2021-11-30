import { getAuth } from '@angular/fire/auth';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Plugins} from "@capacitor/core";
import * as $ from 'jquery';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';


const {Camera} = Plugins;


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  imageText:string;
  
  constructor(private http: HttpClient , dataService : DataService , private auth : AuthService) { 


   
  }


  
getImageText(base64Image:string) : string{
 

  let  attatch = "data:image/png;base64,";

  let data = `${attatch}${encodeURI(base64Image)}`


  const settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://ocr-100-image-text-extractor.p.rapidapi.com/ocr",
    "method": "POST",
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
      "x-rapidapi-host": "ocr-100-image-text-extractor.p.rapidapi.com",
      "x-rapidapi-key": "a945dc3c08msh39bac133c9c1272p129dfcjsnc927cb3b8062"
    },
    "data": {
      "data":data,
      "lang":"eng"
    }
  };
  var text = '';
   $.ajax(settings).done(function (response) {
   
    text = response;
  });

  this.imageText = text;


  return this.imageText;
  
  
}



}

function addImageAsNote() {
  throw new Error('Function not implemented.');
}
