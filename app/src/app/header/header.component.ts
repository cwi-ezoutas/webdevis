import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../_services/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private authenticationService: AuthenticationService;
  private router: Router;
  public isCollapsed=true;

  constructor(authenticationService: AuthenticationService, router: Router){
    this.authenticationService = authenticationService;
    this.router = router;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

  isLoggedIn(){
    return this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  getMeToThis(land){
    this.isCollapsed = !this.isCollapsed;
    this.router.navigate([land]);
  }

}
