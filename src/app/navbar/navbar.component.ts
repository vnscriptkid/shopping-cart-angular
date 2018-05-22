import { AdminGuardService } from './../admin-guard.service';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin: Observable<boolean>;
  constructor(public authService: AuthService, private adminGuard: AdminGuardService) {
    this.isAdmin = adminGuard.canActivate();
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
  }

}
