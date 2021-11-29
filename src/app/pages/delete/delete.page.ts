
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';



@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  
})
export class DeletePage implements OnInit {
  showPassword: boolean;

  @ViewChild('passwordInput', { static: true }) passwordInput: IonInput;

  constructor() { }

  ngOnInit() {
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    this.passwordInput.setFocus();
  }

}
