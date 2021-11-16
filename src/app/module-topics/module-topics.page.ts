import { Component, OnInit } from '@angular/core';
import { DataService, ModuleTopic } from '../services/data.service';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-module-topics',
  templateUrl: './module-topics.page.html',
  styleUrls: ['./module-topics.page.scss'],
})
export class ModuleTopicsPage implements OnInit {

  moduletopics: Observable<any>;


  constructor(private activatedRouter: ActivatedRoute , private dataService: DataService ) { }

  ngOnInit() {

    //We need to get all the moduel topcis that were passed in 
    let moduleId =  this.activatedRouter.snapshot.paramMap.get("id");
    console.log("moduleId :  " , moduleId);

    this.moduletopics = this.dataService.getModuleTopics(moduleId);
    
   
    console.log("module topics" , this.moduletopics);

  

    

  }

}
