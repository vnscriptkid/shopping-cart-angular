import { take } from 'rxjs/operators';
import { CartService } from './../cart.service';
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
  totalCartItems = 0;

  constructor(
    public authService: AuthService,
    private adminGuard: AdminGuardService,
    private cartService: CartService
  ) {
    this.isAdmin = adminGuard.canActivate();
    cartService.getCart().then(success => {
      // console.log('getCart: ', success);
      success.subscribe((result: any) => {
        console.log('cart now: ', result);
        this.totalCartItems = Object.keys(result.items).length;
      });
    });
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.authService.logout();
  }

}
