import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Moudles', url: '/modules', icon: 'Pencil' },
    { title: 'Notes', url: 'modles', icon: 'Card' },
    
  ];
 
  constructor() {}
}
