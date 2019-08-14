import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';
import {User} from '../_interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  isCollapsed = true; // true -> zichtbaar, false -> verberg
  user: User;

  constructor(public authService: AuthService) { // LET OP: injecteer public !!!!
  }

  ngOnInit() {
    this.authService.userData$.subscribe( data => this.user = data);

    this.authService.getAdminList();
  }
}
