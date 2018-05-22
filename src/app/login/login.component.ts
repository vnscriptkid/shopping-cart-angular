import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
// import * as firebase from 'firebase';
// import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onLoginClick() {
    console.log('login click');
    this.authService.login();
  }

}
